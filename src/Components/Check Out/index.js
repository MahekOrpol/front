import React, { useEffect, useState } from "react";
import "./index.css";
import { Form, Row, Col } from "react-bootstrap";
import logo from "../../Images/logo.png";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    discountCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);

  const location = useLocation();
  const totalAmount = location.state?.total || "0.00";
  const orderDetails = location.state?.orderDetails || [];
  const discountTotal = location?.state?.discountTotal || 0;

  console.log("location :>> ", location);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const payload = {
        amount: totalAmount - discountTotal,
      };

      // Step 1: Create an order via API
      const response = await axios.post(
        // "http://localhost:3000/api/v1/order/create",
        "http://localhost:3000/api/v1/payment/create-razorpay-order",
        payload
      );

      if (response.status === 201) {
        const { id, amount } = response.data.data; // Get generated order ID
        console.log("response.data", response.data);
        // Step 2: Initialize Razorpay
        const options = {
          key: "rzp_test_PsUDZlEFPp8gOw",
          amount: amount,
          currency: "INR",
          name: "Crystova",
          description: "Test Transaction",
          image: require("../../Images/logo.png"),
          order_id: id,
          handler: async function (response) {
            console.log("Payment Success:", response);
            alert("Payment Successful! ");
            console.log("id", id);
            const body = {
              razorpay_order_id: id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            const verifyPayment = await axios.post(
              "http://localhost:3000/api/v1/payment/verify-razorpay-order",
              body
            );
            if (verifyPayment.status === 200) {
              const payload = {
                userId: localStorage.getItem("user_Id"),
                email: formData.email,
                country: formData.country,
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                apartment: formData.apartment,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                phoneNumber: formData.phoneNumber,
                razorpayId: response.razorpay_payment_id,
                discountTotal: discountTotal,
                totalPrice: totalAmount - discountTotal, // Apply discount
                couponCode: "123654",
                status: "pending",
                paymentStatus: "Paid",
              };

              const res = await axios.post(
                "http://localhost:3000/api/v1/order/create",
                payload
              );

              if (res.status === 201) {
                navigate("/order"); // Navigate without reloading
              }
            } else {
              alert("payment failed!");
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phoneNumber,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: "#611D2B",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

        razorpay.on("payment.failed", function (response) {
          console.log("Payment Failed:", response);
          alert("Payment Failed. Please try again.");
        });
      }
    } catch (error) {
      console.error("Order Creation Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="d-flex p-3 justify-content-center w-100 bdsh_mIN">
        <img
          src={require("../../Images/crystova.png")}
          onClick={() => navigate("/")}
          className="wered"
        />
      </div>
      {/* <Header /> */}
      <div className="gffg d-md-flex">
        {/* left section */}
        <Col md={7} className="left-container">
          <div className="container">
            <h5 className="BigFont gkyuy mt-3">Contact</h5>
            <Form>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="Box BoxFont"
                />
              </Form.Group>

              <h5 className="mt-4 BigFont">Delivery</h5>
              <Row>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Country/Region"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Form.Group>
                <Col className="cnjb_hcvh">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="Box BoxFont"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="Box BoxFont"
                />
              </Form.Group>
              <Row className="mt-2">
                <Col className="cnjb_hcvh">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="Box BoxFont"
                  />
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="Box BoxFont"
                />
              </Form.Group>

              <h5 className="mt-5 mb-2 fs-4 fw-bold">Remember me</h5>
              <Form.Group className="Credit p-lg-2 d-flex align-items-center gap-2 fw-bold">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Save my information for a faster checkout with shop account"
                />
              </Form.Group>

              <div className="Payment">
                <Row>
                  <Col
                    md={15}
                    className="d-flex align-items-center gap-2 Box1 BoxFont border ryyt"
                  >
                    <img
                      src={require("../../Images/phoneicon.png")}
                      alt="phone"
                      width="20"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Mobile phone number"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-3 d-flex align-items-center gap-2">
                <img
                  src={require("../../Images/lock.png")}
                  alt="lock"
                  width="18"
                />
                <p className="link fs5 mb-0">Secure and encrypted</p>
              </div>
              <button className="mt-4 w-100 PayBtn p-2" onClick={handlePayment}>
                Pay Now
              </button>
              <p className="mt-3 link">
                Your info will be saved to a Shop , By Continuing, you agree to
                Shops <span className="spanF">Terms of Service</span> and
                acknowledge the <span className="spanF">Privacy Policy.</span>
              </p>
            </Form>
          </div>
        </Col>

        {/* Right Section */}
        <Col
          md={5}
          className="bg-light p-4 right-section"
          style={{
            backgroundImage: `url(${require("../../Images/bgimg.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white ytjt">
            {orderDetails.map((item, index) => {
              const displayPrice = item.productId.hasVariations
                ? item.salePrice // Use the size-specific sale price
                : item.productPrice?.$numberDecimal
                ? parseFloat(item.productPrice.$numberDecimal)
                : "Price not available";
              return (
                <div className="order-item" key={index}>
                  <img
                    src={`http://localhost:3000${item.productId.image[0]}`}
                    alt={item.productId.productId}
                    className="order-item-img"
                  />
                  <div className="bfh">
                    <div className="order-item-details">
                      <p className="mb-1 fs4">{item.productId.productName} </p>
                      <span className="fs5 check_outpgedetail text-truncate">
                        {item.productId.productsDescription}
                      </span>{" "}
                      <span className="fs5">
                        Ring size: {item.selectedSize}
                      </span>
                    </div>
                    <strong className="order-price">
                      {/* {item?.productPrice?.$numberDecimal
                        ? parseFloat(
                            item.productPrice.$numberDecimal
                          ).toLocaleString()
                        : "Price not available"} */}
                        ₹{displayPrice}
                    </strong>
                  </div>
                </div>
              );
            })}

            {/* Discount Code */}
            <Form.Group className="my-4 d-flex">
              <Form.Control
                type="text"
                placeholder="Discount code"
                name="discountCode"
                value={formData.discountCode}
                onChange={handleInputChange}
                className="me-1"
              />
              <button className="PayBtn2">Apply</button>
            </Form.Group>
            {/* Price Breakdown */}
            <div className="d-flex justify-content-between mt-5">
              <span className="RightSec">Subtotal • 2 Items</span>
              <strong className="RightSec">&#8377;60,000</strong>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <span className="RightSec">Shipping</span>
              <span className="RightSec">Enter shipping address</span>
            </div>
            <div className="line1 mt-2"></div>
            {/* Total */}
            <div className="d-flex justify-content-between mt-2">
              <strong className="RightSec">Total</strong>
              <strong className="RightSec">&#8377;{totalAmount}</strong>
            </div>
          </div>
        </Col>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
