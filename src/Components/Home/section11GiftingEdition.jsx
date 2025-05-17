import React from "react";
import { useNavigate } from "react-router-dom";

export default function Section11GiftingEdition() {
  const navigate = useNavigate();
  const disableRightClick = (e) => e.preventDefault();

  return (
    <div className="paddingdn d-flex flex-column align-items-center hdr_csd sdcsdc_rtgrtfdxcasxNJK">
      <span className="category_name mt-2">Gifting Edition</span>
      <p className="category_txt">Elegant & Versatile Gifts</p>
      <img
        onContextMenu={disableRightClick}
        draggable="false"
        loading="lazy"
        // fetchPriority="high"
        src="/Images/Groupimg.png"
        className="home_tag_img"
        alt="home"
      />
      <div className="row pt-3 w-100 scc_gift_edit container">
        <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="eager"
            className="img-sssssss"
            src="/Images/Group 1597884624 (1).png"
            alt="home"
          />
          <div
            className="lionk_ss"
            onClick={() =>
              navigate("/products?categoryName=Rings&gender=Women")
            }
            style={{ cursor: "pointer" }}
          >
            <a>Gifts for Her</a>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="eager"
            className="img-sssssss"
            src="/Images/Group 1597884625 (1).png"
            alt="home"
          />
          <div
            className="lionk_ss"
            onClick={() => navigate("/products?categoryName=Rings&gender=Men")}
            style={{ cursor: "pointer" }}
          >
            <a>Gifts for Him</a>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="eager"
            className="img-sssssss"
            src="/Images/Group 1597884626 (1).png"
            alt="home"
          />
          <div
            className="lionk_ss"
            onClick={() => navigate("/products")}
            style={{ cursor: "pointer" }}
          >
            <a>Gifts for Self</a>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="eager"
            className="img-sssssss"
            src="/Images/Group 1597884636.png"
            alt="home"
          />
          <div
            className="lionk_ss"
            onClick={() => navigate("/products?categoryName=Band")}
            style={{ cursor: "pointer" }}
          >
            <a>Wedding Bands</a>
          </div>
        </div>
      </div>
    </div>
  );
}
