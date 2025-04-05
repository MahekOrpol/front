import React from "react";
import "./index.css";
const OueColletion = () => {
  return (
    <div className="our_colles mb-5">
      <div className="banner-img-op">
        <div className="d-flex align-items-center gap-3 dfvdfvfv">
          <div className="d-flex flex-column gap-3 dfscdfsc_tyhdc_defrvfv">
            <span className="our_collection_text">Our Collection</span>
            <p className="our_text_ddddd">
              Lorem ipsum dolor sit amet consectetur. Eget sed consectetur magna
              id sus consectetur. Eget sed consectetur magna id sus
            </p>
            <button className="see_more d-block">See More</button>
          </div>
          <div className="d-flex justify-content-between gap-4 w-100 defV_ybsxc">
            <div className="d-flex flex-column gap-2 banner_tezxt">
              <img src={require("../../Images/sdcd111.png")} />
              <span className="ps-2">Engagement Rings</span>
              <span className="ps-2">₹ 15,6234</span>
            </div>
            <div className="d-flex flex-column gap-2 banner_tezxt">
              <img src={require("../../Images/sec.png")} />
              <span className="ps-2">Engagement Rings</span>
              <span className="ps-2">₹ 15,6234</span>
            </div>
            <div className="d-flex flex-column gap-2 banner_tezxt">
              <img src={require("../../Images/fri.png")} />
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
