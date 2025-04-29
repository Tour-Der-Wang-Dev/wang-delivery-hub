
import React, { useState, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loadingStrategy?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

/**
 * OptimizedImage Component
 * - Handles lazy loading
 * - Provides fallback for missing images
 * - Prevents layout shifts with placeholder
 * - Memoized to prevent unnecessary re-renders
 */
const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className,
  loadingStrategy = 'lazy',
  fallbackSrc = '/placeholder.svg',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Only use eager loading for critical above-the-fold images
  const loading = loadingStrategy === 'eager' ? undefined : 'lazy';
  
  // Use the fallback if there's an error
  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        !isLoaded && !hasError && "bg-gray-100",
        className
      )}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : undefined
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
