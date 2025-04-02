// import React from "react";
// import "./demo.css";
// import { useNavigate } from "react-router-dom";

// const JewelrySale = () => {
//   const navigate = useNavigate();
//   return (
//     <section className="jewelry-sale overflow-hidden">
//       {/* <div className="left-image">
//         <img src="/images/necklace.jpg" alt="Necklace" />
//       </div> */}

//       <div className="left-image">
//         <div className="top-img">
//           <img src={require("../../../Images/image (29).png")} alt="Bracelet" />
//         </div>
//         <div className="bottom-imgs">
//           <img src={require("../../../Images/Mask group (6).png")} alt="Ring" />
//         </div>
//       </div>

//       <div className="cet_sale_ssss">
//         <div className="center-sale">
//           <img
//             src={require("../../../Images/crystovalogowhite (1) 2 (2).png")}
//             className="logo_banner_ssss"
//             width={350}
//           />
//           <hr className="banne_hr_dsdsd" />
//           <span className="dfecddv_dcd">Jewellery Just for You</span>
//           <h2 className="sale_eeeee_secdd">SALE</h2>
//           <span className="dfecddv_dcd_bt">Upto 30% Off</span>
//           <hr className="banne_hr_dsdsd" />

//           <button className="shop_now_ww"onClick={()=>{navigate('/products')}}>Shop Now</button>
//         </div>
//       </div>

//       <div className="right-images">
//         <div className="top-img">
//           <img src={require("../../../Images/image (30).png")} alt="Bracelet" />
//         </div>
//         <div className="bottom-imgs">
//           <img src={require("../../../Images/Mask group (7).png")} alt="Ring" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JewelrySale;

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
            <hr />
            <span className="tagline">Jewellery Just for You</span>
            <hr />

            <h2 className="sale-text">SALE</h2>
            <hr />

            <span className="discount">Up to 30% Off</span>
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
