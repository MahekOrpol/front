import React, { useEffect, useState } from "react";
import "./index.css";
import { Box, Tab, Tabs, TextField, Button, Fade, Slide } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import registerImage from "../../Images/registerpage.png";
import googleIcon from "../../Images/googleicon.png";
import ForgotPass from "../ForgotPopup";
import ChangePass from "../ChangePass";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import GoogleLogin from "../../GoogleLogin";

const RegisterPopup = ({ isOpen, onClose }) => {
  const [tabValue, setTabValue] = useState("login");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  // Register form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);

  if (showForgotPass) {
    return (
      <ForgotPass
        isOpen={showForgotPass}
      />
    );
  }
  if (showChangePass) {
    return (
      <ChangePass
        isOpen={showChangePass}
        // onClose={() => {
        //   setShowChangePass(false);
        //   onClose();
        // }}
      />
    );
  }

  const handleOverlayClick = (e) => {
 
  };
 
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password)
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
 
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://crystovajewels.com/api/v1/register/login",
          {
            email: loginEmail,
            password: loginPassword,
          }
        );

        if (response.status === 200) {
          toast.success("Login Successful!");
          localStorage.setItem("user_Id", response.data.user.id);
          localStorage.setItem("user_token", response.data.token.access.token);
          
          setTimeout(() => onClose(), 1000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (name.trim() === "") {
      errors.name = "Name is required";
    }

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!validatePassword(password)) {
      errors.password =
        "Password must be at least 6 characters long and include numbers & letters";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (phone.trim() === "" || phone.length !== 10) {
      errors.phone = "Enter a valid 10-digit phone number";
    }

    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://crystovajewels.com/api/v1/register/register",
          {
            name,
            email,
            phone,
            password,
            ConfirmPassword: confirmPassword,
          }
        );

        if (response.status === 201) {
          const createProfileRes = await axios.post(
            "https://crystovajewels.com/api/v1/users/create",
            {
              user_id: response.data.user.id,
              firstName: name,
              email,
              phone,
            }
          );

          if (createProfileRes.status === 200) {
            toast.success("Registration Successful!");
            setTabValue("login");
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }
  };
 
  if (!isOpen) return null;

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
      <Header />
      <div className="register-popup-overlay" onMouseDown={handleOverlayClick}>
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
                    TabIndicatorProps={{
                      style: { backgroundColor: "#703340" }, // Active indicator color
                    }}
                    sx={{
                      "& .MuiTab-root": {
                        color: "black",
                        textTransform: "capitalize",
                      },
                      "& .Mui-selected": {
                        color: "#703340 !important",
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Tab
                      label="Login"
                      value="login"
                      className="taout_d"
                      lg={{ textTransform: "capitalize" }}
                    />
                    <Tab
                      label="Register"
                      value="register"
                      className="taout_d"
                      lg={{ textTransform: "capitalize" }}
                    />
                  </Tabs>
                </Box>

                {/* <Fade in={tabValue === "login"} timeout={500}> */}
                <Slide direction="left" in={tabValue === "login"} timeout={500}>
                  <TabPanel value="login">
                    <p className="register-text">
                      <strong>Login using your Email and Password</strong>
                    </p>
                    <p className="register-subtext">
                      For the purpose of industry registration, your details are
                      required and will be stored.
                    </p>
                    <form onSubmit={handleLoginSubmit}>
                      <TextField
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        error={!!loginErrors.email}
                        helperText={loginErrors.email}
                      />
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        margin="normal"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        error={!!loginErrors.password}
                        helperText={loginErrors.password}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="remember-me-container">
                          <input type="checkbox" id="remember-me" />
                          <label
                            htmlFor="remember-me"
                            className="remember-me-label"
                          >
                            Remember me
                          </label>
                        </div>
                        <p
                          className="hrdd"
                          style={{cursor:"pointer"}}
                          onClick={() => setShowForgotPass(true)}
                        >
                          Forgot Password
                        </p>
                      </div>

                      <p className="otre1">
                        By Continuing, I agree to{" "}
                        <span className="hrdd"> Terms of Use </span> &{" "}
                        <span className="hrdd">Privacy Policy</span>
                      </p>

                      <button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="register-btn"
                      >
                        Login
                      </button>
                      <p className="or-text-container pt-1 pb-1">
                        <span className="or-line"></span>
                        <span className="or-text">or</span>
                        <span className="or-line"></span>
                      </p>
                      <p className="otre">
                        Already have an Account?{" "}
                        <span className="tvjgds" onClick={() => setTabValue("register")}>Create Account</span>
                      </p>
                    </form>
                  </TabPanel>
                </Slide>
                {/* </Fade> */}
                {/* Register Panel */}

                {/* <Fade in={tabValue === "register"} timeout={500}> */}
                <Slide
                  direction="right"
                  in={tabValue === "register"}
                  timeout={500}
                >
                  <TabPanel value="register">
                    <p className="register-text">
                      <strong>Don’t have an Account?</strong>
                    </p>
                    <p className="register-subtext">
                      For the purpose of industry registration, your details are
                      required and will be stored.
                    </p>

                    <form onSubmit={handleRegisterSubmit}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        // onChange={(e) => setName(e.target.value)}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value.trim() !== "") {
                            setRegisterErrors((prev) => ({
                              ...prev,
                              name: "",
                            }));
                          }
                        }}
                        onBlur={() => {
                          if (name.trim() === "") {
                            setRegisterErrors((prev) => ({
                              ...prev,
                              name: "Name is required",
                            }));
                          }
                        }}
                        error={!!registerErrors.name}
                        helperText={registerErrors.name}
                      />
                      <div className="inpul">
                        <TextField
                          label="E-mail"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                e.target.value
                              )
                            ) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                email: "",
                              }));
                            }
                          }}
                          onBlur={() => {
                            if (!validateEmail(email)) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                email: "Please enter a valid email",
                              }));
                            }
                          }}
                          error={!!registerErrors.email}
                          helperText={registerErrors.email}
                        />
                        <TextField
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={phone}
                          // onChange={(e) => setPhone(e.target.value)}
                          onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,10}$/.test(input)) {
                              setPhone(input);
                              if (input.length === 10) {
                                setRegisterErrors((prev) => ({
                                  ...prev,
                                  phone: "",
                                }));
                              }
                            }
                          }}
                          onBlur={() => {
                            if (phone.length !== 10) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                phone: "Enter a valid 10-digit phone number",
                              }));
                            }
                          }}
                          error={!!registerErrors.phone}
                          helperText={registerErrors.phone}
                        />
                      </div>
                      <div className="inpul">
                        <TextField
                          label="Password"
                          variant="outlined"
                          fullWidth
                          type="password"
                          margin="normal"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (validatePassword(e.target.value)) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                password: "",
                              }));
                            }
                          }}
                          onBlur={() => {
                            if (!validatePassword(password)) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                password:
                                  "Password must be at least 6 characters long and include numbers & letters",
                              }));
                            }
                          }}
                          error={!!registerErrors.password}
                          helperText={registerErrors.password}
                        />
                        <TextField
                          label="Confirm Password"
                          variant="outlined"
                          fullWidth
                          type="password"
                          margin="normal"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value === password) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                confirmPassword: "",
                              }));
                            }
                          }}
                          onBlur={() => {
                            if (confirmPassword !== password) {
                              setRegisterErrors((prev) => ({
                                ...prev,
                                confirmPassword: "Passwords do not match",
                              }));
                            }
                          }}
                          error={!!registerErrors.confirmPassword}
                          helperText={registerErrors.confirmPassword}
                        />
                      </div>
                      <p className="otre">
                        By Continuing, I agree to{" "}
                        <span className="hrdd"> Terms of Use </span> &{" "}
                        <span className="hrdd">Privacy Policy</span>
                      </p>

                      <button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="register-btn"
                      >
                        Register
                      </button>

                      <p className="or-text-container pt-1 pb-1">
                        <span className="or-line"></span>
                        <span className="or-text">OR</span>
                        <span className="or-line"></span>
                      </p>
                      <div className="ggl_text d-flex align-items-center gap-2 justify-content-center">
                        <img
                          src={googleIcon}
                          alt="Google Icon"
                          className="google-icon"
                        />
                        Continue with Google
                      </div>
                      {/* <GoogleLogin /> */}
                      <p className="otre">
                        Already have an Account?{" "}
                        <span className="tvjg" onClick={() => setTabValue("login")}>sign in</span>
                      </p>
                    </form>
                  </TabPanel>
                </Slide>
                {/* </Fade> */}
              </TabContext>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default RegisterPopup;
