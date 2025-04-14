import React, { useEffect, useState } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import './ring.css';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const RingSlider = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const rings = [
    { title: "Classic Ring", description: "Timeless elegance in its purest form" },
    { title: "Modern Ring", description: "Contemporary brilliance with a sleek design" },
    { title: "Vintage Ring", description: "Antique charm with intricate craftsmanship" },
    { title: "Elegant Ring1", description: "Refined simplicity for everyday luxury" },
    { title: "Elegant Ring", description: "Refined simplicity for everyday luxury" },
  ];

  useEffect(() => {
    const $slider = $(".center-slider");

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
      prevArrow: $(".slick-prev1"),
      nextArrow: $(".slick-next1"),
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 5 } },
        { breakpoint: 990, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 576, settings: { slidesToShow: 3 } },
        { breakpoint: 375, settings: { slidesToShow: 3 } },
      ],
      onAfterChange: function (currentSlide) {
        const screenWidth = window.innerWidth;
        let visibleSlides = 5;

        if (screenWidth < 576) visibleSlides = 3;
        else if (screenWidth < 768) visibleSlides = 3;
        else if (screenWidth < 990) visibleSlides = 3;
        else if (screenWidth < 1200) visibleSlides = 5;

        const center = (currentSlide + Math.floor(visibleSlides / 2)) % rings.length;
        setCenterIndex(center);
      },
    });

    return () => {
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
    };
  }, [rings.length]);

  return (
    <div className="wrapper">
      <div className="center-slider dis_sty_ssss">
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-hidden-halo.webp")} alt="Ring" />
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-solitaire.webp")} alt="Ring" />
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} alt="Ring" />
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-three-stone.webp")} alt="Ring" />
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-vintage.webp")} alt="Ring" />
        </div>
        <div>
          <img className="slider_img_ssss" src={require("../../Images/styles-slider-halo.webp")} alt="Ring" />
        </div>
      </div>

      <div className="slick-nav-container slidere-roijidfndm">
        <button className="slick-next1 custom-prev"><MdArrowBackIos /></button>

        <div className="center-ring-info">
          <h3>{rings[centerIndex]?.title}</h3>
          <p>{rings[centerIndex]?.description}</p>
        </div>

        <button className="slick-prev1 custom-next"><MdArrowForwardIos /></button>
      </div>
    </div>
  );
};

export default RingSlider;
