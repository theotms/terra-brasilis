import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const projectRoot = path.resolve(import.meta.dirname, '..')
const catalogConfigs = [
  {
    type: 'necklace',
    catalogFile: 'necklaceCatalog.ts',
    imageFolder: 'necklaces',
  },
  {
    type: 'bracelet',
    catalogFile: 'braceletCatalog.ts',
    imageFolder: 'bracelets',
  },
  {
    type: 'keychain',
    catalogFile: 'keychainCatalog.ts',
    imageFolder: 'keychains',
  },
]
const entryPattern =
  /\{ source: '([^']+)', name: (?:'([^']+)'|"([^"]+)"), colors: \[([^\]]*)\], metal: '([^']+)'(?:, alternateSources: \[([^\]]*)\])? \}/g
const errors = []
const allEntries = []
let totalImages = 0
let totalAlternateViews = 0

function normalize(value) {
  return value
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
}

for (const config of catalogConfigs) {
  const catalogPath = path.join(
    projectRoot,
    'src/data',
    config.catalogFile,
  )
  const imageFolder = path.join(
    projectRoot,
    'public/images/products',
    config.imageFolder,
  )
  const catalogSource = await readFile(catalogPath, 'utf8')
  const entries = [...catalogSource.matchAll(entryPattern)].map((match) => ({
    type: config.type,
    source: match[1],
    name: match[2] ?? match[3],
    colors: [...match[4].matchAll(/'([^']+)'/g)].map((color) => color[1]),
    metal: match[5],
    alternateSources: [...(match[6] ?? '').matchAll(/'([^']+)'/g)].map(
      (source) => source[1],
    ),
  }))

  if (!entries.length) {
    errors.push(`The ${config.type} catalog contains no products.`)
  }

  const primarySources = new Set()
  for (const [index, entry] of entries.entries()) {
    if (primarySources.has(entry.source)) {
      errors.push(
        `Duplicate ${config.type} source at entry ${index + 1}: ${entry.source}`,
      )
    }
    primarySources.add(entry.source)

    const wordCount = entry.name.trim().split(/\s+/).length
    if (wordCount > 2) {
      errors.push(
        `${config.type} entry ${index + 1} has more than two words: ${entry.name}`,
      )
    }

    if (!entry.colors.length) {
      errors.push(
        `${config.type} entry ${index + 1} has no colors: ${entry.name}`,
      )
    }

    if (entry.alternateSources.length > 2) {
      errors.push(
        `${config.type} entry ${index + 1} has more than two alternate views: ${entry.name}`,
      )
    }
  }

  const referencedSources = new Set(
    entries.flatMap((entry) => [entry.source, ...entry.alternateSources]),
  )

  for (const [index, entry] of entries.entries()) {
    for (const alternateSource of entry.alternateSources) {
      if (alternateSource === entry.source) {
        errors.push(
          `${config.type} entry ${index + 1} repeats its primary image as an alternate: ${entry.name}`,
        )
      }

      if (primarySources.has(alternateSource)) {
        errors.push(
          `${config.type} alternate image is still a separate product: ${alternateSource}`,
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
          `${config.type} image ${source} exceeds web dimensions: ${metadata.width}x${metadata.height}`,
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
      `${config.type} catalog/image count mismatch: ${referencedSources.size} referenced sources and ${webImages.length} WebP files.`,
    )
  }

  for (const file of webImages) {
    const source = path.parse(file).name
    if (!referencedSources.has(source)) {
      errors.push(`Unreferenced ${config.type} WebP image: ${file}`)
    }
  }

  allEntries.push(...entries)
  totalImages += webImages.length
  totalAlternateViews += referencedSources.size - primarySources.size
}

const seenNames = new Map()
for (const entry of allEntries) {
  const normalizedName = normalize(entry.name)
  const previous = seenNames.get(normalizedName)

  if (previous) {
    errors.push(
      `Duplicate product name across ${previous.type} and ${entry.type}: ${entry.name}`,
    )
  } else {
    seenNames.set(normalizedName, entry)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const typeCounts = catalogConfigs
  .map((config) => {
    const count = allEntries.filter((entry) => entry.type === config.type).length
    return `${count} ${config.type}${count === 1 ? '' : 's'}`
  })
  .join(', ')

console.log(
  `Catalog audit passed: ${typeCounts}; ${totalAlternateViews} grouped alternate views; ${totalImages} optimized images; unique names of at most two words.`,
)
