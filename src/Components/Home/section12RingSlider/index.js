import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const rings = [
  {
    title: "Classic Ring",
    description: "Timeless elegance in its purest form",
    img: "1.png",
  },
  {
    title: "Modern Ring",
    description: "Contemporary brilliance with a sleek design",
    img: "8.webp",
  },
  {
    title: "Vintage Ring",
    description: "Antique charm with intricate craftsmanship",
    img: "3.webp",
  },
  {
    title: "Elegant Rings",
    description: "Refined simplicity for everyday luxury",
    img: "5.webp",
  },
  {
    title: "Premium Ring",
    description: "Exquisite craftsmanship for the discerning",
    img: "6.webp",
  },
  {
    title: "Classic Ring",
    description: "Timeless elegance in its purest form",
    img: "1.png",
  },
  {
    title: "Modern Ring",
    description: "Contemporary brilliance with a sleek design",
    img: "8.webp",
  },
  {
    title: "Vintage Ring",
    description: "Antique charm with intricate craftsmanship",
    img: "3.webp",
  },
  {
    title: "Elegant Rings",
    description: "Refined simplicity for everyday luxury",
    img: "5.webp",
  },
  {
    title: "Premium Ring",
    description: "Exquisite craftsmanship for the discerning",
    img: "6.webp",
  },
];

const Section12RingSlider = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setNavReady(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlides = 5;
  const slidesToShow = Math.min(maxSlides, rings.length);

  // Helper to get the offset from the center for each slide
  const getOffset = (idx) => {
    let offset = idx - centerIndex;
    if (offset > Math.floor(rings.length / 2)) offset -= rings.length;
    if (offset < -Math.floor(rings.length / 2)) offset += rings.length;
    return offset;
  };

  return (
    <>
      <div className="paddingdn d-flex flex-column align-items-center mt-md-4 szdxksdx_HGVBH">
        <span className="category_name mt-2">Discover Styles</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img
          loading="eager"
          fetchpriority="high"
          src="/Images/Groupimg.png"
          className="home_tag_img"
          alt="home"
        />
      </div>
      <div className="ring-slider-container1">
        {navReady && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            speed={600}
            slidesPerView={slidesToShow}
            centeredSlides={true}
            loop={rings.length > slidesToShow}
            onSlideChange={(swiper) => setCenterIndex(swiper.realIndex)}
            className="ring-swiper"
            breakpoints={{
              0: { slidesPerView: 3 },
              600: { slidesPerView: 3 },
              1200: { slidesPerView: slidesToShow },
            }}
          >
            {rings.map((ring, idx) => {
              const offset = getOffset(idx);
              let scale = 1;
              if (offset === 0) {
                // Center slide: largest
                scale = 1.0;
              } else if (Math.abs(offset) === 1) {
                // Immediate left/right: scale down
                scale = 0.85;
              } else {
                // All others: even smaller
                scale = 0.7;
              }
              // Adjust translateY for arc effect
              const translateY = isMobile
                ? -Math.abs(offset) * 80
                : -Math.abs(offset) * 100;

              return (
                <SwiperSlide key={idx}>
                  <div
                    className="ring-slide"
                    style={{
                      transform: `scale(${scale}) translateY(${translateY}px)`,
                      opacity: 1,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    <img
                      src={`/Images/${ring.img}`}
                      alt={ring.title}
                      className="ring-img"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="ring-info-nav">
          <button
            ref={prevRef}
            className="ring-prev nav-btn"
            aria-label="Previous"
          >
            <MdArrowBackIos />
          </button>
          <div className="ring-info-fade">
            <h3>{rings[centerIndex].title}</h3>
            <p>{rings[centerIndex].description}</p>
          </div>
          <button ref={nextRef} className="ring-next nav-btn" aria-label="Next">
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};

export default Section12RingSlider;
