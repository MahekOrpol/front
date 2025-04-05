// import React from "react";
// import './index.css';
// import { Button } from "react-bootstrap";
// import { FaArrowRightLong } from "react-icons/fa6";
// const Occasion = () => {
//   return (
//     <div className="container mt-5">
//       <div className="row ">
//         <div className="col-md-6 d-flex flex-column gap-3">
//             <h2 className="occasions_text">Make your Occasions Special with our Jewelry</h2>
//             <p className="occasions_text_p">Discover the perfect blend of elegance and exclusivity with our Limited Edition Collaboration jewelry collection. Crafted with precision and designed for those who appreciate timeless beauty, these unique pieces are available for a short time only!</p>
//             <Button className="sop_buttojn_sxasx d-flex align-items-center gap-3">Shop this look <FaArrowRightLong /></Button>
//         </div>
//         <div className="col-md-6"></div>
//       </div>
//     </div>
//   );
// };

// // export default Occasion;
// import React, { useState } from "react";
// import Slider from "react-slick";
// import "./index.css";
// import { Button } from "react-bootstrap";
// import { FaArrowRightLong, FaArrowRight } from "react-icons/fa6";

// const sliderData = [
//   { img: require("../../../Images/image (32).png") },
//   { img: require("../../../Images/image (33).png") },
//   { img: require("../../../Images/image (34).png") },
// ];

// const Occasion = () => {
//   const [nav1, setNav1] = useState(null);
//   const [nav2, setNav2] = useState(null);
//   const [sliderRef, setSliderRef] = useState(null);
//   const [activeSlide, setActiveSlide] = useState(0);

//   const mainSettings = {
//     asNavFor: nav2,
//     ref: (slider) => {
//       setNav1(slider);
//       setSliderRef(slider);
//     },
//     beforeChange: (_, next) => setActiveSlide(next),
//     arrows: false,
//     fade: true,
//   };

//   const thumbSettings = {    
//     asNavFor: nav1,
//     ref: (slider) => setNav2(slider),
//     slidesToShow: 3,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     arrows: false,
//     centerMode: true,
//     centerPadding: "0px",
//   };

//   return (
//     <div className="container my-5">
//       <div className="row align-items-center">
//         {/* LEFT TEXT */}
//         <div className="col-md-6 d-flex flex-column gap-3">
//             <h2 className="occasions_text">Make your Occasions Special with our Jewelry</h2>
//             <p className="occasions_text_p">Discover the perfect blend of elegance and exclusivity with our Limited Edition Collaboration jewelry collection. Crafted with precision and designed for those who appreciate timeless beauty, these unique pieces are available for a short time only!</p>
//             <Button className="sop_buttojn_sxasx d-flex align-items-center gap-3">Shop this look <FaArrowRightLong /></Button>
//         </div>


//         {/* RIGHT SLIDER */}
//         <div className="col-md-6 position-relative">
//           <div className="slider_box">
//             <span className="slide_number">0{activeSlide + 1}</span>

//             <Slider {...mainSettings} className="main_slider">
//               {sliderData.map((item, index) => (
//                 <div key={index}>
//                   <img src={item.img} alt={`slide-${index}`} className="main_img" />
//                 </div>
//               ))}
//             </Slider>

//             <button
//               className="custom_next_arrow"
//               onClick={() => sliderRef?.slickNext()}
//             >
//               <FaArrowRight />
//             </button>

//             <Slider {...thumbSettings} className="thumb_slider mt-3">
//               {sliderData.map((item, index) => (
//                 <div key={index} className="thumb_img_wrapper">
//                   <img
//                     src={item.img}
//                     alt={`thumb-${index}`}
//                     className={`thumb_img ${activeSlide === index ? "active" : ""}`}
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Occasion;
