import React, { useEffect, useState } from "react";
import './index.css';
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CustomJewel = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        type: '',
        budget: '',
        metalType: '',
        file: null,
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                type: formData.type,
                budget: Number(formData.budget), // Convert to number
                metal: formData.metalType, // Change field name to "metal"
                message: formData.description, // Change field name to "message"
            };

            // If you need to send a file
            const formDataToSend = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            if (formData.file) {
                formDataToSend.append('file', formData.file);
            }

            const response = await axios.post('http://localhost:3000/api/v1/custom-jewels/create', formDataToSend);

            if (response.status === 201) {
                toast.success("We will get back to you soon!");
                setSubmitMessage('Form submitted successfully!');
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    type: '',
                    budget: '',
                    metalType: '',
                    file: null,
                    description: ''
                });
            }
        } catch (error) {
            if (error.response) {
                // Handle specific field errors
                if (error.response.data.message.includes('must be a number')) {
                    setSubmitMessage('Please enter a valid number for budget');
                } else {
                    setSubmitMessage(error.response.data.message);
                }
            } else {
                setSubmitMessage('Error submitting form. Please try again.');
            }
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <div className="inputgrp gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name*"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number*"
                                required
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputgrp">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address*"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputgrp">
                            <select
                                name="type"
                                required
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="">Choose Type</option>
                                <option value="ring">Ring</option>
                            </select>
                        </div>
                        <div className="inputgrp gap-4">
                            <input
                                type="number"
                                name="budget"
                                placeholder="Total Budget"
                                value={formData.budget}
                                onChange={handleChange}
                                inputMode="numeric"
                            />
                            <input
                                type="text"
                                name="metalType"
                                placeholder="Metel type"
                                value={formData.metalType}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputgrp">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleChange}
                                accept=".pdf,.jpg,.png,.jpeg,.doc,.docx"
                            />
                        </div>
                        <p className="d-flex">
                            Choose your file here to upload. Allowed types: pdf, jpg, png, jpeg, doc, docx.
                        </p>
                        <textarea
                            name="description"
                            placeholder="Please describe your idea for this Custom Project..."
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default CustomJewel;