import React from "react";
import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Section9AffordableJewelry() {
  const disableRightClick = (e) => e.preventDefault();
  const navigate = useNavigate();
  const priceTiers = [
    { amount: 999, className: "offer_prixx" },
    { amount: 1999, className: "offer_prixx1" },
    { amount: 2999, className: "offer_prixx2" },
    { amount: 3999, className: "offer_prixx3" },
  ];
  return (
    <div className="abc1 paddingdn d-flex flex-column align-items-center mt-md-4 stunning_price_fvf">
      <span className="category_name mt-0 mobile-hide">Affordable Luxury</span>
      <span className="category_name mt-0 mobile-show">Stunning Surprise</span>

      <p className="category_txt">Sophistication, smartly priced.</p>
      <img
        onContextMenu={disableRightClick}
        draggable="false"
        loading="lazy"
        // fetchPriority="high"
        src="/Images/Groupimg.png"
        className="home_tag_img"
        alt="home"
      />
      {/* <div className="pt-4 row position-relative w-100 container justify-content-between gap-3"> */}
      <div className="pt-3 container djb_dsjvn mx-2">
        <div className="row justify-content-evenly scc_gift_edit_sdsd gap-2">
          {priceTiers.map((tier) => (
            <div
              key={tier.amount}
              title={`Explore products under ₹${tier.amount.toLocaleString()}`}
              className={`d-flex flex-column align-items-center gap-3 ${tier.className} p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss`}
              onClick={() => navigate(`/products?price=${tier.amount}`)}
            >
              <span className="under_cimn">Under</span>
              <span className="under_cimn">
                ₹{tier.amount.toLocaleString()}
              </span>
              <span className="next_arrow p-2">
                <GrNext size={28} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
