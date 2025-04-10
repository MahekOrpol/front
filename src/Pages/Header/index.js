import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline, IoClose, IoSearch } from "react-icons/io5";
import { LuTextSearch } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Image imports
import logo from "../../Images/Group 1597884561.png";
import usericon from "../../Images/Group.png";
import GiGemPendant from "../../Images/gem-pendant-svgrepo-com.svg";
import bracelet from "../../Images/noun-bracelet-5323037.svg";
import earing from "../../Images/earrings.png";
import ring from "../../Images/diamond-ring-diamond-svgrepo-com.svg";
import csome from "../../Images/Group 1597884646.svg";
import { Search } from "lucide-react";

const Header = ({ openCart }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSignup, setIsSignup] = useState(false);
  const [data, setData] = useState(null);
  const user_Id = localStorage.getItem("user_Id");
  const popupRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(""); // Clear the input field
      setIsDrawerOpen(false); // Close the drawer after search
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsSignup(false);
      }
    };

    if (showSignup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignup]);

  useEffect(() => {
    if (user_Id) {
      getProfileData();
    }
  }, [user_Id]);

  const getProfileData = async () => {
    try {
      const res = await axios.get(`https://crystova.cloudbusiness.cloud//api/v1/users/${user_Id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      localStorage.setItem("isExistingProfile", "false");
    }
  };

  const handleLogout = () => {
    toast.success("Logout Successful!");
    localStorage.removeItem("user_Id");
    localStorage.removeItem("user_token");
    localStorage.setItem("isExistingProfile", "false");
    setData(null);
    setTimeout(() => setIsSignup(false), 500);
    navigate("/");
  };

  return (
    <>
      <div className="header_main">
        <p className="header_text pt-2">Shop Gold and Diamond Jewellery</p>
      </div>

      <div className="heder_sec_main mt-lg-2 d-flex align-items-center sdcsd_ss_ddd">
        {/* Mobile Menu Icon */}
        <div className="menu-icon d-xl-none" onClick={toggleDrawer}>
          <LuTextSearch size={30} />
        </div>

        {/* Search Bar */}
        <div className="justify-content-center d-flex ps-xl-5 xdcxscd_sercv">
          <div className="d-flex align-items-center sdchy_88__sxsxs" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search Product Here"
              className="flex-1 px-4 py-2 outline-none text-gray-700 rfvfd_UHGYU"
              style={{ borderRadius: "10px 0px 0px 10px", height: '2.7rem' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime"
              style={{
                height: "2.7rem",
                borderRadius: "0px 8px 8px 0px",
                border: "none",
                padding: "0.8rem",
              }}
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>


        {/* Logo */}
        <div
          className="d-flex justify-content-center w-50 hedr_sss dsfcdsfcsdfc_dcd"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" />
        </div>

        {/* Icons Section (Desktop Only) */}
        <div className="walign-items-center d-flex dcxde_asx485 gap-3 gap-lg-4 w-25 align-items-center ps-lg-1 sdfcv_tgvtgv">
          <div
            className="user_icon d-flex align-items-center flex-column new_ddd"
            style={{ cursor: "pointer" }}
            onClick={() => setIsSignup(true)}>
            <RiUserLine size={30} />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100">Account</span>
            </div>
            {/* Signup Popup */}
            {showSignup ? (
              <div className="signup-popup-overlay">
                <div className="signup-popup" onClick={(e) => e.stopPropagation()} ref={popupRef}>
                  <div className="popup-arrow"></div>
                  <div className="profile-section">
                    <img
                      src={require("../../Images/15 Model white.png")}
                      alt="Profile"
                      className="profile-pic"
                    />
                    <div className="profile-details">
                      {data ? (
                        <>
                          <h5> {data.firstName} {data.lastName} </h5>
                          <p className="contact-number"><strong>{data.phone}</strong></p>
                        </>
                      ) : (
                        <h5>Loading...</h5>
                      )}
                    </div>
                  </div>
                  {/* Menu List */}
                  <ul className="menu-list">
                    {localStorage.getItem("user_Id") && localStorage.getItem("user_token") ? (
                      <li onClick={() => navigate("/Editprofile")}>
                        <div className="menu-item gap-2">
                          <img
                            src={require("../../Images/profileicon.png")}
                            alt="Profile"
                            className="menu-icons"
                          />
                          <span className="sass">Your Profile</span>
                        </div>
                        <FaAngleRight size={20} className="menu-arrow" />
                      </li>
                    ) : (
                      <li onClick={() => navigate("/register")}>
                        <div className="menu-item gap-2">
                          <img
                            src={require("../../Images/profileicon.png")}
                            alt="Profile"
                            className="menu-icons"
                          />
                          <span className="sass">Login/Register</span>
                        </div>
                        <FaAngleRight size={20} className="menu-arrow" />
                      </li>
                    )}

                    <li onClick={() => navigate("/Order")}>
                      <div className="menu-item gap-2">
                        <img
                          src={require("../../Images/ordericon.png")}
                          alt="Orders"
                          className="menu-icons"
                        />
                        <span className="sass">My Orders</span>
                      </div>
                      <FaAngleRight size={20} className="menu-arrow" />
                    </li>
                    <li>
                      <div className="menu-item gap-2">
                        <img
                          src={require("../../Images/termsicon.png")}
                          alt="Terms"
                          className="menu-icons"
                        />
                        <span className="sass">Terms & Conditions</span>
                      </div>
                      <FaAngleRight size={20} className="menu-arrow" />
                    </li>
                    <li>
                      <div className="menu-item gap-2">
                        <img
                          src={require("../../Images/privacyicon.png")}
                          alt="Privacy"
                          className="menu-icons"
                        />
                        <span className="sass">Privacy Policy</span>
                      </div>
                      <FaAngleRight size={20} className="menu-arrow" />
                    </li>
                    <li onClick={() => navigate("/contact-us")}>
                      <div className="menu-item gap-2">
                        <img
                          src={require("../../Images/contacticon.png")}
                          alt="Contact"
                          className="menu-icons"
                        />
                        <span className="sass">Contact Us</span>
                      </div>
                      <FaAngleRight size={20} className="menu-arrow" />
                    </li>
                    {localStorage.getItem("user_Id") && localStorage.getItem("user_token") && (
                      <li onClick={handleLogout}>
                        <div className="menu-item gap-2">
                          <MdLogout size={22} />
                          <span className="sass ms-2">Logout</span>
                        </div>
                        <FaAngleRight size={20} className="menu-arrow" />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              null
            )}
          </div>
          <div
            className="user_icon d-flex align-items-center flex-column"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/wishlist")}
          >
            <CiHeart className="gsddd" size={30} style={{ strokeWidth: "0.5px", stroke: "black" }} />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100 new_ddd">Wishlist</span>
            </div>
          </div>
          <div
            className="user_icon d-flex align-items-center flex-column"
            style={{ cursor: "pointer" }}
          >
            <IoBagHandleOutline className="gsddd" size={30} onClick={openCart} />
            <div className="align-items-center" style={{ lineHeight: "21px" }}>
              <span className="acco9_text w-100 new_ddd">Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="dsn_mdcm">
        <div
          className="d-flex align-items-center justify-content-center jhdb_dhvh pt-1 pb-1 mt-2"
          style={{ borderTop: "1px solid #797979" }}
        >
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Rings")}
          >
            <img src={ring} width={25} alt="Rings" /> Rings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Earrings")}
          >
            <img src={earing} width={25} alt="Earrings" /> Earrings
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Pendant")}
          >
            <img src={GiGemPendant} width={20} alt="Pendant" /> Pendant
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => handleCategoryClick("Bracelet")}
          >
            <img src={bracelet} width={25} alt="Bracelet" /> Bracelet
          </div>
          <div
            className="header_list_tcty mx-4 my-2 d-flex align-items-center gap-2"
            onClick={() => navigate("/Customjewel")}
          >
            <img src={csome} width={20} alt="Custom Jewellery" /> Custom Jewellery
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="mobile-img">
          <img src={require("../../Images/crystovalogowhite (1) 2.png")} style={{ width: '60%' }} />
          <div className="drawer-header">
            <IoClose size={30} onClick={toggleDrawer} />
          </div>
        </div>
        <div className="drawer-menu">
          {/* <div className="d-flex" style={{ padding: '10px 0' }}>
            <input
              type="text"
              placeholder="Search Product Here"
              className="flex-1 outline-none text-gray-700 w-100 px-2 rfvfd_UHGYU"
              style={{ height: '2.5rem' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="p-3 rounded-r-full d-flex align-items-center justify-content-center search_hbdhj bg_prime"
              style={{
                height: "2.5rem",
                borderRadius: "0px 5px 6px 0px",
                border: "none",
                padding: "0.8rem",
              }}
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div> */}
          <div className="position-relative mb-3 w-100">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="form-control pfds"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="drawer-pro">
            <div className="eeerd">
              <span className="drawer-new">MAIN</span>
              <div className="drawer-item" onClick={() => handleCategoryClick("Rings")}>
                <img src={ring} width={20} alt="Rings" /> Rings
              </div>
              <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => handleCategoryClick("Earrings")}>
                <img src={earing} width={20} alt="Earrings" /> Earrings
              </div>
              <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => handleCategoryClick("Pendant")}>
                <img src={GiGemPendant} width={20} alt="Pendant" /> Pendant
              </div>
              <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => handleCategoryClick("Bracelet")}>
                <img src={bracelet} width={20} alt="Bracelet" /> Bracelet
              </div>
              <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => navigate("/Customjewel")}>
                <img src={csome} width={20} alt="Custom Jewellery" /> Custom Jewellery
              </div>
            </div>
            {localStorage.getItem("user_Id") && localStorage.getItem("user_token") ? (
              <div className="eeerd pt-3 pb-3">
                <span className="drawer-new">ACCOUNT</span>
                <div className="drawer-item" onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/Editprofile');
                }}>
                  <img src={require("../../Images/profileicon.png")} width={18} alt="Profile" /> Your Profile
                </div>
                <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/Order');
                }}>
                  <img src={require("../../Images/ordericon.png")} width={18} alt="Orders" /> My Orders
                </div>
                <div className="drawer-item d-flex align-items-center gap-2 w-100" onClick={() => {
                  setIsDrawerOpen(false);
                  handleLogout();
                }}>
                  <MdLogout width={18} /> Log Out
                </div>
              </div>
            ) : (
              <div
                className="drawer-item pt-3 d-flex align-items-center gap-2 w-100"
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/register');
                }}
              >
                <img src={usericon} width={18} />
                {/* <div className="" style={{ lineHeight: "25px" }}> */}
                  <span>Login</span>
                {/* </div> */}
              </div>
            )}
          {/* </div> */}
        </div>
      </div>

      {/* Mobile Drawer Account */}
      <div
        className="user_icon mobile_user_icon gap-3 d-flex align-items-center ps-3"
        onClick={() => {
          setIsDrawerOpen(false);
          navigate('/register')
        }}
      >
        {/* <img src={usericon} alt="User Icon" />
        <div className="d-flex flex-column align-items-center pt-2" style={{ lineHeight: "25px" }}>
          <span className="sign_txt w-100">Sign In</span>
          <span className="acco9_text w-100">Account</span>
        </div> */}
      </div>
    </div >

      { isDrawerOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>
}
    </>
  );
};

export default Header;
