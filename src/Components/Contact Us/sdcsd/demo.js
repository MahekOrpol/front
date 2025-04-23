
import React from "react";
import "./demo.css";
import { useNavigate } from "react-router-dom";

const JewelrySale = () => {
  const navigate = useNavigate();
  return (
    <section className="jewelry-sale">
      <div className="">
        <div className="jewelry-sale-grid">
          <div className="left-images">
            <img
              src={require("../../../Images/image (29).png")}
              alt="Jewelry"
              className="large-img"
            />
            <div className="small-imgs">
              <img
                src={require("../../../Images/Mask group (6).png")}
                alt="Ring"
              />
            </div>
          </div>

          <div className="center-content">
            <img
              src={require("../../../Images/crystovalogowhite (1) 2 (2).png")}
              className="logo-banner"
              alt="Crystova Logo"
              width={350}
            />
            <hr className="ehgdd"/>
            <span className="tagline mb-2">Jewellery Just for You</span>
            <h2 className="sale-text mb-2">SALE</h2>
            <span className="discount">Up to 30% Off</span>
            <hr className="ehgdd"/>
            <button className="shop-now" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>

          <div className="right-images">
            <div className="small-imgs">
              <img
                src={require("../../../Images/image (30).png")}
                alt="Bracelet"
              />
            </div>
            <img
              src={require("../../../Images/Mask group (7).png")}
              alt="Jewelry"
              className="large-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelrySale;