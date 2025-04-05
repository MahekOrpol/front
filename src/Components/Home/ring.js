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

import React, { useEffect } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import './ring.css'


// ✅ SlickSlider component
const RingSlider = () => {
  useEffect(() => {
    $(".center-slider").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      dots: false,
      speed: 300,
      centerPadding: "0px",
      infinite: true,
      // autoplaySpeed: 5000,
      // autoplay: true,
      responsive: [
        {
          breakpoint: 1200, // For screens <= 1200px
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 990, // For screens <= 992px
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768, // For screens <= 768px (tablets)
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 576, // For screens <= 576px (mobile)
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 374, // For screens <= 576px (mobile)
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    

    // Cleanup Slick on component unmount
    return () => {
      $(".center-slider").slick("unslick");
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="center-slider">
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-hidden-halo.webp")} /></div>
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-solitaire.webp")} /></div>
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} /></div>
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-three-stone.webp")} /></div>
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-vintage.webp")} /></div>
        <div><img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} /></div>
      </div>
    </div>
  );
};

export default RingSlider;


