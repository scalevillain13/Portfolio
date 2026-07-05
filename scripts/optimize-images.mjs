import sharp from 'sharp'
import { readdir, rename, unlink } from 'fs/promises'
import { dirname, join, parse } from 'path'
import { fileURLToPath } from 'url'

const dir = join(dirname(fileURLToPath(import.meta.url)), '../public/images')

const files = await readdir(dir)

for (const file of files) {
  if (!file.endsWith('.png')) continue

  const input = join(dir, file)
  const { name } = parse(file)
  const isGallery = name.includes('-1') || name === 'cy-1' || name === 'y-1'
  const maxWidth = isGallery ? 1600 : 1200

  const meta = await sharp(input).metadata()
  const needsResize = (meta.width ?? 0) > maxWidth

  const pipeline = needsResize ? sharp(input).resize(maxWidth, null, { withoutEnlargement: true }) : sharp(input)

  await pipeline.clone().webp({ quality: 82 }).toFile(join(dir, `${name}.webp`))

  await pipeline.clone().png({ compressionLevel: 9 }).toFile(join(dir, `${name}.tmp.png`))

  await unlink(input)
  await rename(join(dir, `${name}.tmp.png`), input)

  console.log(`Optimized ${file} (max ${maxWidth}px) + ${name}.webp`)
}
