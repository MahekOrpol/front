import React, { useEffect } from "react";
import "./index.css";
import { Form, Row, Col } from "react-bootstrap";
import logo from "../../Images/logo.png";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);

  return (
    <div>
    <div className="d-flex p-3 justify-content-center w-100 bdsh_mIN">
        <img src={require("../../Images/crystova.png")} onClick={() => navigate("/")} className="wered"/>
      </div>
      {/* <Header /> */}
      <div className="gffg d-md-flex">
        {/* Left Section */}
        <Col md={7} className="left-container">
          <div className="container">
            {/* <h4 className="text-center mt-4 Express">Express Checkout</h4>
            <div className="d-flex justify-content-between gap-3 my-3 BoxFont">
              <div className="Puj">
                <img src={require("../../Images/paytm.png")} alt="Paytm" className="checkout-logo" />
              </div>
              <div className="Puj">
                <img src={require("../../Images/Google-Pay-logo.png")} alt="Google Pay" className="checkout-logo" />
              </div>
              <div className="Puj">
                <img src={require("../../Images/paypal.png")} alt="PayPal" className="checkout-logo" />
              </div>
            </div>

            <div className="or-container">
              <div className="line"></div>
              <span className="or-text">OR</span>
              <div className="line"></div>
            </div> */}

            <h5 className="BigFont gkyuy mt-3">Contact</h5>
            <Form>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="Box BoxFont"
                />
              </Form.Group>

              <h5 className="mt-4 BigFont">Delivery</h5>
              <Row>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Country/Region"
                    className="Box BoxFont"
                  />
                </Form.Group>
                <Col className="cnjb_hcvh">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    className="Box BoxFont"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    className="Box BoxFont"
                  />
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  className="Box BoxFont"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Apartment,suite,etc.(optional)"
                  className="Box BoxFont"
                />
              </Form.Group>
              <Row className="mt-2">
                <Col className="cnjb_hcvh">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    className="Box BoxFont"
                  />
                </Col>
                <Col className="cnjb_hcvh">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    className="Box BoxFont"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="ZIP Code"
                    className="Box BoxFont"
                  />
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
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
              <button className="mt-4 w-100 PayBtn p-2">Pay Now</button>
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
            {/* Order Items */}
            <div className="order-item">
              <img
                src={require("../../Images/1 (9) (1).png")}
                alt="Two Stone Diamond Ring"
                className="order-item-img"
              />
              <div className="bfh">
                <div className="order-item-details">
                  <p className="mb-1 fs4">
                    Two Stone <span>Diamond Ring</span>
                  </p>
                  <span className="fs5">18k Silver / Round Diamond</span>
                  <span className="fs5">Ring size: 3</span>
                </div>
                <strong className="order-price">&#8377;30,000</strong>
              </div>
            </div>

            <div className="order-item">
              <img
                src={require("../../Images/1 (9) (1).png")}
                alt="Two Stone Diamond Ring"
                className="order-item-img"
              />
              <div className="bfh">
                <div className="order-item-details">
                  <p className="mb-1 fs4">
                    Two Stone <span>Diamond Ring</span>
                  </p>
                  <span className="fs5">18k Silver / Round Diamond</span>
                  <span className="fs5">Ring size: 3</span>
                </div>
                <strong className="order-price">&#8377;30,000</strong>
              </div>
            </div>

            {/* Discount Code */}
            <Form.Group className="my-4 d-flex">
              <Form.Control
                type="text"
                placeholder="Discount code"
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
              <strong className="RightSec">&#8377;60,000</strong>
            </div>
          </div>
        </Col>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
