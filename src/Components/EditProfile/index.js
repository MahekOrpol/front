import React from "react";
import "./index.css"; // Ensure this CSS file is created
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";

const EditProfile = () => {
    return (
        <>
            <Header />
            <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="bg-white d-flex flex-wrap overflow-hidden fjeef">
                    {/* Left Image Section - Always visible, but smaller on smaller screens */}
                    <div className="col-md-6 justify-content-center tyoty">
                        <img src={require("../../Images/editimg.png")} alt="Profile" className="img-fluid w-100" />
                    </div>

                    {/* Right Form Section */}
                    <div className="col-md-6 col-12 pt-4 Roff">
                        <h2 className="text-left Yglhf mt-3">Your Profile</h2>
                        <form>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" placeholder="First Name" className="form-control iceo" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" placeholder="Last Name" className="form-control iceo" />
                                </div>
                            </div>
                            <input type="email" placeholder="E-mail" className="form-control mt-3 iceo" />
                            <input type="text" placeholder="Phone Number" className="form-control mt-3 iceo" />
                            <input type="text" placeholder="Address" className="form-control mt-3 iceo" />
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="form-control mt-3 iceo" />
                            <div className="row g-3 mt-3">
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="City" className="form-control iceo" />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="State" className="form-control iceo" />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="ZIP Code" className="form-control iceo" />
                                </div>
                            </div>
                            <input type="text" placeholder="D.O.B" className="form-control mt-3 iceo" />
                            <div className="d-flex align-items-center mt-3">
                                <div className="form-check me-3">
                                    <input type="radio" name="gender" className="form-check-input" id="male" />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="gender" className="form-check-input" id="female" />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>
                            <button className="btn btn-dark w-100 mt-4 fs-5 mb-5" style={{ backgroundColor: "#611d2b", border: "none" }}>
                                Save Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditProfile;