import React, { useEffect, useState } from "react";
import "./index.css";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RegisterPopup from "../RegisterPopup/index";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false);
    const [data, setData] = useState();
    const user_Id = localStorage.getItem("user_Id");

    const handleClose = () => {
        setShowRegister(false); // Close RegisterPopup
        onClose(); // Close SignupPopup
    };

    useEffect(() => {
        if (user_Id) {
            getProfileData();
        }
    }, [user_Id]);

    const getProfileData = async () => {
        try {
            const res = await axios.get(`http://192.168.1.10:3000/api/v1/users/${user_Id}`);
            setData(res.data)


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
        setTimeout(() => onClose(), 500); // Close the popup after logout
        navigate("/"); // Redirect to homepage or login page
    };

    if (!isOpen && !showRegister) return null;

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                stacked
            />
            {!showRegister ? (
                <div className="signup-popup-overlay" onClick={handleClose}> {/* Close on outside click */}
                    <div className="signup-popup" onClick={(e) => e.stopPropagation()}>

                        <div className="popup-arrow"></div>

                        {/* Profile Section */}
                        <div className="profile-section">
                            <img src={require("../../Images/15 Model white.png")} alt="Profile" className="profile-pic" />
                            <div className="profile-details">
                                {data ? (
                                    <>
                                        <h5>{data.firstName} {console.log('data', data)}{data.lastName}</h5>
                                        <p className="contact-number"><strong>{data.phone}</strong></p>
                                    </>
                                ) : (
                                    <h5>Loading...</h5> // Or show a default message
                                )}
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
                                <li onClick={() => navigate('/register')}>
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
                            <li onClick={() => navigate('/contact-us')}>
                                <div className="menu-item">
                                    <img src={require("../../Images/contacticon.png")} alt="Contact" className="menu-icons" />
                                    <span className="sass">Contact Us</span>
                                </div>
                                <FaAngleRight size={20} className="menu-arrow" />
                            </li>
                            {localStorage.getItem("user_Id") && localStorage.getItem("user_token") && (
                                <li onClick={handleLogout}>
                                    <div className="menu-item">
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
                <RegisterPopup isOpen={showRegister} onClose={handleClose} />
            )}
        </>
    );
};

export default SignupPopup;