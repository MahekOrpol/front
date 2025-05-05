import React, { useMemo, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Section7Occasions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleCategoryClick = React.useCallback(
    (category) => {
      navigate(`/products?categoryName=${category}`);
    },
    [navigate]
  );

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      // afterChange: (current) => setCurrentSlide(current),
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),

      customPaging: (i) => (
        <button
          className={`custom-dot ${i === currentSlide ? "active" : ""}`}
        />
      ),
      appendDots: (dots) => {
        const visibleCount = 3;
        let start = 0;

        if (currentSlide >= visibleCount - 1) {
          start = currentSlide - 1;
        }

        const end = Math.min(start + visibleCount, dots.length);

        return <ul className="custom-dots">{dots.slice(start, end)}</ul>;
      },
    }),
    [currentSlide]
  );

  // List of slider images and their corresponding content
  const sliderContent = [
    {
      image: "/Images/slider.webp",
      staticImage: "/Images/first.svg",
      title: "Graceful Gifting",
      description:
        "Timeless treasures for every occasion. Make memories that last forever.",
      path: "Rings",
    },
    {
      image: "/Images/g4.webp",
      title: "Elegant Moments",
      description:
        "Magical memories begin here with our exquisite fine Jewellery collection.",
      path: "Earrings",
    },
    {
      image: "/Images/gift2.webp",
      title: "Perfect Gifting",
      description:
        "Discover the ideal gift that speaks love and creates lasting memories.",
      path: "Pendant",
    },
    {
      image: "/Images/gift3.webp",
      title: "Timeless Beauty",
      description:
        "Every piece crafted with elegance, skill, and lasting significance.",
      path: "Rings",
    },
    {
      image: "/Images/gift4.webp",
      title: "Luxury in Style",
      description:
        "Celebrate every occasion with our exclusive premium Jewellery gifts.",
      path: "Band",
    },
    {
      image: "/Images/gift5.webp",
      title: "Sparkling Beauty",
      description:
        "Mark life’s precious events with stunning gifts that sparkle and shine.",
      path: "Bracelet",
    },
    {
      image: "/Images/gift3 (1).webp",
      title: "Memory Makers",
      description:
        "Create cherished memories with our beautiful handcrafted Jewellery.",
      path: "Necklace",
    },
  ];

  return (
    <div className="paddingdn d-flex flex-column align-items-center hdr_csd mt-md-1 ewcdsecesdfc">
      <span className="category_name best_sellig_sdcdc d-none">
        Jewelry for Occasions
      </span>
      <p className="category_txt best_sellig_sdcdc d-none">
        Celebrate Forever with a Sparkle
      </p>
      <img
        loading="lazy"
        // fetchPriority="high"
        src="/Images/Groupimg.png"
        className="home_tag_img best_sellig_sdcdc d-none"
        alt="home"
      />
      <div className="container row col-md-12 d-flex align-items-center ring_sec_gifff p-0">
        {/* LEFT SIDE TEXT */}
        <div className="align-items-start col-md-6 d-flex flex-column gap-2">
          <h2 className="mack_pox_headfr">
            Celebrate Every Moment with Timeless Elegance
          </h2>
          <p className="mack_pox_headfrp">
            Discover exclusive designs in our Limited Edition Jewelry Collection
            – where artistry meets sophistication. Handcrafted with precision
            for those who value beauty that never fades. Available for a limited
            time only.
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
            <p>{sliderContent[currentSlide].description}</p>
            <button
              className="circle-btn"
              onClick={() =>
                handleCategoryClick(sliderContent[currentSlide]?.path)
              }
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section7Occasions;
