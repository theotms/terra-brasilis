import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const [, , inputArgument, outputArgument, sheetArgument] = process.argv

if (!inputArgument || !outputArgument || !sheetArgument) {
  console.error(
    'Usage: node scripts/prepare-necklaces.mjs <input-folder> <web-output-folder> <contact-sheet-folder>',
  )
  process.exit(1)
}

const inputFolder = path.resolve(inputArgument)
const outputFolder = path.resolve(outputArgument)
const sheetFolder = path.resolve(sheetArgument)
const excludedSources = new Set([
  // Duplicate product photo: the catalog keeps Iracema (134304) instead.
  '20260825_134312',
])

const files = (await readdir(inputFolder, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      /\.(jpe?g|png)$/i.test(entry.name) &&
      !/logo/i.test(entry.name) &&
      !excludedSources.has(path.parse(entry.name).name),
  )
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right, 'en'))

if (!files.length) {
  console.error(`No necklace photos found in ${inputFolder}`)
  process.exit(1)
}

await mkdir(outputFolder, { recursive: true })
await mkdir(sheetFolder, { recursive: true })

const manifest = []
const thumbnails = []

for (const [index, sourceName] of files.entries()) {
  const number = String(index + 1).padStart(3, '0')
  const sourcePath = path.join(inputFolder, sourceName)
  const webName = `${path.parse(sourceName).name}.webp`
  const outputPath = path.join(outputFolder, webName)

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 1200,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath)

  const thumbnail = await sharp(sourcePath)
    .rotate()
    .resize({
      width: 270,
      height: 300,
      fit: 'contain',
      background: '#f7f4ec',
    })
    .flatten({ background: '#f7f4ec' })
    .jpeg({ quality: 76 })
    .toBuffer()

  const label = `${number} · ${path.parse(sourceName).name}`
  thumbnails.push({ label, image: thumbnail })
  manifest.push({ number, sourceName, webName })

  if ((index + 1) % 20 === 0 || index === files.length - 1) {
    console.log(`Prepared ${index + 1}/${files.length}`)
  }
}

const columns = 5
const rows = 8
const imageWidth = 270
const imageHeight = 300
const gutter = 16
const labelHeight = 42
const tileWidth = imageWidth + gutter * 2
const tileHeight = imageHeight + labelHeight + gutter * 2
const perSheet = columns * rows

for (let start = 0; start < thumbnails.length; start += perSheet) {
  const batch = thumbnails.slice(start, start + perSheet)
  const sheetNumber = String(start / perSheet + 1).padStart(2, '0')
  const composites = []

  for (const [batchIndex, thumbnail] of batch.entries()) {
    const column = batchIndex % columns
    const row = Math.floor(batchIndex / columns)
    const left = column * tileWidth + gutter
    const top = row * tileHeight + gutter
    const escapedLabel = thumbnail.label
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')

    composites.push({ input: thumbnail.image, left, top })
    composites.push({
      input: Buffer.from(`
        <svg width="${imageWidth}" height="${labelHeight}">
          <rect width="100%" height="100%" fill="#1c4227" />
          <text
            x="${imageWidth / 2}"
            y="25"
            fill="#fdfcf7"
            font-family="Arial, sans-serif"
            font-size="14"
            text-anchor="middle"
          >${escapedLabel}</text>
        </svg>
      `),
      left,
      top: top + imageHeight,
    })
  }

  await sharp({
    create: {
      width: columns * tileWidth,
      height: rows * tileHeight,
      channels: 3,
      background: '#d5c88e',
    },
  })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(path.join(sheetFolder, `necklaces-${sheetNumber}.jpg`))
}

await writeFile(
  path.join(sheetFolder, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
)

console.log(
  `Prepared ${files.length} web images and ${Math.ceil(files.length / perSheet)} contact sheets.`,
)
