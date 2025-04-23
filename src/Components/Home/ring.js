import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import './ring.css';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
const RingSlider = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef(null);
  const rings = [
    { title: "Classic Ring", description: "Timeless elegance in its purest form" },
    { title: "Modern Ring", description: "Contemporary brilliance with a sleek design" },
    { title: "Vintage Ring", description: "Antique charm with intricate craftsmanship" },
    { title: "Elegant Rings", description: "Refined simplicity for everyday luxury" },
    { title: "Premium Ring", description: "Exquisite craftsmanship for the discerning" },
  ];
  const images = [
    "1.png", "8.png", "3.png", "5.png", "6.png", "8.png", "9.png"
  ];
  useEffect(() => {
    const $slider = $(sliderRef.current);
    const initSlider = () => {
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
      const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        dots: false,
        speed: 600, // Slightly slower for elegance
        cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        centerPadding: "0px",
        infinite: true,
        swipe: false,
        draggable: false,
        touchMove: false,
        swipeToSlide: true,
        arrows: true,
        prevArrow: $(".slick-prev1"),
        nextArrow: $(".slick-next1"),
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              centerMode: images.length > 5 // Only center if enough items
            }
          },
          {
            breakpoint: 990,
            settings: {
              slidesToShow: 3,
              centerMode: images.length > 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              centerMode: images.length > 3
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 3,
              centerMode: images.length > 1
            }
          }
        ]
      };
      $slider.slick(settings);
      $slider.on('afterChange', function (event, slick, currentSlide) {
        const visibleSlides = Math.min(
          5, // Default
          window.innerWidth < 576 ? 3 :
          window.innerWidth < 990 ? 3 : 5
        );
        const center = (currentSlide + Math.floor(visibleSlides / 2)) % images.length;
        setCenterIndex(center % rings.length); // Ensure it stays within rings bounds
      });
    };
    initSlider();
    // Handle window resize more efficiently
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initSlider();
      }, 250);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
    };
  }, [images.length, rings.length]);
  return (
    <div className="wrapper">
      <div className="center-slider dis_sty_ssss" ref={sliderRef}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              className={`slider_img_ssss ${centerIndex === index % rings.length ? 'active-slide' : ''}`}
              src={require(`../../Images/${img}`)}
              alt={`Ring ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="slick-nav-container slidere-roijidfndm">
        <button className="slick-next1 custom-prev ps-2 ps-md-0">
          <MdArrowBackIos />
        </button>
        <div className="center-ring-info">
          <h3>{rings[centerIndex]?.title}</h3>
          <p>{rings[centerIndex]?.description}</p>
        </div>
        <button className="slick-prev1 custom-next">
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};
export default RingSlider;