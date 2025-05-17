import React from "react";
import best from "/Images/best.png";
const BestSelling = () => {
  const disableRightClick = (e) => e.preventDefault();
  return (
    <div className="container">
      <div className="d-flex gap-2 align-items-center">
        <div className="col-md-6">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="lazy"
            src={best}
            alt="home"
          />
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default BestSelling;
