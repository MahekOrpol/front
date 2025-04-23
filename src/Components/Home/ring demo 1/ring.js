import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./ring.css";

import ringVideo1 from "../../../Videos/Dfcvdfx (2).mp4";
import ringVideo2 from "../../../Videos/Dfvdfvd (1).mp4";
import ringVideo3 from "../../../Videos/rings.mp4";
import ringVideo4 from "../../../Videos/Sdcxdscx(1).mp4";
import ringVideo5 from "../../../Videos/pendant.mp4";

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

const Ring1 = () => {
  useEffect(() => {
    let animationFrame;
    const multiplier = {
      translate: 0.1,
      rotate: window.innerWidth >= 1024 ? 0.01 : 0.03,
    };

    // Initialize Swiper
    const swiperInstance = new Swiper(".swiper1", {
      wrapperClass: "swiper-wrapper1",
      slideClass: "swiper-slide1",
      slidesPerView: 5,
      spaceBetween: 0,
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

    const updateRotateMultiplier = () => {
      multiplier.rotate = window.innerWidth >= 1024 ? 0.01 : 0.03;
    };

    const calculateWheel = () => {
      const slides = document.querySelectorAll(".single");
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const offset = window.innerWidth / 2 - (rect.x + rect.width / 2);
        let translateY = Math.abs(offset) * multiplier.translate - rect.width * multiplier.translate;
        if (translateY < 0) translateY = 0;
        slide.style.transform = `translateY(${translateY}px) rotate(${-offset * multiplier.rotate}deg)`;
        slide.style.transformOrigin = offset < 0 ? "left top" : "right top";
      });
    };

    const animate = () => {
      calculateWheel();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", updateRotateMultiplier);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", updateRotateMultiplier);
      if (swiperInstance && swiperInstance.destroy) swiperInstance.destroy(true, true);
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
                    webkit-playsinline="true"
                    x5-playsinline="true"
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
