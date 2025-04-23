import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./ring.css";

import ringVideo1 from "../../../Videos/Dfcvdfx (2).mp4";
import ringVideo2 from "../../../Videos/Dfvdfvd (1).mp4";
import ringVideo3 from "../../../Videos/rings.mp4";
import ringVideo4 from "../../../Videos/Sdcxdscx(1).mp4";
import ringVideo5 from "../../../Videos/pendant.mp4";

const multiplier = {
  translate: 0.1,
  rotate: window.innerWidth >= 1024 ? 0.01 : 0.03,
};

const videoData = [
  { src: ringVideo1, category: "Pendant" },
  { src: ringVideo2, category: "Earrings" },
  { src: ringVideo3, category: "Rings" },
  { src: ringVideo4, category: "Bracelets" },
  { src: ringVideo5, category: "Pendant" },
  { src: ringVideo1, category: "Pendant" },
  { src: ringVideo2, category: "Earrings" },
  { src: ringVideo3, category: "Rings" },
  { src: ringVideo4, category: "Bracelets" },
  { src: ringVideo5, category: "Pendant" },
];

const updateRotateMultiplier = () => {
  multiplier.rotate = window.innerWidth >= 1024 ? 0.01 : 0.03;
};

const Ring1 = () => {
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

    const calculateWheel = () => {
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
    };

    const raf = () => {
      calculateWheel();
      requestAnimationFrame(raf);
    };

    // Throttle resize listener
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
  }, []);

  return (
    <div className="ringSection">
      <div className="carousel1">
        <div className="swiper1">
          <div className="swiper-wrapper1">
            {videoData.map((video, i) => (
              <div className="swiper-slide1" key={i}>
                <div className="single">
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
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
