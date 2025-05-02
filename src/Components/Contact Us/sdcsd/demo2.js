import React from "react";
import { useNavigate } from "react-router-dom";
import "./demo2.css";

const JewelrySale2 = () => {
  const navigate = useNavigate();

  return (
    <section className="jewelry-sale">
      <div className="image-grid">
        <img
          src="/Images/image (29).webp"
          alt="Necklace"
          className="grid-img large"
        />
        <div className="center-box">
          <img
            src="/Images/purple-ornament-indoors-decor-fabric-material2.webp"
            alt="Decor Fabric"
            className="center-bg-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="center-content">
            <img
              src="/Images/crystovalogowhite (1) 2 (2).png"
              alt="Crystova logo"
              className="logo"
              // loading="eager"
            />
            <hr />
            <span className="tagline">Jewellery Just for You</span>
            <h2 className="sale-text">SALE</h2>
            <span className="discount">Up to 30% Off</span>
            <hr />
            <button className="shop-now" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>
        </div>
        <img
          src="/Images/image (30).webp"
          alt="Bracelet"
          className="grid-img small"
          loading="lazy"
        />
        <img
          src="/Images/Mask group (6).webp"
          alt="Ring"
          className="grid-img small"
          loading="lazy"
        />
        <img
          src="/Images/Mask group (7).webp"
          alt="Gold display"
          className="grid-img large"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default React.memo(JewelrySale2);
