import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

const ChangePass = ({ onClose, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("forgot-popup-overlay")) {
      //   onClose();
    }
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://dev.crystovajewels.com/api/v1/auth/forgot-password",
        {
          email,
          password,
          confirmPassword,
        }
      );
      console.log("Response:", res.data);
      if (res.data?.success === true) {
        alert("Password updated successfully");
        window.location.reload();
        onClose();
      } else {
        alert(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="forgot-popup-overlay"
      onClick={onClose}
      onMouseDown={handleOverlayClick}
    >
      <div className="forgot-popup" onClick={(e) => e.stopPropagation()}>
        <div className="forgot-container">
          <div className="forgot-form">
            <p className="titled">Change Password</p>
            <hr />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="forgot-btn"
              onClick={handleChangePassword}
            >
              {isSubmitting ? "updating..." : "UPDATE PASSWORD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
