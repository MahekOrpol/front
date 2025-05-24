import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./heroSection.css";

const JewelrySale = () => {
  const disableRightClick = (e) => e.preventDefault();

  const navigate = useNavigate();

  // Preload only critical LCP image
  useEffect(() => {
    const lcpImg = new Image();
    lcpImg.src = "/Images/Frame 11.png";
  }, []);

  return (
    <section className="Jewellery-sale">
      <div className="Jewellery-sale-grid">
        {/* Left Images */}
        <div className="left-images">
          <img
            onContextMenu={disableRightClick}
            // draggable="false"
            loading="eager"
            fetchpriority="high"
            src="/Images/Frame 12 (1).png"
            alt="Elegant necklace with pendant"
            className="large-img"
            width={280}
            height={280}
          />
          <div className="small-imgs">
            <img
              onContextMenu={disableRightClick}
              // draggable="false"
              loading="lazy"
              src="/Images/Frame 13 (1).png"
              alt="Diamond ring close-up"
              width={280}
              height={280}
            />
          </div>
        </div>

        {/* Center Content */}
        <div
          className="center-content"
          style={{
            backgroundImage:
              "url('/Images/green.jpg')",
          }}
        >
          <img
            onContextMenu={disableRightClick}
            // draggable="false"
            loading="lazy"
            fetchpriority="high"
            src="/Images/crystovalogowhite (1) 2 (2).png"
            className="logo-banner"
            alt="Crystova brand logo"
            width={350}
            height={120}
          />
          <hr className="ehgdd" />
          <span className="tagline mb-2">Jewellery Just for You</span>
          <h2 className="sale-text mb-2">SALE</h2>
          <span className="discount">Up to 30% Off</span>
          <hr className="ehgdd" />
          <button className="shop-now" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>

        {/* Right Images */}
        <div className="right-images">
          <div className="small-imgs">
            <img
              onContextMenu={disableRightClick}
              // draggable="false"
              loading="lazy"
              src="/Images/Frame 11 (2).png"
              alt="Bracelet on display"
              width={280}
              height={280}
            />
          </div>
          <img
            onContextMenu={disableRightClick}
            // draggable="false"
            loading="lazy"
            src="/Images/Frame 10 (1).png"
            alt="Gold Jewellery display"
            className="large-img"
            width={280}
            height={280}
          />
        </div>
      </div>
    </section>
  );
};

export default JewelrySale;
