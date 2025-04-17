import React from "react";
import diamond from "../../../Videos/pinterestdownloader.mp4";
import './dimond.css'
import { useNavigate } from "react-router-dom";
const DimondJewellery = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };
  return (
    <div className="container d-flex diamond_section dimond justify-content-center mt-3 ">
      <div className="row g-2 align-items-stretch sdcsz_rokdscs">
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section ">
          <div className="h-100">
            <img src={require("../../../Images/rose.png")} alt={"productImg"} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Rings")} />
          </div>
          <div className="h-100">
            <img src={require("../../../Images/pen.png")} alt={"productImg"} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Pendant")} />
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column dis_edjxfd">
          <div>
            {" "}
            <video
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true" 
              className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec"
              onClick={() => navigate('/products')}
            >
              <source src={require("../../../Videos/pinterestdownloader.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* <video src={require("../../../Videos/pinterestdownloader.mp4")} onClick={() => navigate('/products')} className="w-100 h-100 object-fit-cover bg-white demoiin-video_sec" autoPlay loop muted playsInline /> */}
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column gap-2 dimond-section ">
          <div className="h-100">
            <img src={require("../../../Images/bracletesss.png")} alt={"productImg"} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Bracelet")} />
          </div>
          <div className="h-100">
            <img src={require("../../../Images/schbgdsccc.png")} alt={"productImg"} className="w-100 h-100 diamond_img" onClick={() => handleCategoryClick("Earrings")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimondJewellery;
