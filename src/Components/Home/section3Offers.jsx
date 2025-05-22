import React from "react";
import { useNavigate } from "react-router-dom";

const offerItems = [
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
  { text: "Shop Gold and Diamond Jewelry" },
  { text: "Friendly Sale 30% Off" },
];
const Section3Offers = () => {
  const navigate = useNavigate();
  const disableRightClick = (e) => e.preventDefault();

  return (
    <div className="hdr_csd sdcxsdcx_Sdcxszdcx">
      <div className="scrolling-wrapper fastival-offerssss">
        <div className="scroll-content">
          {offerItems.map((item, index) => (
            <div className="scroll-item" key={index}>
              <img
                onContextMenu={disableRightClick}
                draggable="false"
                loading="lazy"
                src="/Images/Vector.png"
                alt="icon"
              />
              <span className="scroll_heder">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
      <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row offer_page_css">
        <div className="position-relative">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            src="/Images/hero-img3.webp"
            alt="Main Image"
            className="img-fluid"
            style={{ borderRadius: "0px 0px 0px 0px" }}
            loading="eager"
            fetchPriority="high"
          />
          {/* <div className="overlay-rectangle">
           <img   
  onContextMenu={disableRightClick}
   draggable="false"  src="/Images/Rectangle 105457.png"/>
          </div> */}
          <div className="overlay-img11">
            <img
              onContextMenu={disableRightClick}
              draggable="false"
              loading="lazy"
              src="/Images/Rectangle 105457.png"
              className="img-fluid w-100"
              alt="Overlay"
            />
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center gap-5 ps-md-5 ms-md-5 pt-sm-5 ps-sm-4 pb-sm-5 pt-5 ps-4 pb-5 fest_00ssss">
          <span className="fest_fff">FESTIVAL SALE OFFERS</span>
          <div className="txt_frss d-flex flex-column gap-3 sale_offer_sss">
            <span>Upto 25% Off on All Jewellery Favorites</span>
            <span> Limited Time!</span>
          </div>
          <div>
            <span className="txt_par">
              Diamonds come in a variety of shapes, each offering unique beauty
              and appeal.
              <br className="d-md-none d-lg-block d-none" /> Here's a guide to
              different shapes of diamond rings
            </span>
          </div>
          <div>
            <button
              className="w-25 spg_nb_sle"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="scrolling-wrapper">
        <div className="scroll-content">
          {offerItems.map((item, index) => (
            <div className="scroll-item" key={index}>
              <img
                onContextMenu={disableRightClick}
                draggable="false"
                loading="lazy"
                src="/Images/Vector.png"
                alt="icon"
              />
              <span className="scroll_heder">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default React.memo(Section3Offers);
