import React, { useState } from "react";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import logo from "../../Images/Group 1597884561.png";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline, IoClose, IoMenu } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Form, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import SignInPopup from "../../Components/SignupPopup/index";
import RegisterPopup from "../../Components/RegisterPopup";

const Header = ({ openCart }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

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

      <div className="heder_sec_main d-flex align-items-center justify-content-lg-end sdcsd_ss_ddd container-fluid">
        {/* 🟢 Menu Icon for Mobile */}
        <div className="menu-icon d-xl-none" onClick={toggleDrawer}>
          <IoMenu size={30} />
        </div>

        <InputGroup className="d-lg-flex input-group1" style={{ borderRadius: "10px", marginTop: "6px" }}>
          <FormControl placeholder="Search Products Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <span className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime search-button" style={{ height: "38px", borderRadius: "0px 10px 10px 0px" }}>
            <BiSearch size={25} />
          </span>
        </InputGroup>

        {/* Logo */}
        <div className="d-flex justify-content-center w-lg-50 hedr_sss" style={{ cursor: "pointer" }}>
          <img src={logo} onClick={() => navigate('/')} alt="Logo" />
        </div>

        <div className="w-25 d-none d-lg-flex align-items-center justify-content-end gap-5 dcxde_asx485">
          <div className="user_icon d-flex align-items-center" style={{ gap: "9px" }} onClick={() => setIsSignupPopupOpen(true)}>
            <img src={require("../../Images/profile1.png")} alt="User Icon" />
            <div className="d-flex flex-column align-items-center pt-2">
              <span className="sign_txt w-100">Sign In</span>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>
          {isSignupPopupOpen && (
            <SignInPopup isOpen={isSignupPopupOpen} onClose={() => setIsSignupPopupOpen(false)} />
          )}

          <div><FiHeart size={27} /></div>
          <div><HiOutlineShoppingBag size={30} onClick={openCart} /></div>
        </div>
      </div>
      <div className="dsn_mdcm">
        <div className="d-flex align-items-center justify-content-center jhdb_dhvh pt-2 mt-2" style={{ borderTop: "1px solid #797979" }}>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Rings')}>Rings</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Earrings')}>Earrings</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Pendant')}>Pendant</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Bracelet')}>Bracelet</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}>Custom Jewellery</div>
        </div>
      </div>
      {/* <div style={{ borderTop: "1px solid #797979",margin:"5px" }}></div> */}
      {/* 🟢 Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>

        <div className="drawer-header">
          <IoClose size={30} onClick={toggleDrawer} />
        </div>
        <div className="drawer-menu">
          <div className="drawer-item" onClick={() => handleCategoryClick('Rings')}>Rings</div>
          <div className="drawer-item" onClick={() => handleCategoryClick('Earrings')}>Earrings</div>
          <div className="drawer-item" onClick={() => handleCategoryClick('Pendant')}>Pendant</div>
          <div className="drawer-item" onClick={() => handleCategoryClick('Bracelet')}>Bracelet</div>

          <div className="drawer-item" >Custom Jewellery</div>
        </div>

        {/* 🟢 Icons Section Inside Drawer (Mobile Only) */}
        <div className="user_icon gap-3 d-flex align-items-center ps-3" onClick={() => {
          setIsDrawerOpen(false); // Close the drawer
          setIsRegisterPopupOpen(true); // Open RegisterPopup
        }}>
          {isRegisterPopupOpen && (
            <RegisterPopup isOpen={isRegisterPopupOpen} onClose={() => setIsRegisterPopupOpen(false)} />
          )}
          <img src={usericon} alt="User Icon" />
          <div className="d-flex flex-column align-items-center pt-2">
            <span className="sign_txt w-100" >Sign In</span>
            <span className="acco9_text w-100">Account</span>
          </div>
        </div>
      </div>

      {/* 🟢 Overlay for Drawer */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
    </>
  );
};

export default Header;
