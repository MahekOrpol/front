import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "./index.css";

const Gift = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    // autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container row align-items-center ring_sec_gifff">
      {/* LEFT SIDE TEXT */}
      <div className="col-md-6 d-flex flex-column gap-3">
        <h2 className="mack_pox_headfr">
          Make your Occasions Special with our Jewelry
        </h2>
        <p className="mack_pox_headfrp">
          Discover the perfect blend of elegance and exclusivity with our
          Limited Edition Collaboration jewelry collection. Crafted with
          precision and designed for those who appreciate timeless beauty, these
          unique pieces are available for a short time only!
        </p>
        <button className="shop_now_sijd">
          Shop now <FaArrowRightLong />
        </button>
      </div>

      {/* RIGHT SIDE SLIDER + STATIC CARD */}
      <div className="col-md-6 d-flex justify-content-between ordddd p-0 align-items-center">
        {/* Slider Card */}
        <div className="slider-card-wrapper">
          <Slider {...sliderSettings} className="h-100">
            <div className="slider-card position-relative">
              <img
                src={require("../../../Images/slider.svg").default}
                alt="Gift Slide"
                className=" "
              />
            </div>
            <div className="slider-card position-relative">
              <img
                src={require("../../../Images/slider.svg").default}
                alt="Gift Slide 2"
                className=" "
              />
            </div>
          </Slider>
        </div>

        {/* Static Card */}
        <div className="static-gift-card text-center MHK position-relative gap-2">
          <img
            src={require("../../../Images/first.svg").default}
            className="img-fluid gift-img gift_box_dsdd"
            alt="Gift Your Loved Ones"
          />

          <h5 className="dfvcf_VFFYT ">Gift Your Loved Ones</h5>
          <p className="">Shop Gifts That Make the Moments Magical</p>
          <button className="circle-btn">
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gift;
