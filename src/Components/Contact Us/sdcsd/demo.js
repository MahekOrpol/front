import React from "react";
import { useNavigate } from "react-router-dom";
import "./demo.css";

const JewelrySale = () => {
  const navigate = useNavigate();

  return (
    <section className="jewelry-sale">
      <div className="jewelry-sale-grid">
        {/* Left Images */}
        <div className="left-images">
          <img
            loading="eager"
            fetchPriority="high"
            src="/Images/image (29).webp"
            alt="Elegant necklace with pendant"
            className="large-img"
            width="100%"
            height="auto"
          />
          <div className="small-imgs">
            <img
              loading="eager"
              fetchPriority="high"
              src="/Images/Mask group (6).webp"
              alt="Diamond ring close-up"
              width="100%"
              height="auto"
            />
          </div>
        </div>

        {/* Center Content */}
        <div
          className="center-content"
          style={{
            backgroundImage:
              "url('/Images/purple-ornament-indoors-decor-fabric-material2.webp')",
          }}
        >
          <img
            loading="eager"
            fetchPriority="high"
            src="/Images/crystovalogowhite (1) 2 (2).png"
            className="logo-banner"
            alt="Crystova brand logo"
            width={350}
            height="auto"
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
              loading="eager"
              fetchPriority="high"
              src="/Images/image (30).webp"
              alt="Bracelet on display"
              width="100%"
              height="auto"
            />
          </div>
          <img
            loading="eager"
            fetchPriority="high"
            src="/Images/Mask group (7).webp"
            alt="Gold jewelry display"
            className="large-img"
            width="100%"
            height="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default JewelrySale;
