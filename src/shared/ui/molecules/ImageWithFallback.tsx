import { useState, useEffect } from 'react';
import imageFallback from '/images/image-fallback.svg';
import { cn } from '../../lib/utils';

type Props = {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  objectFit?: 'cover' | 'contain';
};

export function ImageWithFallback({
  src = imageFallback,
  alt,
  className,
  loading = 'lazy',
  objectFit = 'cover',
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 shadow-md dark:bg-gray-700" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== imageFallback) {
            setCurrentSrc(imageFallback);
          } else {
            setLoaded(true);
          }
        }}
        className={cn(
          'w-full h-full object-center transition-opacity duration-300',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
