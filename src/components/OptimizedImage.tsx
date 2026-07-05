type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({ src, alt, className, loading = 'lazy' }: OptimizedImageProps) {
  const webpSrc = src.replace(/\.png$/i, '.webp')

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
