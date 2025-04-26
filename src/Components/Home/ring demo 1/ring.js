import React, { useEffect, useRef, useCallback } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./ring.css";

const videoData = [
  { src: '/Videos/Dfcvdfx (2).mp4', category: "Pendant" },
  { src: '/Videos/Dfvdfvd (1).mp4', category: "Earrings" },
  { src: '/Videos/rings.mp4', category: "Rings" },
  { src: '/Videos/Sdcxdscx(1).mp4', category: "Bracelets" },
  { src: '/Videos/pendant.mp4', category: "Pendant" },
  { src: '/Videos/Dfcvdfx (2).mp4', category: "Pendant" },
  { src: '/Videos/Dfvdfvd (1).mp4', category: "Earrings" },
  { src: '/Videos/rings.mp4', category: "Rings" },
  { src: '/Videos/Sdcxdscx(1).mp4', category: "Bracelets" },
  { src: '/Videos/pendant.mp4', category: "Pendant" },
];

const multiplier = {
  translate: 0.1,
  rotate: window.innerWidth >= 1024 ? 0.01 : 0.03,
};

const Ring1 = () => {
  const videoRefs = useRef([]);

  const updateRotateMultiplier = useCallback(() => {
    multiplier.rotate = window.innerWidth >= 1024 ? 0.01 : 0.03;
  }, []);

  const calculateWheel = useCallback(() => {
    const slides = document.querySelectorAll(".single");
    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
      let ty =
        Math.abs(r) * multiplier.translate -
        rect.width * multiplier.translate;
      if (ty < 0) ty = 0;
      slide.style.transform = `translate(0, ${ty}px) rotate(${
        -r * multiplier.rotate
      }deg)`;
      slide.style.transformOrigin = r < 0 ? "left top" : "right top";
    });
  }, []);

  useEffect(() => {
    let swiperInstance;

    const initSwiper = () => {
      swiperInstance = new Swiper(".swiper1", {
        wrapperClass: "swiper-wrapper1",
        slideClass: "swiper-slide1",
        slidesPerView: 5,
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        breakpoints: {
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
        },
      });
    };

    const raf = () => {
      calculateWheel();
      requestAnimationFrame(raf);
    };

    // Throttled resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateRotateMultiplier();
      }, 200);
    };

    initSwiper();
    updateRotateMultiplier();
    raf();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (swiperInstance) swiperInstance.destroy(true, true);
    };
  }, [calculateWheel, updateRotateMultiplier]);

  return (
    <div className="ringSection">
      <div className="carousel1">
        <div className="swiper1">
          <div className="swiper-wrapper1">
            {videoData.map((video, i) => (
              <div className="swiper-slide1" key={i}>
                <div className="single">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={video.src} // DIRECT src here
                    muted
                    loop
                    playsInline
                    autoPlay // autoPlay instead of manual play
                    preload="auto" // better than none now
                    className="ring-video"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ring1;
