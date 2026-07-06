import sharp from 'sharp'
import { copyFile, readdir, rename, stat, unlink } from 'fs/promises'
import { dirname, extname, join, parse } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'images')
const targetDir = join(root, 'public/images')

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])

function isRasterImage(file) {
  return RASTER_EXT.has(extname(file).toLowerCase())
}

function maxWidthFor(name) {
  if (name === 'avatar') return 480
  if (/-\d+$/.test(name)) return 1600
  return 1200
}

async function syncSources() {
  let files = []
  try {
    files = await readdir(sourceDir)
  } catch {
    return
  }

  for (const file of files) {
    if (!isRasterImage(file)) continue

    const sourcePath = join(sourceDir, file)
    const base = parse(file).name
    const ext = extname(file).toLowerCase()

    let targetName = file
    if (base === '6d2949c6-97fe-4970-b1fe-cda868cbcdee') {
      targetName = `avatar${ext === '.jpeg' ? '.jpg' : ext}`
    }

    const targetPath = join(targetDir, targetName)
    const [sourceStat, targetStat] = await Promise.all([
      stat(sourcePath),
      stat(targetPath).catch(() => null),
    ])

    if (!targetStat || sourceStat.mtimeMs > targetStat.mtimeMs) {
      await copyFile(sourcePath, targetPath)
      console.log(`Synced ${file} → public/images/${targetName}`)
    }
  }
}

async function optimizeFile(file) {
  const ext = extname(file).toLowerCase()
  if (!RASTER_EXT.has(ext)) return

  const input = join(targetDir, file)
  const { name } = parse(file)
  const maxWidth = maxWidthFor(name)
  const outExt = ext === '.png' ? '.png' : '.jpg'
  const finalPath = join(targetDir, `${name}${outExt}`)
  const tmpPath = join(targetDir, `${name}.tmp${outExt}`)

  const image = sharp(input)
  const meta = await image.metadata()
  const pipeline = (meta.width ?? 0) > maxWidth
    ? image.resize(maxWidth, null, { withoutEnlargement: true })
    : image

  await pipeline.clone().webp({ quality: 80 }).toFile(join(targetDir, `${name}.webp`))

  if (outExt === '.png') {
    await pipeline.clone().png({ compressionLevel: 9 }).toFile(tmpPath)
  } else {
    await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(tmpPath)
  }

  await unlink(input)
  await rename(tmpPath, finalPath)

  console.log(`Optimized ${file} → ${name}${outExt} + ${name}.webp (${maxWidth}px max)`)
}

await syncSources()

const publicFiles = await readdir(targetDir)
for (const file of publicFiles) {
  if (RASTER_EXT.has(extname(file).toLowerCase())) {
    await optimizeFile(file)
  }
}
