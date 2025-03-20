import React, { useState } from "react";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import logo from "../../Images/Group 1597884561.png";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline, IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
          <IoMenu size={30} />
        </div>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center sdchy_88__sxsxs" style={{ marginLeft: "7rem", borderRadius: "10px" }}>
          <input
            type="text"
            placeholder="Search Product Here"
            className="flex-1 px-4 py-2 outline-none text-gray-700" style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
          />
          <button className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime" style={{ height: "2.7rem", borderRadius: "0px 10px 10px 0px" }}>
            <FaSearch />
          </button>
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
          {/* <div><CiSearch size={25} /></div> */}
          <div><CiHeart size={25} /></div>
          <div><IoBagHandleOutline size={25} onClick={openCart}/></div>
        </div>
      </div>
      <div className="dsn_mdcm">
        <div className="d-flex align-items-center justify-content-center jhdb_dhvh pt-2 mt-2" style={{ borderTop: "1px solid #797979" }}>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Rings')}>Rings</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Earrings')}>Earrings</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Pendant')}>Pendant</div>
          <div className="header_list_tcty mx-4 my-2" onClick={() => handleCategoryClick('Bracelet')}>Bracelet</div>
          <div className="header_list_tcty mx-4 my-2">Custom Jewellery</div>
        </div>
      </div>

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
