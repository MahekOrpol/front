import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// import LazyVideo from "../LazyVideo";
const LazyVideo = lazy(() => import("../LazyVideo"));

const Section4DiamondJewelry = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="d-flex flex-column align-items-center diamon_jewe">
      <span className="category_name mt-md-4">Diamond Jewellery</span>
      <p className="category_txt">Minimal. Modern. Mesmerizing</p>
      <img
        loading="lazy"
        // fetchPriority="high"
        src="/Images/Groupimg.png"
        className="home_tag_img"
        alt="home"
      />
      <div className="container d-flex diamond_section dimond justify-content-center mt-3">
        <div className="row g-2 align-items-stretch sdcsz_rokdscs">
          {/* Left Images */}
          <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
            <div className="h-100">
              <img
                src="/Images/rose.webp"
                alt="Rings"
                loading="eager"
                className="w-100 h-100 diamond_img"
                onClick={() => handleCategoryClick("Rings")}
                style={{cursor:'pointer'}}
              />
            </div>
            <div className="h-100">
              <img
                src="/Images/pen.webp"
                alt="Pendant"
                loading="eager"
                className="w-100 h-100 diamond_img"
                onClick={() => handleCategoryClick("Pendant")}
                style={{cursor:'pointer'}}
              />
            </div>
          </div>
          {/* Center Video */}
          <div className="col-md-4 d-flex flex-column dis_edjxfd">
            <div ref={videoRef}>
              {videoVisible && (
                <Suspense fallback={<div>Loading video...</div>}>
                  <LazyVideo
                    loading={videoVisible ? "eager" : "lazy"}
                    src="../../../Videos/diamond jewelry.mp4"
                    className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    onClick={() => navigate("/products")}
                    style={{cursor:'pointer'}}
                  />
                </Suspense>
              )}
            </div>
          </div>
          {/* Right Images */}
          <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
            <div className="h-100">
              <img
                src="/Images/bracletesss.webp"
                alt="Bracelet"
                loading="eager"
                className="w-100 h-100 diamond_img"
                onClick={() => handleCategoryClick("Bracelet")}
                style={{cursor:'pointer'}}
              />
            </div>
            <div className="h-100">
              <img
                src="/Images/schbgdsccc.webp"
                alt="Earrings"
                loading="eager"
                className="w-100 h-100 diamond_img"
                onClick={() => handleCategoryClick("Earrings")}
                style={{cursor:'pointer'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section4DiamondJewelry;
