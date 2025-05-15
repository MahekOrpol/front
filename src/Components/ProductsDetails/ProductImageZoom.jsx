import React, { useState } from "react";
import "./index.css";

const ProductImageZoom = ({ src, alt }) => {
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  return (
    <div 
      className="zoom-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img
        loading="lazy"
        src={src}
        className="product-image"
        alt={alt}
      />
      {showZoom && (
        <div 
          className="zoom-lens" 
          style={zoomStyle}
        />
      )}
    </div>
  );
};

// Then use it in your product details:
{productImages.map((img, index) => (
  <div className="col-md-6 border vider_saxasxs" key={index}>
    <ProductImageZoom 
      src={`https://dev.crystovajewels.com${img}`}
      alt={`Product ${index + 1}`}
    />
  </div>
))}