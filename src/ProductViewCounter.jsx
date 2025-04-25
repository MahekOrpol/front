import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ProductViewCounter = ({ productId }) => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    const socket = io("https://dev.crystovajewels.com", {
      transports: ['websocket'],
    });

    console.log(`Joining product room: ${productId}`);
    socket.emit('join_product', productId);

    socket.on('viewer_count', (count) => {
      console.log(`Viewer count updated: ${count}`);
      setViewerCount(count);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err);
    });

    return () => {
      console.log(`Leaving product room: ${productId}`);
      socket.emit('leave_product', productId);
      socket.disconnect();
    };
  }, [productId]);

  return (
    <div style={{ fontWeight: 'bold' }}>
      {viewerCount} {viewerCount === 1 ? 'view' : 'views'}
    </div>
  );
};

export default ProductViewCounter;
