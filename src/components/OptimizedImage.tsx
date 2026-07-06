type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

function toWebpSrc(src: string) {
  return src.replace(/\.(png|jpe?g)$/i, '.webp')
}

export function OptimizedImage({ src, alt, className, loading = 'lazy' }: OptimizedImageProps) {
  const webpSrc = toWebpSrc(src)

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
