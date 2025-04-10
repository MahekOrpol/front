import React, { useState, useEffect } from "react";
import "./index.css";
import img1 from "../../../Images/image (32).png";
import img2 from "../../../Images/jewe.jpg";
import img3 from "../../../Images/jewelery (1).jpg";
import { Button } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";

const images = [img1, img2, img3];

const Occasion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsAnimating(false);
    }, 500); // Matches animation duration
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="one-way-slider container">
      <div className="slider-content">
        <h2 className="occation-content-h2">
          Make your Occasions Special with our Jewelry
        </h2>
        <p className="occasions_text_p">
        Discover the perfect blend of elegance and exclusivity with our Limited Edition Collaboration jewelry collection. Crafted with precision and designed for those who appreciate timeless beauty, these unique pieces are available for a short time only!
        </p>
        <Button className="shop-button d-md-block d-none">
          Shop this look <FaArrowRightLong />
        </Button>
      </div>

      <div className="slider-container">
        <div className="slide-number-indicator ">
          {String(currentIndex + 1).padStart(2, "0")}
        </div>
        <div className="slider_img_bgggg"></div>
        <div className="slider-track">
          {images.map((img, index) => {
            const position =
              (index - currentIndex + images.length) % images.length;
            let sizeClass = "";
            if (position === 0) sizeClass = "image-large";
            else if (position === 1) sizeClass = "image-medium";  
            else sizeClass = "image-small";

            return (
              <div
                key={index}
                className={`slider-image ${sizeClass} ${
                  isAnimating ? "slide-left" : ""
                }`}
                style={{ zIndex: images.length - position }}
              >
                <img src={img} alt={`Jewelry ${index + 1}`} />
              </div>
            );
          })}
        </div>

        {/* <button className="next-button" onClick={nextSlide}>
          <FaArrowRightLong />
        </button> */}
      </div>
    </div>
  );
};

export default Occasion;
