import React from "react";
import diamond from '../../../Videos/pinterestdownloader.mp4'
const DimondJewellery = () => {
  return (
    <div className="mt-5">
      <div className="d-flex m-auto">
        <div className="col-4 d-flex flex-column">
          <div>
            <img src={require("../../../Images/rose.png")} />
          </div>
          <div>
            <img src={require("../../../Images/pen.png")} />
          </div>
        </div>
        <div className="col-4">
          <div>
            {" "}
            <video
              src={diamond}
              className=" bg-white"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
        <div className="col-4 d-flex flex-column ">
          <div>
            <img src={require("../../../Images/bracletesss.png")} />
          </div>
          <div>
            <img src={require("../../../Images/schbgdsccc.png")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimondJewellery;
