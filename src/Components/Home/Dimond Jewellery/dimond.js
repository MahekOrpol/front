import React from "react";
import diamond from "../../../Videos/pinterestdownloader.mp4";
import './dimond.css'
const DimondJewellery = () => {
  return (
    <div className="mt-3 container dimond mb-5">
      <div className="row g-2 align-items-stretch">
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img src={require("../../../Images/rose.png")} className="w-100 h-100"/>
          </div>
          <div className="h-100">
            <img src={require("../../../Images/pen.png")} className="w-100 h-100"/>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column dis_edjxfd">
          <div>
            {" "}
            <video src={diamond} className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec" autoPlay loop muted />
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img src={require("../../../Images/bracletesss.png")} className="w-100 h-100"/>
          </div>
          <div className="h-100">
            <img src={require("../../../Images/schbgdsccc.png")} className="w-100 h-100"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimondJewellery;
