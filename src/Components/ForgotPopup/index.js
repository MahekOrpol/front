import React, { useState, useRef } from "react";
import "./index.css";
import { TextField } from "@mui/material";
import ChangePass from "../ChangePass";
const ForgotPass = ({ isOpen, onClose }) => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    if (!isOpen) return null; // Prevent rendering when not open
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("forgot-popup-overlay")) {
            onClose();
        }
    };
    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
        if (!value) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (index < 5 && value) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };
    // Handle show change password screen
    const handleVerifyOtp = () => {
        setIsOtpVerified(true);
    };
    return (
        <div className="forgot-popup-overlay" >
            <div className="forgot-popup" onClick={(e) => e.stopPropagation()}>
                <div className="forgot-container">
                    <div className="forgot-form">
                        {isOtpVerified ? (
                            <ChangePass onClose={onClose} />
                        ) : !isOtpSent ? (
                            <div className="email-section">
                                <p className="titled">Verify Email</p>
                                <hr />
                                <TextField label="E-mail" variant="outlined" fullWidth margin="normal" />
                                <button className="forgot-btn" onClick={() => setIsOtpSent(true)}>
                                    SEND OTP
                                </button>
                            </div>
                        ) : (
                            <div className="otp-section">
                                <p className="titled">Enter OTP</p>
                                <hr />
                                <div className="otp-inputs">
                                    {otp.map((digit, index) => (
                                        <TextField
                                            key={index}
                                            inputRef={(el) => (inputRefs.current[index] = el)}
                                            variant="outlined"
                                            className="otp-box"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            inputProps={{
                                                maxLength: 1,
                                                style: { textAlign: "center", fontSize: "20px" },
                                            }}
                                        />
                                    ))}
                                </div>
                                <button className="forgot-btn" onClick={handleVerifyOtp}>
                                    VERIFY OTP
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPass;