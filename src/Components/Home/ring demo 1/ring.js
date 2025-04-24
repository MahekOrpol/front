import React, { useEffect, useRef, useCallback } from "react";
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

    // Lazy load videos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            video.play().catch(() => {});
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

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
      observer.disconnect();
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
                    data-src={video.src}
                    muted
                    loop
                    playsInline
                    preload="none"
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
