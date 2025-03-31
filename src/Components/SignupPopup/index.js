import React, { useState } from "react";
import "./index.css";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RegisterPopup from "../RegisterPopup/index";

const SignupPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false);

    if (!isOpen && !showRegister) return null;

    const handleClose = () => {
        setShowRegister(false); // Close RegisterPopup
        onClose(); // Close SignupPopup
    };

    return (
        <>
            {!showRegister ? (
                <div className="signup-popup-overlay" onClick={handleClose}> {/* Close on outside click */}
                    <div className="signup-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-arrow"></div>

                        {/* Profile Section */}
                        <div className="profile-section">
                            <img src={require("../../Images/15 Model white.png")} alt="Profile" className="profile-pic" />
                            <div className="profile-details">
                                <h5>Jonathan Walter</h5>
                                <p className="contact-number"><strong>97123 72516</strong></p>
                            </div>
                        </div>

                        {/* Menu List */}
                        <ul className="menu-list">
                            {/* <li onClick={() => setShowRegister(true)}>
                                {/* <div className="menu-item">
                                    <img src={require("../../Images/profileicon.png")} alt="Profile" className="menu-icons" />
                                    <span className="sass">Login/Register</span>
                                </div>
                                <FaAngleRight size={20} className="menu-arrow" />
                            </li>
                            <li onClick={() => navigate('/Editprofile')}>
                                <div className="menu-item">
                                    <img src={require("../../Images/profileicon.png")} alt="Profile" className="menu-icons" />
                                    <span className="sass">Your Profile</span>
                                </div>
                                <FaAngleRight size={20} className="menu-arrow" />
                            </li> */}
                                {localStorage.getItem("user_Id") && localStorage.getItem("user_token") ? (
                                    <li onClick={() => navigate('/Editprofile')}>
                                        <div className="menu-item">
                                            <img src={require("../../Images/profileicon.png")} alt="Profile" className="menu-icons" />
                                            <span className="sass">Your Profile</span>
                                        </div>
                                        <FaAngleRight size={20} className="menu-arrow" />
                                    </li>
                                ) : (
                                    <li onClick={() => setShowRegister(true)}>
                                        <div className="menu-item">
                                            <img src={require("../../Images/profileicon.png")} alt="Profile" className="menu-icons" />
                                            <span className="sass">Login/Register</span>
                                        </div>
                                        <FaAngleRight size={20} className="menu-arrow" />
                                    </li>
                                )}

                                <li onClick={() => navigate('/Order')}>
                                    <div className="menu-item">
                                        <img src={require("../../Images/ordericon.png")} alt="Orders" className="menu-icons" />
                                        <span className="sass">My Orders</span>
                                    </div>
                                    <FaAngleRight size={20} className="menu-arrow" />
                                </li>
                                <li>
                                    <div className="menu-item">
                                        <img src={require("../../Images/termsicon.png")} alt="Terms" className="menu-icons" />
                                        <span className="sass">Terms & Conditions</span>
                                    </div>
                                    <FaAngleRight size={20} className="menu-arrow" />
                                </li>
                                <li>
                                    <div className="menu-item">
                                        <img src={require("../../Images/privacyicon.png")} alt="Privacy" className="menu-icons" />
                                        <span className="sass">Privacy Policy</span>
                                    </div>
                                    <FaAngleRight size={20} className="menu-arrow" />
                                </li>
                                <li onClick={()=>navigate('/contact-us')}>
                                    <div className="menu-item">
                                        <img src={require("../../Images/contacticon.png")} alt="Contact" className="menu-icons" />
                                        <span className="sass">Contact Us</span>
                                    </div>
                                    <FaAngleRight size={20} className="menu-arrow" />
                                </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <RegisterPopup isOpen={showRegister} onClose={handleClose} />
            )}
        </>
    );
};

export default SignupPopup;
