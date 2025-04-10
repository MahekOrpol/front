// import React from "react";
// import "./ring.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// const rings = [
//   { image: require("../../Images/Frame 197 (1).png"), title: "Classic Ring", description: "Timeless elegance in its purest form" },
//   { image: require("../../Images/Frame 197 (1).png"), title: "Modern Ring", description: "Contemporary brilliance with a sleek design" },
//   { image: require("../../Images/Frame 197 (1).png"), title: "Vintage Ring", description: "Antique charm with intricate craftsmanship" },
//   { image: require("../../Images/Frame 197 (1).png"), title: "Elegant Ring1", description: "Refined simplicity for everyday luxury" },
//   { image: require("../../Images/Frame 197 (1).png"), title: "Elegant Ring", description: "Refined simplicity for everyday luxury" },
// ];

// const RingSlider = () => {
//   return (
//     <div className="ring-sectiionssss">

//     <section className="swiper-container ring-slider-container">
//       <Swiper
//         modules={[Navigation, Pagination,EffectCoverflow]}
//         // spaceBetween={20}
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={5}
//         loop={true}
//         navigation
//         pagination={{ clickable: true }}
//         coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 200,
//             modifier: 1,
//             slideShadows: false,
//           }}
//         // autoplay={{ delay: 3000 }}
//       >
//         {rings.map((ring, index) => (
//           <SwiperSlide key={index} className="swiper-slide-custom">
//             <img src={ring.image} alt={ring.title} className="ring-image" />
//             <div className="ring-details">
//               <h2 className="ring-desssss" style={{fontSize:'13px'}}>{ring.title}</h2>
//               <p className="ring-desssssss" style={{fontSize:'11px'}}>{ring.description}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import './ring.css'


// ✅ SlickSlider component
const RingSlider = () => {
  
  useEffect(() => {
    const $slider = $(".center-slider");
  
    // Initialize Slick only if not already initialized
    if ($slider.hasClass("slick-initialized")) {
      $slider.slick("unslick");
    }
  
    $slider.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      dots: false,
      speed: 300,
      centerPadding: "0px",
      infinite: true,
      arrows: true,
      prevArrow: $(".slick-prev"),
      nextArrow: $(".slick-next"),
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 5 } },
        { breakpoint: 990, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 576, settings: { slidesToShow: 3 } },
        { breakpoint: 374, settings: { slidesToShow: 1 } },
      ],
    });
  
    return () => {
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
    };
  }, []);
  

  // Added ring data array
  const rings = [
    { title: "Classic Ring", description: "Timeless elegance in its purest form" },
    { title: "Modern Ring", description: "Contemporary brilliance with a sleek design" },
    { title: "Vintage Ring", description: "Antique charm with intricate craftsmanship" },
    { title: "Elegant Ring1", description: "Refined simplicity for everyday luxury" },
    { title: "Elegant Ring", description: "Refined simplicity for everyday luxury" },
  ];

  return (
    <div className="wrapper">
      <div className="center-slider">
        {/* Added ring details to each slide while keeping original images */}
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-hidden-halo.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[0].title}</h3>
            <p>{rings[0].description}</p>
          </div>
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-solitaire.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[1].title}</h3>
            <p>{rings[1].description}</p>
          </div>
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[2].title}</h3>
            <p>{rings[2].description}</p>
          </div>
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-three-stone.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[3].title}</h3>
            <p>{rings[3].description}</p>
          </div>
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-vintage.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[4].title}</h3>
            <p>{rings[4].description}</p>
          </div>
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} />
          <div className="ring-info" style={{display: 'none'}}>
            <h3 >{rings[0].title}</h3>
            <p>{rings[0].description}</p>
          </div>
        </div>
      </div>

      {/* Custom navigation box - kept original */}
      <div className="slick-nav-container slidere-roijidfndm">
        <button className="slick-prev custom-prev">&#9665;</button>
        <button className="slick-next custom-next">&#9655;</button>
      </div>
    </div>
  );
};

export default RingSlider;


