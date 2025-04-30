import { useState, useCallback, useEffect } from 'react';

export const useProductImages = (initialImages = []) => {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
      setSelectedImage(initialImages[0]);
      
      // Immediately start loading the first image with high priority
      const firstImage = new Image();
      firstImage.src = getOptimizedImageUrl(initialImages[0]);
      firstImage.fetchPriority = 'high';
      firstImage.onload = () => setIsLoading(false);
      
      // Preload remaining images with lower priority
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          preloadImages(initialImages.slice(1));
        });
      } else {
        setTimeout(() => {
          preloadImages(initialImages.slice(1));
        }, 1000);
      }
    }
  }, [initialImages]);

  const preloadImages = useCallback(async (imagesToPreload) => {
    try {
      const imagePromises = imagesToPreload.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.loading = 'lazy';
          img.onload = () => resolve(imageUrl);
          img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
          img.src = getOptimizedImageUrl(imageUrl);
        });
      });

      await Promise.all(imagePromises);
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }, []);

  const selectImage = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const getOptimizedImageUrl = useCallback((imageUrl, width = 800) => {
    if (!imageUrl) return '';
    
    // If the URL is already from a CDN or image optimization service
    if (imageUrl.includes('imagecdn.app')) {
      return imageUrl;
    }

    // Add image optimization parameters
    const optimizedUrl = `https://imagecdn.app/v2/image/${encodeURIComponent(imageUrl)}?width=${width}&format=webp&quality=80`;
    return optimizedUrl;
  }, []);

  return {
    images,
    selectedImage,
    isLoading,
    selectImage,
    getOptimizedImageUrl
  };
}; 