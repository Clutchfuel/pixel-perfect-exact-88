type OptimizedImageProps = {
  avif: string;
  webp: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  mobile?: { avif: string; webp: string; fallback: string };
};

export function OptimizedImage({
  avif,
  webp,
  fallback,
  alt,
  width,
  height,
  className,
  priority = false,
  mobile,
}: OptimizedImageProps) {
  return (
    <picture>
      {mobile ? (
        <>
          <source media="(max-width: 768px)" type="image/avif" srcSet={mobile.avif} />
          <source media="(max-width: 768px)" type="image/webp" srcSet={mobile.webp} />
          <source media="(max-width: 768px)" srcSet={mobile.fallback} />
        </>
      ) : null}
      <source type="image/avif" srcSet={avif} />
      <source type="image/webp" srcSet={webp} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
