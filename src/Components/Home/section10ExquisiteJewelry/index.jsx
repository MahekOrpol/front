import React, { useState, useEffect, useCallback } from "react";
import "./index.css";

const images = [
  "/Images/image (32).png",
  "/Images/jewe.jpg",
  "/Images/jewelery (1).jpg",
];
const groupImg = "/Images/Groupimg.png";

const section10ExquisiteJewelry = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="one-way-slider container">
      <div className="slider-content">
      <h2 className="occation-content-h2 mobi-fdfcdfc1s">
          Elevate Every Moment with Exquisite Jewellery
        </h2>
        <h2 className="occation-content-h2 d-none mobi-fdfcdfc category_name">
        Elevate Moments
        </h2>
        <img
          src={groupImg}
          className="home_tag_img mobile_rcvdfcvfd"
          alt="Decorative tag"
          loading="eager"
        />
        <p className="occasions_text_p mb-0">
          Indulge in the allure of our Limited Edition Collaboration, where
          artistry meets elegance. Each piece is meticulously crafted to
          celebrate timeless beauty, available only for a fleeting time.
        </p>
      
      </div>

      <div className="slider-container">
        <div className="slide-number-indicator">
          {String(currentIndex + 1).padStart(2, "0")}
        </div>
        <div className="slider_img_bgggg" />

        <div className="slider-track">
          {images.map((img, index) => {
            const position =
              (index - currentIndex + images.length) % images.length;
            const sizeClass =
              position === 0
                ? "image-large"
                : position === 1
                ? "image-medium"
                : "image-small";

            return (
              <div
                key={index}
                className={`slider-image ${sizeClass} ${
                  isAnimating ? "slide-left" : ""
                }`}
                style={{ zIndex: images.length - position }}
              >
                <img src={img} alt={`Jewelry ${index + 1}`} loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default section10ExquisiteJewelry;
