import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";

const OrderDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Confirmed", "Packed", "Shipped", "Delivered"]

    const handleSliderChange = (event) => {
        setCurrentStep(Number(event.target.value));
    };
    return (
        <>
            <Header />
            <div className="mx-3 my-5">
                <h3 className="hlg">Order Details</h3>
                <p className="rffgy">
                    Order Placed On : <strong className="fddf">  March 18, 2024 | </strong> Order No : <strong className="fddf">767069493</strong>
                </p>
                <strong className="pobg">Delivery Expected by March 19, 2024</strong>
                <div className="orders border border-black p-3 my-3 mt-5 rounded-4">
                    <div className="step-progress-container">
                        {/* Slider Input */}
                        <input
                            type="range"
                            min="0"
                            max={steps.length - 1}
                            value={currentStep}
                            onChange={handleSliderChange}
                            className="price-slider w-100"
                            style={{ accentColor: "#611d2b" }}
                        />

                        {/* Steps in a Single Row */}
                        <div className="d-flex justify-content-between mt-2">
                            {steps.map((steps, index) => (
                                <span key={index} className="step-label">{steps}</span>
                            ))}
                        </div>
                    </div>

                    <div className="orders d-flex align-items-center justify-content-start">
                        <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="item-img1" />
                        <div className="grred">
                            <p className="hlgh">Two Stone Diamond Ring</p>
                            <p className="hhfg mb-2">Total: <strong className="fddf">₹30,000</strong></p>
                            <p className="rttf"><strong>Qty: 1 </strong>| Order ID: 976545768</p>
                        </div>
                    </div>
                    <div className="orders d-flex align-items-center justify-content-start">
                        <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="item-img1" />
                        <div className="grred">
                            <p className="hlgh">Two Stone Diamond Ring</p>
                            <p className="hhfg mb-2">Total: <strong className="fddf">₹30,000</strong></p>
                            <p className="rttf"><strong>Qty: 1 </strong>| Order ID: 976545768</p>
                        </div>
                    </div>
                </div>

                <div className="table-container mt-5">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th colSpan="2">Price Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Item Total</td>
                                <td>₹30,000.00</td>
                            </tr>
                            <tr>
                                <td>Delivery Charge</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td>GST & other taxes</td>
                                <td>₹5,000.00</td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td>Cash on Delivery</td>
                            </tr>
                            <tr className="total-row">
                                <th className="bottom-left-radius">Total Payable</th>
                                <th className="bottom-right-radius">₹35,000.00</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="delivery-to mt-5 mb-5">
                    <p style={{ color: 'gray', fontSize: "20px" }}>Delivery to:</p>
                    <p style={{ fontSize: "25px", color: "black", fontWeight: '600' }}>Jackie Walter</p>
                    <p style={{ fontSize: "16px", color: "black", fontWeight: '400' }}>B-613 IT Park, Mota Varaccha, Surat</p>
                    <p style={{ fontSize: "16px", color: "black", fontWeight: '400' }}>Mobile No: 9745678987</p>
                </div>

                <div className="mt-5">
                    <h5 className="hlg">Your Previous Orders</h5>
                    <div className="ord5 border border-black my-2 rounded-4 w-75">
                        <div className="d-flex justify-content-between p-3">
                            <div className="d-grid">
                                <p>Order Placed On</p>
                                <p className="Mach">March 12, 2024</p>
                            </div>
                            <div className="d-grid">
                                <p>Total Price</p>
                                <p className="Mach">₹1065.00</p>
                            </div>
                            <div className="d-grid">
                                <p>Ship to</p>
                                <p className="Mach">John Walter</p>
                            </div>
                        </div>
                        <p style={{ borderTop: "1px solid rgb(166, 161, 161)" }}></p>
                        <div className="d-flex p-4">
                            <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="item-img1" />
                            <div className="d-grid nmbm">
                                <div className="d-flex gap-4 pb-3">
                                    <p className="pt-2">1 item</p>
                                    <div className="delivered-status px-3">Order Delivered</div>
                                </div>
                                <p>Order ID: 976545764</p>
                                <p className="Mach">Delivered on March 12, 2024</p>
                            </div>
                        </div>
                    </div>

                    <div className="ord5 border border-black my-2 rounded-4 w-75 mt-5">
                        <div className="d-flex justify-content-between p-3">
                            <div className="d-grid">
                                <p>Order Placed On</p>
                                <p className="Mach">March 12, 2024</p>
                            </div>
                            <div className="d-grid">
                                <p>Total Price</p>
                                <p className="Mach">₹1065.00</p>
                            </div>
                            <div className="d-grid">
                                <p>Ship to</p>
                                <p className="Mach">John Walter</p>
                            </div>
                        </div>
                        <p style={{ borderTop: "1px solid rgb(166, 161, 161)" }}></p>
                        <div className="d-flex p-4">
                            <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="item-img1" />
                            <div className="d-grid nmbm">
                                <div className="d-flex gap-4 pb-3">
                                    <p className="pt-2">1 item</p>
                                    <div className="delivered-status px-3">Order Delivered</div>
                                </div>
                                <p>Order ID: 976545764</p>
                                <p className="Mach">Delivered on March 12, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default OrderDetails;
