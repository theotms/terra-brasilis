import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const projectRoot = path.resolve(import.meta.dirname, '..')
const catalogPath = path.join(projectRoot, 'src/data/necklaceCatalog.ts')
const imageFolder = path.join(
  projectRoot,
  'public/images/products/necklaces',
)
const catalogSource = await readFile(catalogPath, 'utf8')
const entryPattern =
  /\{ source: '([^']+)', name: (?:'([^']+)'|"([^"]+)"), colors: \[([^\]]*)\], metal: '([^']+)'(?:, alternateSources: \[([^\]]*)\])? \}/g
const entries = [...catalogSource.matchAll(entryPattern)].map((match) => ({
  source: match[1],
  name: match[2] ?? match[3],
  colors: [...match[4].matchAll(/'([^']+)'/g)].map((color) => color[1]),
  metal: match[5],
  alternateSources: [...(match[6] ?? '').matchAll(/'([^']+)'/g)].map(
    (source) => source[1],
  ),
}))
const errors = []

if (!entries.length) {
  errors.push('The catalog contains no products.')
}

for (const key of ['source', 'name']) {
  const seen = new Map()

  for (const [index, entry] of entries.entries()) {
    const normalized = entry[key]
      .normalize('NFD')
      .replaceAll(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('pt-BR')
    const previous = seen.get(normalized)

    if (previous !== undefined) {
      errors.push(
        `Duplicate ${key} at entries ${previous + 1} and ${index + 1}: ${entry[key]}`,
      )
    } else {
      seen.set(normalized, index)
    }
  }
}

const primarySources = new Set(entries.map((entry) => entry.source))
const referencedSources = new Set(
  entries.flatMap((entry) => [entry.source, ...entry.alternateSources]),
)

for (const [index, entry] of entries.entries()) {
  const wordCount = entry.name.trim().split(/\s+/).length
  if (wordCount > 2) {
    errors.push(`Entry ${index + 1} has more than two words: ${entry.name}`)
  }

  if (!entry.colors.length) {
    errors.push(`Entry ${index + 1} has no colors: ${entry.name}`)
  }

  for (const alternateSource of entry.alternateSources) {
    if (alternateSource === entry.source) {
      errors.push(`Entry ${index + 1} repeats its primary image as an alternate: ${entry.name}`)
    }

    if (primarySources.has(alternateSource)) {
      errors.push(
        `Alternate image is still listed as a separate product: ${alternateSource}`,
      )
    }
  }
}

for (const source of referencedSources) {
  const imagePath = path.join(imageFolder, `${source}.webp`)
  try {
    await access(imagePath)
    const metadata = await sharp(imagePath).metadata()
    if ((metadata.width ?? 0) > 1200 || (metadata.height ?? 0) > 1600) {
      errors.push(
        `Image ${source} exceeds web dimensions: ${metadata.width}x${metadata.height}`,
      )
    }
  } catch {
    errors.push(`Missing or unreadable referenced image: ${imagePath}`)
  }
}

const webImages = (await readdir(imageFolder)).filter((file) =>
  file.endsWith('.webp'),
)
if (webImages.length !== referencedSources.size) {
  errors.push(
    `Catalog/image count mismatch: ${referencedSources.size} referenced sources and ${webImages.length} WebP files.`,
  )
}

for (const file of webImages) {
  const source = path.parse(file).name
  if (!referencedSources.has(source)) {
    errors.push(`Unreferenced WebP image: ${file}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(
  `Catalog audit passed: ${entries.length} unique products, ${referencedSources.size - primarySources.size} grouped alternate views, ${webImages.length} optimized images, and every name is at most two words.`,
)
