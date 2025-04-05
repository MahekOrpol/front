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
import GiGemPendant  from "../../Images/gem-pendant-svgrepo-com.svg";
import bracelet from "../../Images/noun-bracelet-5323037.svg";
import earing from "../../Images/earrings.png";
import ring from "../../Images/diamond-ring-diamond-svgrepo-com.svg";
import csome from "../../Images/Group 1597884646.svg";
import { LuTextSearch } from "react-icons/lu";
import { FormControl, InputGroup } from "react-bootstrap";

import SignInPopup from "../../Components/SignupPopup/index";
import RegisterPopup from "../../Components/RegisterPopup";
import { RiUserLine } from "react-icons/ri";

const Header = ({ openCart }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

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

      <div className="heder_sec_main  mt-lg-2 d-flex align-items-center sdcsd_ss_ddd">
        {/* 🟢 Menu Icon for Mobile */}
        <div className="menu-icon d-xl-none" onClick={toggleDrawer}>
          <LuTextSearch size={30} />
        </div>

        {/* <InputGroup className="d-lg-flex input-group1" style={{ borderRadius: "10px", marginTop: "6px" }}>
          <FormControl placeholder="Search Products Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <span className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime search-button" style={{ height: "38px", borderRadius: "0px 10px 10px 0px" }}>
            <FaSearch />

          </span>
        </InputGroup>
        <div className="d-flex justify-content-center w-lg-50 hedr_sss" style={{ cursor: "pointer" }}>
          <img src={logo} onClick={() => navigate('/')} alt="Logo" />
        </div> */}

        <div className="w-25 justify-content-center d-flex ps-lg-5 xdcxscd_sercv">
          <div
            className="d-flex align-items-center sdchy_88__sxsxs"
            style={{ width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search Product Here"
              className="flex-1 px-4 py-2 outline-none text-gray-700"
              style={{ borderRadius: "10px 0px 0px 10px" }}
            />
            <button
              className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime"
              style={{
                height: "2.7rem",
                borderRadius: "0px 8px 8px 0px",
                border: "none",
                padding: "0.8rem",
              }}
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
        <div className="walign-items-center d-flex dcxde_asx485 gap-3 gap-lg-4 w-25 align-items-center ps-lg-1 sdfcv_tgvtgv">
          <div
            className="user_icon d-flex align-items-center d-none d-lg-block d-lg-flex flex-column"
            onClick={() => setIsSignupPopupOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <RiUserLine size={30} />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>
          {isSignupPopupOpen && (
            <SignInPopup
              isOpen={isSignupPopupOpen}
              onClose={() => setIsSignupPopupOpen(false)}
            />
          )}
          {/* <div><CiSearch size={25} /></div> */}
          <div
            className="user_icon d-flex align-items-center d-none d-lg-block d-lg-flex flex-column"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <CiHeart
              size={30}
              style={{ strokeWidth: "0.5px", stroke: "black" }}
            />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100">Wishlist</span>
            </div>
          </div>
          <div
            className="user_icon d-flex align-items-center d-none d-lg-block d-lg-flex flex-column"
            style={{ cursor: "pointer" }}
          >
            <IoBagHandleOutline size={30} onClick={openCart} />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100">Cart</span>
            </div>
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
            <img src={ring} width={25} /> Rings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Earrings")}
          >
            <img src={earing} width={25} /> Earrings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Pendant")}
          >
            <img src={GiGemPendant} width={20} /> Pendant
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Bracelet")}
          >
            <img src={bracelet} width={25} /> Bracelet
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => navigate("/Customjewel")}
          >
            <img src={csome} width={20} /> Custom Jewellery
          </div>
        </div>
      </div>
      {/* <div style={{ borderTop: "1px solid #797979",margin:"5px" }}></div> */}
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
            <img src={ring} width={20} /> Rings
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Earrings")}
          >
            <img src={earing} width={20} /> Earrings
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Pendant")}
          >
            <img src={GiGemPendant} width={20}/> Pendant
          </div>
          <div
            className="drawer-item d-flex align-items-center gap-2 w-100"
            onClick={() => handleCategoryClick("Bracelet")}
          >
            <img src={bracelet} width={20} /> Bracelet
          </div>
          <div className="drawer-item d-flex align-items-center gap-2 w-100">
            <img src={csome} width={20} /> Custom Jewellery
          </div>
        </div>

        {/* :large_green_circle: Icons Section Inside Drawer (Mobile Only) */}
        {/* 🟢 Icons Section Inside Drawer (Mobile Only) */}
        <div
          className="user_icon mobile_user_icon gap-3 d-flex align-items-center ps-3"
          onClick={() => {
            setIsDrawerOpen(false); // Close the drawer
            // setIsRegisterPopupOpen(true); // Open RegisterPopup
            navigate("/register");
          }}
        >
          {isRegisterPopupOpen && (
            <RegisterPopup
              isOpen={isRegisterPopupOpen}
              onClose={() => setIsRegisterPopupOpen(false)}
            />
          )}
          <img src={usericon} alt="User Icon" />
          <div
            className="d-flex flex-column align-items-center pt-2"
            style={{ lineHeight: "25px" }}
          >
            <span className="sign_txt w-100">Sign In</span>
            <span className="acco9_text w-100">Account</span>
          </div>
        </div>
      </div>
      {/* :large_green_circle: Overlay for Drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
};
export default Header;
