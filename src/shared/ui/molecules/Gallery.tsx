import { cn } from '../../lib/utils';
import { ImageWithFallback } from './ImageWithFallback';

interface GalleryProps {
  images: string[];
  className?: string;
}

export const Gallery = ({ images, className }: GalleryProps) => {
  if (!images.length) return null;

  // Split images into rows of 2, 3, 2, 3, ...
  const rows: string[][] = [];
  let i = 0;
  let pattern = [2, 3];
  let patternIdx = 0;
  while (i < images.length) {
    const count = pattern[patternIdx % pattern.length];
    rows.push(images.slice(i, i + count));
    i += count;
    patternIdx++;
  }

  // Last row should fill the space regardless of image count
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1">
          {row.map((src, colIdx) => (
            <div
              key={colIdx}
              className={
                rowIdx === rows.length - 1
                  ? 'flex-1 h-[700px]' // last row: fill space
                  : `flex-1 ${row.length === 2 ? 'h-[600px]' : 'h-56'}`
              }
            >
              <ImageWithFallback
                src={src}
                alt={`Gallery image ${rowIdx * 3 + colIdx + 1}`}
                className="w-full h-full object-cover"
                loading={rowIdx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
