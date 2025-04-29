import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useWishlist = (userId) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkWishlistStatus = useCallback(async (productId) => {
    if (!userId || !productId) return;

    try {
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/wishlist/check-wishlist/${userId}/${productId}`
      );
      setIsInWishlist(response.data.isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  }, [userId]);

  const toggleWishlist = useCallback(async (productId) => {
    if (!userId || !productId) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      setLoading(true);
      const endpoint = isInWishlist
        ? `https://dev.crystovajewels.com/api/v1/wishlist/remove-wishlist/${userId}/${productId}`
        : `https://dev.crystovajewels.com/api/v1/wishlist/add-wishlist/${userId}/${productId}`;

      await axios.post(endpoint);
      setIsInWishlist(!isInWishlist);
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  }, [userId, isInWishlist]);

  return {
    isInWishlist,
    loading,
    checkWishlistStatus,
    toggleWishlist
  };
}; 