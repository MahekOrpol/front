import React from "react";
import diamond from "../../../Videos/pinterestdownloader.mp4";
import './dimond.css'
import { useNavigate } from "react-router-dom";
const DimondJewellery = () => {
  const navigate=useNavigate();
  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };
  return (
    <div className="mt-3 container dimond diamond_section ">
      <div className="row g-2 align-items-stretch sdcsz_rokdscs">
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img src={require("../../../Images/rose.png")} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Rings")}/>
          </div>
          <div className="h-100">
            <img src={require("../../../Images/pen.png")} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Pendant")}/>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column dis_edjxfd">
          <div>
            {" "}
            <video src={diamond} onClick={()=>navigate('/products')} className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec" autoPlay loop muted />
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section">
          <div className="h-100">
            <img src={require("../../../Images/bracletesss.png")} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Bracelet")}/>
          </div>
          <div className="h-100">
            <img src={require("../../../Images/schbgdsccc.png")} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Earrings")}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimondJewellery;
