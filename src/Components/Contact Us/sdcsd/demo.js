import React from "react";
import { useNavigate } from "react-router-dom";
import "./demo.css";

import logoWhite from "../../../Images/crystovalogowhite (1) 2 (2).png";
import mainLeftImg from "../../../Images/image (29).webp";
import smallLeftImg from "../../../Images/Mask group (6).webp";
import smallRightImg from "../../../Images/image (30).webp";
import mainRightImg from "../../../Images/Mask group (7).webp";

const JewelrySale = () => {
  const navigate = useNavigate();

  return (
    <section className="jewelry-sale">
      <div className="jewelry-sale-grid">
        {/* Left Images */}
        <div className="left-images">
          <img
            loading="lazy"
            src={mainLeftImg}
            alt="Elegant necklace with pendant"
            className="large-img"
          />
          <div className="small-imgs">
            <img
              loading="lazy"
              src={smallLeftImg}
              alt="Diamond ring close-up"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="center-content">
          <img
            src={logoWhite}
            className="logo-banner"
            alt="Crystova brand logo"
            width={350}
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
              loading="lazy"
              src={smallRightImg}
              alt="Bracelet on display"
            />
          </div>
          <img
            loading="lazy"
            src={mainRightImg}
            alt="Gold jewelry display"
            className="large-img"
          />
        </div>
      </div>
    </section>
  );
};

export default JewelrySale;
