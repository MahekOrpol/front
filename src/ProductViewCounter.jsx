import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// const socket = io("http://147.93.104.196:3000");
const socket = io("http://192.168.1.4:3000");

const ProductViewCounter = ({ productId }) => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Join product room
    socket.emit('join_product', productId);

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
