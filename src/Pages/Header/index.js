import React, { useState } from "react";
import "./index.css";

import logo from "../../Images/Group 1597884561.png";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline, IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="header_main">
        <p className="header_text pt-2">Shop Gold and Diamond Jewellery</p>
      </div>

      <div className="heder_sec_main d-flex align-items-center sdcsd_ss_ddd">
        {/* 🟢 Menu Icon for Mobile */}
        <div className="menu-icon d-xl-none" onClick={toggleDrawer}>
          <IoMenu size={30} />
        </div>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center w-25 gap-4 sdchy_88__sxsxs" style={{ paddingLeft: "7.3rem" }}>
          <div className="header_list_tcty" onClick={() => navigate('/products')}>Rings</div>
          <div className="header_list_tcty">Earrings</div>
          <div className="header_list_tcty">Pendant</div>
          <div className="header_list_tcty">Bracelet</div>
          <div className="header_list_tcty">Custom Jewellery</div>
        </div>

        {/* Logo */}
        <div className="d-flex justify-content-center w-50 hedr_sss" style={{ cursor: "pointer" }}>
          <img src={logo} onClick={() => navigate('/')} alt="Logo" />
        </div>

        {/* Icons Section (Desktop Only) */}
        <div className="w-25 d-none d-lg-flex align-items-center gap-5 dcxde_asx485">
          <div className="user_icon gap-3 d-flex align-items-center">
            <img src={usericon} alt="User Icon" />
            <div className="d-flex flex-column align-items-center pt-2">
              <span className="sign_txt w-100">Sign In</span>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>
          <div><CiSearch size={25} /></div>
          <div><CiHeart size={25} /></div>
          <div><IoBagHandleOutline size={25} /></div>
        </div>
      </div>

      {/* 🟢 Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>
        
        <div className="drawer-header">
          <IoClose size={30} onClick={toggleDrawer} />
        </div>
        <div className="drawer-menu">
          <div className="drawer-item" onClick={() => {navigate('/products');
            toggleDrawer()
          }}>Rings</div>
          <div className="drawer-item">Earrings</div>
          <div className="drawer-item">Pendant</div>
          <div className="drawer-item">Bracelet</div>
          <div className="drawer-item">Custom Jewellery</div>
        </div>

        {/* 🟢 Icons Section Inside Drawer (Mobile Only) */}
        <div className="user_icon gap-3 d-flex align-items-center ps-3">
            <img src={usericon} alt="User Icon" />
            <div className="d-flex flex-column align-items-center pt-2">
              <span className="sign_txt w-100">Sign In</span>
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
