// import React, { useState, useEffect } from "react";
// import "./index.css";
// import img1 from "../../../Images/image (32).png";
// import img2 from "../../../Images/image (33).png";
// import img3 from "../../../Images/image (34).png";
// import { Button } from "react-bootstrap";
// import { FaArrowRightLong } from "react-icons/fa6";

// const images = [img1, img2, img3];

// const Occasion = () => {
//   const [index, setIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [slideDirection, setSlideDirection] = useState("right");

//   const updateSlider = (i) => {
//     if (i === index || isAnimating) return;
    
//     setSlideDirection(i > index ? "right" : "left");
//     setIsAnimating(true);
//     setTimeout(() => {
//       setIndex(i);
//       setIsAnimating(false);
//     }, 300);
//   };

//   const nextSlide = () => {
//     if (isAnimating) return;
    
//     setSlideDirection("right");
//     setIsAnimating(true);
//     setTimeout(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//       setIsAnimating(false);
//     }, 300);
//   };

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [index]);

//   return (
//     <div className="slider-container container">
//       <div className="row align-items-center">
//         <div className="slider-text col-md-6">
//           <h2 className="occasions_text">
//             Make your Occasions Special with our Jewelry
//           </h2>
//           <p className="occasions_text_p">
//             Discover the perfect blend of elegance and exclusivity with our
//             Limited Edition Collaboration jewelry collection. Crafted with
//             precision and designed for those who appreciate timeless beauty,
//             these unique pieces are available for a short time only!
//           </p>
//           <Button className="sop_buttojn_sxasx d-flex align-items-center gap-3">
//             Shop this look <FaArrowRightLong />
//           </Button>
//         </div>
//         <div className="slider-image-section col-md-6 position-relative">
//           <div className="slide-number">
//             {String(index + 1).padStart(2, "0")}
//           </div>
//           <div className="image-container">
//             <img
//               src={images[index]}
//               alt={`Jewelry Slide ${index + 1}`}
//               className={`main-image ${isAnimating ? `slide-${slideDirection}` : ""} ${index === 0 ? "scale-main" : ""}`}
//             />
//           </div>
//           <div className="thumbs">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`thumb${i + 1}`}
//                 className={`thumb-image ${i === index ? "active-thumb" : ""} ${
//                   i === 0
//                     ? "thumb-image12"
//                     : i === 1
//                     ? "thumb-image13"
//                     : "thumb-image14"
//                 }`}
//                 onClick={() => updateSlider(i)}
//               />
//             ))}
//           </div>
//           <button className="arrow-btn" onClick={nextSlide}>
//             →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Occasion;

import React, { useState, useEffect } from "react";
import "./index.css";
import img1 from "../../../Images/image (32).png";
import img2 from "../../../Images/jewe.jpg";
import img3 from "../../../Images/jewelery (1).jpg";
import { Button } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";

const images = [img1, img2, img3];

const Occasion = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");

  const updateSlider = (i) => {
    if (i === index || isAnimating) return;
    
    setSlideDirection(i > index ? "right" : "left");
    setIsAnimating(true);
    setTimeout(() => {
      setIndex(i);
      setIsAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    
    setSlideDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="slider-container container">
      <div className="row align-items-center">
        <div className="slider-text col-md-6">
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
        <div className="slider-image-section col-md-6 position-relative">
          <div className="slide-number">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="image-container">
            <img
              src={images[index]}
              alt={`Jewelry Slide ${index + 1}`}
              className={`main-image ${isAnimating ? `slide-${slideDirection}` : ""} ${index === 0 ? "scale-main" : ""}`}
            />
          </div>
          <div className="thumbs">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb${i + 1}`}
                className={`thumb-image ${i === index ? "active-thumb" : ""} ${
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












