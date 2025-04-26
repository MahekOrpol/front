import React, { useMemo } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "./index.css";

const Gift = () => {
  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    }),
    []
  );

  // List of slider images
  const sliderImages = [
    "/Images/slider.webp",
    "/Images/g4.webp",
    "/Images/gift2.webp",
    "/Images/gift3.webp",
    "/Images/gift4.webp",
    "/Images/gift5.webp",
    "/Images/gift3 (1).webp",
  ];

  return (
    <div className="container row col-md-12 d-flex align-items-center ring_sec_gifff p-0">
      {/* LEFT SIDE TEXT */}
      <div className="align-items-start col-md-6 d-flex flex-column gap-2">
        <h2 className="mack_pox_headfr">
          Celebrate Every Moment with Timeless Elegance
        </h2>
        <p className="mack_pox_headfrp">
          Discover exclusive designs in our Limited Edition Jewelry Collection –
          where artistry meets sophistication. Handcrafted with precision for
          those who value beauty that never fades. Available for a limited time
          only.
        </p>
        <button className="shop_now_sijd">
          Explore Collection <FaArrowRightLong />
        </button>
      </div>

      {/* RIGHT SIDE SLIDER + STATIC CARD */}
      <div className="col-md-6 ordddd">
        {/* Slider Card */}
        <div className="slider-card-wrapper">
          <Slider {...sliderSettings}>
            {sliderImages.map((src, index) => (
              <div key={index} className="slider-card">
                <img
                  loading="lazy"
                  src={src}
                  alt={`Gift Slide ${index + 1}`}
                  className="gift_img_round"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Static Card */}
        <div className="static-gift-card text-center MHK position-relative gap-2 gift_img_round">
          <img
            loading="lazy"
            src="/Images/first.svg"
            className="img-fluid gift-img gift_box_dsdd"
            alt="Gift Your Loved Ones"
          />
          <h5 className="dfvcf_VFFYT">Grace in Every Gift</h5>
          <p>
            Delight loved ones with timeless treasures. Make every moment
            unforgettable.
          </p>
          <button className="circle-btn">
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gift;
