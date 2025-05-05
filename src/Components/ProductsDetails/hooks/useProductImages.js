import { useState, useCallback, useEffect } from 'react';

export const useProductImages = (initialImages = []) => {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
      setSelectedImage(initialImages[0]);
      setIsLoading(false);
    }
  }, [initialImages]);

  const preloadImages = useCallback(async () => {
    try {
      const imagePromises = images.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(imageUrl);
          img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
          img.src = imageUrl;
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    } catch (error) {
      console.error('Error preloading images:', error);
      setIsLoading(false);
    }
  }, [images]);

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
    const optimizedUrl = `https://imagecdn.app/v2/image/${encodeURIComponent(imageUrl)}?width=${width}&format=webp`;
    return optimizedUrl;
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return {
    images,
    selectedImage,
    isLoading,
    selectImage,
    getOptimizedImageUrl
  };
}; 