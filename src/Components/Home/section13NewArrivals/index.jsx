import React, { useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import { useNavigate } from "react-router-dom";
const videoData = [
  { src: "/Videos/Dfcvdfx (2).mp4", category: "Pendant" },
  { src: "/Videos/Dfvdfvd (1).mp4", category: "Earrings" },
  { src: "/Videos/rings.mp4", category: "Rings" },
  { src: "/Videos/Sdcxdscx(1).mp4", category: "Bracelets" },
  { src: "/Videos/pendant.mp4", category: "Pendant" },
  { src: "/Videos/Dfcvdfx (2).mp4", category: "Pendant" },
  { src: "/Videos/Dfvdfvd (1).mp4", category: "Earrings" },
  { src: "/Videos/rings.mp4", category: "Rings" },
  { src: "/Videos/Sdcxdscx(1).mp4", category: "Bracelets" },
  { src: "/Videos/pendant.mp4", category: "Pendant" },
];
const multiplier = {
  translate: 0.1,
  rotate: window.innerWidth >= 1024 ? 0.01 : 0.03,
};
const Section13NewArrivals = () => {
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/products?categoryName=${category}`);
    },
    [navigate]
  );
  const updateRotateMultiplier = useCallback(() => {
    multiplier.rotate = window.innerWidth >= 1024 ? 0.01 : 0.03;
  }, []);
  const calculateWheel = useCallback(() => {
    const slides = document.querySelectorAll(".single");
    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
      let ty =
        Math.abs(r) * multiplier.translate - rect.width * multiplier.translate;
      if (ty < 0) ty = 0;
      slide.style.transform = `translate(0, ${ty}px) rotate(${
        -r * multiplier.rotate
      }deg)`;
      slide.style.transformOrigin = r < 0 ? "left top" : "right top";
    });
  }, []);
  useEffect(() => {
    const raf = () => {
      calculateWheel();
      requestAnimationFrame(raf);
    };
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateRotateMultiplier();
      }, 200);
    };
    updateRotateMultiplier();
    raf();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateWheel, updateRotateMultiplier]);
  return (
    <>
      <div className="paddingdn d-flex flex-column align-items-center mt-2 mt-md-4 asxs_sdxszx dxfcvdfsCV_ss">
        <span className="category_name ">New Arrivals</span>
        <p className="category_txt">New Creations, Forever Elegance</p>
        <img
          loading="eager"
          fetchpriority="high"
          src="/Images/Groupimg.png"
          className="home_tag_img"
          alt="home"
        />
      </div>
      <div className="ringSection">
        <div className="carousel1">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              220: { slidesPerView: 1.5, spaceBetween: 60 },
              375: { slidesPerView: 1.5, spaceBetween: 70 },
              415: { slidesPerView: 1.5, spaceBetween: 80 },
              450: { slidesPerView: 1.5, spaceBetween: 95 },
              500: { slidesPerView: 2.5, spaceBetween: 70 },
              740: { slidesPerView: 2.5, spaceBetween: 90 },
              840: { slidesPerView: 2.5, spaceBetween: 110 },
              991: { slidesPerView: 2.5, spaceBetween: 120 },
              1024: { slidesPerView: 3, spaceBetween: 110 },
              1280: { slidesPerView: 5, spaceBetween: 50 },
              1900: { slidesPerView: 5, spaceBetween: 80 },
            }}
          >
            {videoData.map((video, i) => (
              <SwiperSlide key={i}>
                <div
                  className="single"
                  onClick={() => handleCategoryClick(video.category)}
                  style={{ cursor: "pointer" }}
                >
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    className="ring-video"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default React.memo(Section13NewArrivals);