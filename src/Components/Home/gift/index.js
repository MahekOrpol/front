import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import './index.css'
const Gift = () => {
  return (
    <div className="container row">
      <div className="col-md-6 d-flex flex-column gap-3">
        <h2 className="mack_pox_headfr">Make your Occasions Special with our Jewelry</h2>
        <hp className="mack_pox_headfrp">Discover the perfect blend of elegance and exclusivity with our Limited Edition Collaboration jewelry collection. Crafted with precision and designed for those who appreciate timeless beauty, these unique pieces are available for a short time only!</hp>
        <button className="shop_now_sijd"> Shop Now <FaArrowRightLong />
        </button>
      </div>
      <div className="col-md-6">
        <div><img src={require('../../../Images/slider_dcdfc.svg').default} /></div>
        <div><img src={require('../../../Images/gift_sec.svg').default} /></div>
      </div>
    </div>
  );
};

export default Gift;
