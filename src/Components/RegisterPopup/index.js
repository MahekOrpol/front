import React, { useState } from "react";
import "./index.css";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import registerImage from "../../Images/register.png";
import googleIcon from "../../Images/googleicon.png";

const RegisterPopup = ({ isOpen, onClose }) => {
  const [tabValue, setTabValue] = useState("login");

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("register-popup-overlay")) {
      onClose();
    }
  };

  return (
    <div className="register-popup-overlay" onClick={onClose} onMouseDown={handleOverlayClick}>
      <div className="register-popup" onClick={(e) => e.stopPropagation()}>
        <div className="register-container">
          <div className="register-image">
            <img src={registerImage} alt="Register" />
          </div>

          <div className="register-form">
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={(event, newValue) => setTabValue(newValue)}
                  aria-label="Login/Register Tabs"
                  variant="fullWidth"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "black",
                    },
                    "& .MuiTab-root": {
                      textTransform: "none",
                    },
                  }}
                >
                  <Tab label="Login" value="login" className="taout_d"/>
                  <Tab label="Register" value="register" className="taout_d"/>
                </Tabs>
              </Box>

              {/* Login Panel */}
              <TabPanel value="login">
                <p className="register-text"><strong>Login using your Email and Password</strong></p>
                <p className="register-subtext">For the purpose of industry registration, your details are required and will be stored.</p>
                <form>
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                  />

                  <div className="d-flex justify-content-between">
                    <div className="remember-me-container">
                      <input type="checkbox" id="remember-me" />
                      <label htmlFor="remember-me" className="remember-me-label">Remember me</label>
                    </div>
                    <p className="hrdd">Forgot Password</p>
                  </div>

                  <p className="otre1">By Continuing, I agree to <span className="hrdd"> Terms of Use </span> & <span className="hrdd">Privacy Policy</span></p>
                  <button type="submit" className="register-btn">Login</button>

                  <p className="or-text-container">
                    <span className="or-line"></span>
                    <span className="or-text">or</span>
                    <span className="or-line"></span>
                  </p>
                  <p className="otre">Already have an Account? <span className="tvjg">Create Account</span></p>
                </form>
              </TabPanel>

              {/* Register Panel */}
              <TabPanel value="register">
                <p className="register-text"><strong>Don’t have an Account?</strong></p>
                <p className="register-subtext">For the purpose of industry registration, your details are required and will be stored.</p>
                <form>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                  />
                  <TextField
                    label="Repeat Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                  />

                  <p className="otre">By Continuing, I agree to <span className="hrdd"> Terms of Use </span> & <span className="hrdd">Privacy Policy</span></p>
                  <button type="submit" className="register-btn">Register</button>

                  <p className="or-text-container">
                    <span className="or-line"></span>
                    <span className="or-text">or</span>
                    <span className="or-line"></span>
                  </p>
                  <div>
                    <img src={googleIcon} alt="Google Icon" className="google-icon" />
                    Register with Google
                  </div>
                  <p className="otre">Already have an Account? <span className="tvjg">Create Account</span></p>
                </form>
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;