import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
const OueColletion = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  };
  return (
    <div className="our_colles">
      <div className="banner-img-op">
        <div className="d-flex align-items-center gap-3 dfvdfvfv">
          <div className="d-flex flex-column gap-3 dfscdfsc_tyhdc_defrvfv">
            <span className="our_collection_text">Our Collection</span>
            <p className="our_text_ddddd">
              Lorem ipsum dolor sit amet consectetur. Eget sed consectetur magna
              id sus consectetur. Eget sed consectetur magna id sus
            </p>
            <button
              className="see_more d-block"
              onClick={() => navigate("/products")}
            >
              See More
            </button>
          </div>
          <div className="d-flex justify-content-between gap-4 w-100 defV_ybsxc">
            <div
              className="d-flex flex-column gap-2 banner_tezxt "
              onClick={() => handleProductClick()}
            >
              <img
                src={require("../../Images/sdcd111.png")}
                className="our_colle_iumg_ssss"
              />
              <span className="ps-2">Engagement Rings</span>
              <span className="ps-2">₹ 15,6234</span>
            </div>
            <div
              className="d-flex flex-column gap-2 banner_tezxt"
              onClick={() => handleProductClick()}
            >
              <img
                src={require("../../Images/sec.png")}
                className="our_colle_iumg_ssss"
              />
              <span className="ps-2">Engagement Rings</span>
              <span className="ps-2">₹ 15,6234</span>
            </div>
            <div
              className="d-flex flex-column gap-2 banner_tezxt"
              onClick={() => handleProductClick()}
            >
              <img
                src={require("../../Images/fri.png")}
                className="our_colle_iumg_ssss"
              />
              <span className="ps-2">Engagement Rings</span>
              <span className="ps-2">₹ 15,6234</span>
            </div>
          </div>
          <button className="see_more_mobile d-none">See More</button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default OueColletion;

