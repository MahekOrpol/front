import React, { useState } from "react";
import { TextField } from "@mui/material";

const ChangePass = ({ onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("register-popup-overlay")) {
            onClose();
        }
    };

    return (
        <div className="forgot-popup-overlay" onClick={onClose} onMouseDown={handleOverlayClick}>
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
                        />
                        <TextField
                            label="Update Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                        />
                        <button type="button" className="forgot-btn">
                        Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
