import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Your server URL

const ProductViewCounter = ({ productId }) => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Join product room
    socket.emit('join_product', productId);

    // Listen for viewer count updates
    socket.on('viewer_count', (count) => {
      setViewerCount(count);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, [productId]);

  return (
    <div style={{ fontWeight: 'bold' }}>
      {viewerCount} customer{viewerCount !== 1 ? 's' : ''} viewing this product
    </div>
  );
};

export default ProductViewCounter;
