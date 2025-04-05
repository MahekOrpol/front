import React, { useState } from "react";
import "./index.css"; // Styles separated into a CSS file
import img1 from "../../../Images/image (32).png";
import img2 from "../../../Images/image (33).png";
import img3 from "../../../Images/image (34).png";
import { Button } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";

const images = [img1, img2, img3];

const Occasion = () => {
  //   const images = [
  //       { img: require("../../../Images/image (32).png") },
  //       { img: require("../../../Images/image (33).png") },
  //       { img: require("../../../Images/image (34).png") },
  //     ];

  const [index, setIndex] = useState(0);

  const updateSlider = (i) => {
    setIndex(i);
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slider-container container">
      <div className="row align-items-center">
        <div className="slider-text col-md-6 ">
          <h2 className="occasions_text">
            Make your Occasions Special with our Jewelry
          </h2>
          <p className="occasions_text_p">
            Discover the perfect blend of elegance and exclusivity with our
            Limited Edition Collaboration jewelry collection. Crafted with
            precision and designed for those who appreciate timeless beauty,
            these unique pieces are available for a short time only!
          </p>
          <Button className="sop_buttojn_sxasx d-flex align-items-center gap-3">
            Shop this look <FaArrowRightLong />
          </Button>
        </div>
        <div className="slider-image-section col-md-6">
          <div className="slide-number">
            {String(index + 1).padStart(2, "0")}
          </div>
          <img
            src={images[index]}
            alt={`Jewelry Slide ${index + 1}`}
            className="main-image"
          />
          <div className="thumbs">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb${i + 1}`}
                className={`thumb-image${i + 1} ${
                  i === 0
                    ? "thumb-image12"
                    : i === 1
                    ? "thumb-image13"
                    : "thumb-image14"
                }`}
                onClick={() => updateSlider(i)}
              />
            ))}
          </div>
          <button className="arrow-btn" onClick={nextSlide}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Occasion;
