import React, { useState } from "react";
import "./index.css";
import Footer from "../../Pages/Footer";
import Header from "../../Pages/Header";

const OrderDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Confirmed", "Packed", "Shipped", "Delivered"]

    const handleSliderChange = (event) => {
        setCurrentStep(Number(event.target.value));
    };
    return (
        <>
            <Header />
            <div className="order-container">
                <h2 className="order-title">Order Details</h2>
                <p className="order-info">
                    Order Placed On: <strong>March 18, 2024</strong> | Order No:{" "}
                    <strong>767069493</strong>
                </p>
                <p className="delivery-date">Delivery Expected by March 19, 2024</p>

                {/* Order Tracking */}
                <div className="order_ddyy">
                    <div className="step-progress-container mx-lg-5">
                        <input
                            type="range"
                            min="0"
                            max={steps.length - 1}
                            value={currentStep}
                            onChange={handleSliderChange}
                            className="price-slider w-100"
                            style={{ accentColor: "#611d2b" }}
                        />

                        <div className="d-flex justify-content-between mt-2">
                            {steps.map((steps, index) => (
                                <span key={index} className="step-label">{steps}</span>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    {[1, 2].map((_, i) => (
                        <div key={i} className="order_ddd">
                            <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="img_dd" />
                            <div className="item-details mx-1">
                                <p className="item-name m-auto">Two Stone Diamond Ring</p>
                                <p className="item-price">
                                    Total: <strong>₹30,000</strong>
                                </p>
                                <p className="item-qty">
                                    <strong>Qty: 1</strong> | Order ID: 976545768
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <table className="price-summary mt-5 w-25">
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
                            <td>GST & Other Taxes</td>
                            <td>₹5,000.00</td>
                        </tr>
                        <tr>
                            <td>Payment Method</td>
                            <td>Cash on Delivery</td>
                        </tr>
                        <tr className="total">
                            <td>Total Payable</td>
                            <td>₹35,000.00</td>
                        </tr>
                    </tbody>
                </table>
                {/* Delivery Details */}
                <div className="delivery-info mt-5">
                    <p className="tgrot">Delivery to:</p>
                    <h3>Jackie Walter</h3>
                    <p className="rtejh">B-613 IT Park, Mota Varaccha, Surat</p>
                    <p className="rtejh">Mobile No: 9745678987</p>
                </div>

                {/* Previous Orders */}
                <h3 className="prev-orders-title mt-5 mb-3 fs-2">Your Previous Orders</h3>
                {[1, 2].map((_, i) => (
                    <div key={i} className="prev-order">
                        <div className="prev-order-info mt-2 mx-3">
                            <div className="gftt">
                                <p className="m-auto">Order Placed On</p>
                                <p className="bold">March 12, 2024</p>
                            </div>
                            <div className="gftt">
                                <p className="m-auto">Total Price</p>
                                <p className="bold">₹1065.00</p>
                            </div>
                            <div className="gftt">
                                <p className="m-auto">Ship to</p>
                                <p className="bold">John Walter</p>
                            </div>
                        </div>
                        <hr className="m-auto" />
                        <div className="prev-order-item p-3">
                            <img src={require("../../Images/2 (4) (2).png")} alt="Two Stone Diamond Ring" className="img_dd" />
                            <div className="mx-3">
                                <div className="d-flex align-items-baseline gap-2"> <p>1 item</p>
                                    <div className="delivered-status">Order Delivered</div></div>
                                <p className="gftt">Order ID: 976545764</p>
                                <p className="gftt bold">Delivered on March 12, 2024</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default OrderDetails;