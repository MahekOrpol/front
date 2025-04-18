import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./ring.css";

const multiplier = {
  translate: 0.1,
  rotate: 0.01,
};

const Ring1 = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 5,
      spaceBetween: 50,
      centeredSlides: true,
      loop: true,
      grabCursor: true,
      breakpoints: {
        320: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 5,
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
    <div>
     
      <div className="carousel1">
        <div className="swiper">
          <div className="swiper-wrapper">
            {[...Array(10)].map((_, i) => (
              <div className="swiper-slide" key={i}>
                <div className="single">
                  <img
                    src={`https://picsum.photos/800/1200?random=${i + 1}`}
                    alt={`slide-${i + 1}`}
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
