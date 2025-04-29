import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useProductDetails = (productId, initialProductData) => {
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProductDetails = useCallback(async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/product/get-product-id/${productId}`
      );
      setProductDetails(response.data);
      if (response.data.categoryName) {
        fetchRelatedProducts(response.data.categoryName);
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const fetchRelatedProducts = useCallback(async (categoryName) => {
    try {
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/product/get-related-product`,
        { params: { categoryName } }
      );
      setRelatedProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching related products:', error);
      toast.error('Failed to fetch related products');
    }
  }, []);

  useEffect(() => {
    if (!initialProductData) {
      fetchProductDetails();
    } else {
      setProductDetails(initialProductData);
      if (initialProductData.categoryName) {
        fetchRelatedProducts(initialProductData.categoryName);
      }
    }
  }, [initialProductData, fetchProductDetails]);

  return {
    productDetails,
    relatedProducts,
    loading,
    error,
    refetch: fetchProductDetails
  };
}; 