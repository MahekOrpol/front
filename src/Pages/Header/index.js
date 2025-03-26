import React, { useState } from "react";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import logo from "../../Images/Group 1597884561.png";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline, IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
import { GiBigDiamondRing } from "react-icons/gi";
import { GiGemPendant } from "react-icons/gi";
import bracelet from '../../Images/charm.png'
import earing from '../../Images/earrings.png'
import ring from '../../Images/diamond-ring.png'
import csome from '../../Images/Vector (7).png'
import { LuTextSearch } from "react-icons/lu";

const Header = ({ openCart }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="header_main">
        <p className="header_text pt-2">Shop Gold and Diamond Jewellery</p>
      </div>

      <div className="heder_sec_main d-flex align-items-center sdcsd_ss_ddd">
        {/* 🟢 Menu Icon for Mobile */}
      
        <div className="menu-icon d-xl-none" onClick={toggleDrawer}>
          <LuTextSearch size={30} />
        </div>

        <div className="w-25 justify-content-center d-flex ps-lg-5 xdcxscd_sercv">
          <div
            className="d-flex align-items-center sdchy_88__sxsxs"
            style={{ borderRadius: "10px", width: "75%" }}
          >
            <input
              type="text"
              placeholder="Search Product Here"
              className="flex-1 px-4 py-2 outline-none text-gray-700"
              style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
            />
            <button
              className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime"
              style={{ height: "2.7rem", borderRadius: "0px 10px 10px 0px" }}
            >
              <FaSearch /> 
            </button>
          </div>
        </div>

        {/* Logo */}
        <div
          className="d-flex justify-content-center w-50 hedr_sss dsfcdsfcsdfc_dcd"
          style={{ cursor: "pointer" }}
        >
          <img src={logo} onClick={() => navigate("/")} alt="Logo" />
        </div>

        {/* Icons Section (Desktop Only) */}
        <div className="walign-items-center d-flex dcxde_asx485 gap-3 gap-lg-5 w-25 align-items-center ps-lg-1 sdfcv_tgvtgv">
          <div className="user_icon gap-3 d-flex align-items-center d-none d-lg-block d-lg-flex">
            <img src={usericon} alt="User Icon" />
            <div className="d-flex flex-column align-items-center pt-2" style={{lineHeight:'21px'}}>
              <span className="sign_txt w-100">Sign In</span>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>
          {/* <div><CiSearch size={25} /></div> */}
          <div className="d-block d-lg-none dsfcecv_dfvf">
            <FiSearch size={25}  />
          </div>
          <div>
            <CiHeart size={30}  strokeWidth='0.6px'/>
          </div>
          <div>
            <IoBagHandleOutline size={30} onClick={openCart}  />
          </div>
        </div>
      </div>
      <div className="dsn_mdcm">
        <div
          className="d-flex align-items-center justify-content-center jhdb_dhvh pt-1 pb-1 mt-2"
          style={{ borderTop: "1px solid #797979" }}
        >
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Rings")}
          >
            <img src={ring} width={25}/> Rings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Earrings")}
          >
            <img src={earing} width={25}/> Earrings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Pendant")}
          >
           <GiGemPendant  size={20}/> Pendant
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Bracelet")}
          >
           <img src={bracelet} width={25}/> Bracelet
          </div>
          <div className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2">
          <img src={csome} width={20}/> Custom Jewellery</div>
        </div>
      </div>

      {/* 🟢 Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <IoClose size={30} onClick={toggleDrawer} />
        </div>
        <div className="drawer-menu">
          <div
            className="drawer-item"
            onClick={() => handleCategoryClick("Rings")}
          >
            <img src={ring} width={20}/> Rings
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Earrings")}
          >
            <img src={earing} width={20}/> Earrings
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Pendant")}
          >
           <GiGemPendant  size={20}/> Pendant
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Bracelet")}
          >
           <img src={bracelet} width={20}/> Bracelet
          </div>

          <div
           className="drawer-item d-flex align-items-center gap-2 w-100"
           >
          <img src={csome} width={20}/> Custom Jewellery
          </div>
        </div>

        {/* 🟢 Icons Section Inside Drawer (Mobile Only) */}
        <div className="user_icon gap-3 d-flex align-items-center ps-3">
          <img src={usericon} alt="User Icon" />
          <div className="d-flex flex-column align-items-center pt-2" style={{lineHeight:'25px'}}>
            <span className="sign_txt w-100">Sign In</span>
            <span className="acco9_text w-100">Account</span>
          </div>
        </div>
      </div>

      {/* 🟢 Overlay for Drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
};

export default Header;
