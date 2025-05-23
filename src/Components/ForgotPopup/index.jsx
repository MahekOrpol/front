import React, { useState, useRef } from "react";
import "./index.css";
import { TextField } from "@mui/material";
import ChangePass from "../ChangePass";
import axios from "axios";

const ForgotPass = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifySubmitting, setIsVerifySubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [email, setEmail] = useState(""); // Not false
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputRefs = useRef([]);
  if (!isOpen) return null; // Prevent rendering when not open

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

  const handleSendOtp = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await axios.post(
        "https://dev.crystovajewels.com/api/v1/auth/send-otp",
        formData
      );

      if (res.data?.message) {
        setIsOtpSent(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      alert("Error sending OTP. Please check your email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle show change password screen
  const handleVerifyOtp = async () => {
    setIsVerifySubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("generateOTP", otp.join("")); // Join the 6 digits into a single string

      const res = await axios.post(
        "https://dev.crystovajewels.com/api/v1/auth/verify-otp",
        formData
      );

      if (res.data?.success) {
        setIsOtpVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }finally{
        setIsVerifySubmitting(false);
    }
  };

  return (
    <div className="forgot-popup-overlay">
      <div className="forgot-popup" onClick={(e) => e.stopPropagation()}>
        <div className="forgot-container">
          <div className="forgot-form">
            {isOtpVerified ? (
              <ChangePass onClose={onClose} email={email} />
            ) : !isOtpSent ? (
              <div className="email-section">
                <p className="titled">Verify Email</p>
                <hr />
                <TextField
                  label="E-mail"
                  name="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="forgot-btn" onClick={() => handleSendOtp()}>
             
                  {isSubmitting ? "sending otp..." : "SEND OTP"}
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
                  {isVerifySubmitting ? "verifying..." : "VERIFY OTP"}

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
