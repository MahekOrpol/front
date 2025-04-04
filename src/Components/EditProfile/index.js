import React, { useEffect, useState } from "react";
import "./index.css"; // Ensure this CSS file is created
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import axios from "axios";
const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [address_line2, setAddress_line2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [editProfileErrors, setEditProfileErrors] = useState({});
    const [profileData,setProfileData] = useState("");
    // Validation functions
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    const user_Id = localStorage.getItem("user_Id");
    localStorage.setItem("isExistingProfile","false");
    const isExistingProfile =localStorage.getItem("isExistingProfile");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                id: user_Id,
                firstName,
                lastName,
                email,
                phone,
                address,
                address_line2,
                city,
                state,
                postalCode,
                gender,
                birthday,
            };
            let response;
            if (isExistingProfile) {
                console.log("Sending payload:", userData); // Debug log
                 response = await axios.put(
                    `http://192.168.1.10:3000/api/v1/users/${user_Id}`,
                    userData,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                localStorage.setItem("setIsExistingProfile","true");
            }
            else{
                response = await axios.post(
                    `http://192.168.1.10:3000/api/v1/users/create`,
                    { ...userData, id: user_Id },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
            }
            if (response.status === 200 || response.status === 201) {
                alert(isExistingProfile ? "Profile updated successfully!" : "Profile created successfully!");
                localStorage.setItem("setIsExistingProfile","true");    
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert(error.response?.data?.message || "Failed to save profile");
        } 
    };
    const getProfileData = async () => {
        try {
            const res = await axios.get(`http://192.168.1.10:3000/api/v1/users/${user_Id}`);
            const data = res.data;
    
            setProfileData(data);
    
            // Form fields update
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
            setAddress_line2(data.address_line2 || "");
            setCity(data.city || "");
            setState(data.state || "");
            setPostalCode(data.postalCode || "");
            setGender(data.gender || "");
            setBirthday(data.birthday || "");
            
            localStorage.setItem("isExistingProfile", "true"); // User profile exists
        } catch (err) {
            console.log(err);
            localStorage.setItem("isExistingProfile", "false"); // No existing profile
        }
    };
    
    useEffect(() => {
        getProfileData();
    }, []);

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
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" placeholder="First Name" className="form-control iceo" value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, firstName: "" }));
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" placeholder="Last Name" className="form-control iceo" value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, lastName: "" }));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <input type="email" placeholder="E-mail" className="form-control mt-3 iceo" value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
                                        setEditProfileErrors((prev) => ({ ...prev, email: "" }));
                                    }
                                }}
                                onBlur={() => {
                                    if (!validateEmail(email)) {
                                        setEditProfileErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
                                    }
                                }}
                                error={!!setEditProfileErrors.email}
                                helperText={setEditProfileErrors.email} />
                            <input type="text" placeholder="Phone Number" className="form-control mt-3 iceo" value={phone}
                                // onChange={(e) => setPhone(e.target.value)}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d{0,10}$/.test(input)) {
                                        setPhone(input);
                                        if (input.length === 10) {
                                            setEditProfileErrors((prev) => ({ ...prev, phone: "" }));
                                        }
                                    }
                                }}
                                onBlur={() => {
                                    if (phone.length !== 10) {
                                        setEditProfileErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit phone number" }));
                                    }
                                }}
                                error={!!setEditProfileErrors.phone}
                                helperText={setEditProfileErrors.phone} />
                            <input type="text" placeholder="Address" className="form-control mt-3 iceo" value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    if (e.target.value.trim() !== "") {
                                        setEditProfileErrors((prev) => ({ ...prev, address: "" }));
                                    }
                                }}
                            />
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="form-control mt-3 iceo" value={address_line2}
                                onChange={(e) => {
                                    setAddress_line2(e.target.value);
                                    if (e.target.value.trim() !== "") {
                                        setEditProfileErrors((prev) => ({ ...prev, address_line2: "" }));
                                    }
                                }} />
                            <div className="row g-3 mt-3">
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="City" className="form-control iceo" value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, city: "" }));
                                            }
                                        }} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="State" className="form-control iceo" value={state}
                                        onChange={(e) => {
                                            setState(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, state: "" }));
                                            }
                                        }} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input type="text" placeholder="ZIP Code" className="form-control iceo" value={postalCode}
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            if (/^\d{0,6}$/.test(input)) {
                                                setPostalCode(input);
                                                if (input.length === 6) {
                                                    setEditProfileErrors((prev) => ({ ...prev, postalCode: "" }));
                                                }
                                            }
                                        }}
                                        onBlur={() => {
                                            if (postalCode.length !== 6) {
                                                setEditProfileErrors((prev) => ({ ...prev, phone: "Enter a valid 6-digit zip code" }));
                                            }
                                        }}
                                        error={!!editProfileErrors.phone}
                                        helperText={editProfileErrors.phone} />
                                </div>
                            </div>
                            <input type="date" placeholder="D.O.B" className="form-control mt-3 iceo" value={birthday}
                                onChange={(e) => {
                                    setBirthday(e.target.value);
                                    if (e.target.value.trim() !== "") {
                                        setEditProfileErrors((prev) => ({ ...prev, birthday: "" }));
                                    }
                                }} />
                            <div className="d-flex align-items-center mt-3">
                                <div className="form-check me-3">
                                    <input type="radio" name="gender" className="form-check-input" id="male" value="Male"
                                        checked={gender === "Male"}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, gender: "" }));
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="gender" className="form-check-input" id="female" value="Female"
                                        checked={gender === "Female"}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                            if (e.target.value.trim() !== "") {
                                                setEditProfileErrors((prev) => ({ ...prev, gender: "" }));
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-dark w-100 mt-4 fs-5 mb-5" style={{ backgroundColor: "#611d2b", border: "none" }}>
                                {isExistingProfile?"Upadte":"Create"} Profile
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