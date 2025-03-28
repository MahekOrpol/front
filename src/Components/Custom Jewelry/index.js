import React from "react";
import './index.css';
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
const CustomJewel = () => {
    return (
        <>
        <Header/>
            <div className="custom-jewel-container">
                {/* Banner Section */}
                <div className="bsn">
                    <img src={require("../../Images/customjewel.png")} alt="Custom Jewelry" />
                </div>
                {/* Features Section */}
                <div className="features-section">
                    <h2 className="iojhf">Custom Jewelry</h2>
                    <p>Jewelry as Unique as Your Story</p>
                    <img src={require("../../Images/Groupimg.png")} className="home_tag_img mb-4" alt="Decorative" />
                    <div className="features-grid">
                        {[
                            {
                                title: "Uniqueness and Exclusivity",
                                desc: "Custom jewelry ensures no one else will have the exact same piece, making it truly yours.",
                                img: require("../../Images/23 Jewelry store.png"),
                            },
                            {
                                title: "Personalization",
                                desc: "Tailor every detail to your style, from the choice of gemstones to the design elements.",
                                img: require("../../Images/12 Handmade.png"),
                            },
                            {
                                title: "Celebrate Special Moments",
                                desc: "Create a lasting memory for engagements, anniversaries, birthdays, or any milestone.",
                                img: require("../../Images/Group 1597884504.png"),
                            },
                            {
                                title: "Quality and Craftsmanship",
                                desc: "Every custom piece is handcrafted by skilled artisans using the finest materials.",
                                img: require("../../Images/22 Jewelry making.png"),
                            },
                        ].map((feature, index) => (
                            <div className="feature-box" key={index}>
                                <img src={feature.img} alt={feature.title} className="feature-img" />
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Custom Jewelry Form */}
                <div className="custom-form">
                    <h2>Designed by You, Crafted by Us</h2>
                    <p>Create a unique piece of jewelry that reflects your personal style and story.</p>
                    <img src={require("../../Images/Groupimg.png")} className="home_tag_img mb-4" alt="Decorative" />
                    <form>
                        <div className="inputgrp gap-4">
                            <input type="text" placeholder="Name*" required />
                            <input type="text" placeholder="Mobile Number*" required />
                        </div>
                        <div className="inputgrp">
                            <input type="email" placeholder="Email Address*" required />
                        </div>
                        <div className="inputgrp">
                            <select required>
                                <option value="">Choose Type</option>
                                <option value="ring">Ring</option>
                            </select>
                        </div>
                        <div className="inputgrp gap-4">
                            <input type="text" placeholder="Total Budget" />
                            <input type="text" placeholder="Metel type" />
                        </div>
                        <div className="inputgrp">
                            <input type="file" id="file" />
                        </div>
                        <p className="d-flex">
                            Choose your file here to upload. Allowed types: pdf, jpg, png, jpeg, doc, docx.
                        </p>
                        <textarea placeholder="Please describe your idea for this Custom Project and provide us with as many details as you can, so we can get back to you with a quote for your Custom Jewelry."></textarea>
                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};
export default CustomJewel;