import React, { useEffect, useRef, useState } from "react";
import "./dimond.css";
import { useNavigate } from "react-router-dom";
const DimondJewellery = () => {
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
    <div className="container d-flex diamond_section dimond justify-content-center mt-3">
      <div className="row g-2 align-items-stretch sdcsz_rokdscs">
        {/* Left Images */}
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img
              src={require("../../../Images/rose.png")}
              alt="Rings"
              loading="lazy"
              className="w-100 h-100 diamond_img"
              onClick={() => handleCategoryClick("Rings")}
            />
          </div>
          <div className="h-100">
            <img
              src={require("../../../Images/pen.png")}
              alt="Pendant"
              loading="lazy"
              className="w-100 h-100 diamond_img"
              onClick={() => handleCategoryClick("Pendant")}
            />
          </div>
        </div>
        {/* Center Video */}
        <div className="col-md-4 d-flex flex-column dis_edjxfd">
          <div ref={videoRef}>
            {videoVisible && (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec"
                onClick={() => navigate('/products')}
              >
                <source
                  src={require("../../../Videos/diamond jewelry.mp4")}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        {/* Right Images */}
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img
              src={require("../../../Images/bracletesss.png")}
              alt="Bracelet"
              loading="lazy"
              className="w-100 h-100 diamond_img"
              onClick={() => handleCategoryClick("Bracelet")}
            />
          </div>
          <div className="h-100">
            <img
              src={require("../../../Images/schbgdsccc.png")}
              alt="Earrings"
              loading="lazy"
              className="w-100 h-100 diamond_img"
              onClick={() => handleCategoryClick("Earrings")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DimondJewellery;