import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./ring.css";

import ringVideo1 from "../../../Videos/dfcvdfx.mp4";
import ringVideo2 from "../../../Videos/dfvdfvd.mp4";
import ringVideo3 from "../../../Videos/sdcsdcdfc.mp4";
import ringVideo4 from "../../../Videos/sdcxdscx.mp4";
import ringVideo5 from "../../../Videos/dsfcdfc.mp4";

const multiplier = {
  translate: 0.1,
  rotate: 0.02,
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

const Ring1 = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 5,
      spaceBetween: 50,
      centeredSlides: true,
      loop: true,
      grabCursor: true,
      breakpoints: {
        220: {
          slidesPerView: 1.5, // shows part of next/prev slides
          spaceBetween: 60,
          centeredSlides: true,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 50,
          centeredSlides: true,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
          centeredSlides: true,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 50,
          centeredSlides: true,
        },
      },
    });

    function calculateWheel() {
      const slides = document.querySelectorAll(".single");
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
        let ty =
          Math.abs(r) * multiplier.translate -
          rect.width * multiplier.translate;
        if (ty < 0) ty = 0;
        const transformOrigin = r < 0 ? "left top" : "right top";
        slide.style.transform = `translate(0, ${ty}px) rotate(${
          -r * multiplier.rotate
        }deg)`;
        slide.style.transformOrigin = transformOrigin;
      });
    }

    function raf() {
      requestAnimationFrame(raf);
      calculateWheel();
    }

    raf();
  }, []);

  return (
    <div className="ringSection">
      <div className="carousel1">
        <div className="swiper">
          <div className="swiper-wrapper">
            {videoData.map((video, i) => (
              <div className="swiper-slide" key={i}>
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
