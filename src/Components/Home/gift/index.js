import React, { useMemo, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "./index.css";

const Gift = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      afterChange: (current) => setCurrentSlide(current)
    }),
    []
  );

  // List of slider images and their corresponding content
  const sliderContent = [
    {
      image: "/Images/slider.webp",
      staticImage: "/Images/first.svg",
      title: "Grace in Every Gift",
      description: "Delight loved ones with timeless treasures. Make every moment unforgettable."
    },
    {
      image: "/Images/g4.webp",
      title: "Elegant Celebrations",
      description: "Create magical moments with our exquisite collection of fine jewelry."
    },
    {
      image: "/Images/gift2.webp",
      title: "Perfect Presents",
      description: "Find the ideal gift that speaks volumes and creates lasting memories."
    },
    {
      image: "/Images/gift3.webp",
      title: "Timeless Treasures",
      description: "Each piece tells a story of elegance, craftsmanship, and eternal beauty."
    },
    {
      image: "/Images/gift4.webp",
      title: "Luxury Gifting",
      description: "Experience the joy of giving with our premium jewelry collection."
    },
    {
      image: "/Images/gift5.webp",
      title: "Special Moments",
      description: "Mark life's precious occasions with gifts that sparkle and shine."
    },
    {
      image: "/Images/gift3 (1).webp",
      title: "Cherished Memories",
      description: "Create unforgettable memories with our stunning jewelry pieces."
    }
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
            {sliderContent.map((content, index) => (
              <div key={index} className="slider-card">
                <img
                  loading="eager"
                  src={content.image}
                  alt={`Gift Slide ${index + 1}`}
                  className="gift_img_round"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Static Card - Now Dynamic based on current slide */}
        <div className="static-gift-card text-center MHK position-relative gap-2 gift_img_round">
          <img
            loading="eager"
            src="/Images/first.svg"
            className="img-fluid gift-img gift_box_dsdd"
            alt="Gift Your Loved Ones"
          />
          <h5 className="dfvcf_VFFYT">{sliderContent[currentSlide].title}</h5>
          <p>
            {sliderContent[currentSlide].description}
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
