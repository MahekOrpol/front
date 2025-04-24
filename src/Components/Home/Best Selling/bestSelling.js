import React from "react";
import best from "../../../Images/best.png";
const BestSelling = () => {
  return (
    <div className="container">
      <div className="d-flex gap-2 align-items-center">
        <div className="col-md-6">
          <img loading="lazy" src={best} />
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default BestSelling;
