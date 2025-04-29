import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  quality = 75
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    `https://imagecdn.app/v2/image/${encodeURIComponent(src)}?width=${width || 'auto'}&quality=${quality}&blur=20`
  );

  useEffect(() => {
    if (!priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
    } else {
      setCurrentSrc(src);
      setIsLoading(false);
    }
  }, [src, priority]);

  return (
    <div className={`image-container ${isLoading ? 'loading' : ''}`}>
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'blur-sm' : ''}`}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        style={{
          transition: 'filter 0.3s ease-in-out',
        }}
      />
      <style jsx>{`
        .image-container {
          position: relative;
          overflow: hidden;
        }
        .loading {
          background: #f0f0f0;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .blur-sm {
          filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage; 