import React, { lazy, Suspense } from "react";

import "./index.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const CartPopup = lazy(() => import("../Add to Cart"));
const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));

const Contact = () => {
  const disableRightClick = (e) => e.preventDefault();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const [imageIndexes, setImageIndexes] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);
  const navigate = useNavigate("");
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  };

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
    localStorage.setItem("wishlistCount", count.toString());
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    if (!userId) {
      console.log("No userId found");
      return;
    }

    try {
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/wishlist/${userId}`
      );

      if (!response?.data?.data) {
        console.log("No wishlist data found");
        setWishlistItems([]);
        setWishlistCount(0);
        localStorage.setItem("wishlistCount", "0");
        return;
      }

      const wishlistData = response.data.data.filter((item) => item?.productId); // Filter out items without productId
      setWishlistItems(wishlistData);
      setWishlistCount(wishlistData.length);
      localStorage.setItem("wishlistCount", wishlistData.length.toString());

      // Initialize image indexes for each product
      const initialIndexes = {};
      wishlistData.forEach((item) => {
        if (item?.productId?.id) {
          initialIndexes[item.productId.id] = 0;
        }
      });
      setImageIndexes(initialIndexes);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist items");
      setWishlistItems([]);
      setWishlistCount(0);
      localStorage.setItem("wishlistCount", "0");
    }
  };


  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      setIsCartOpen(true);
      sessionStorage.removeItem("cameFromCheckout");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dev.crystovajewels.com/api/v1/contact-us/create",
        formData
      );

      if (response.status === 201) {
        toast.success(
          "Thank you for contacting us! We'll get back to you soon."
        );
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
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
        style={{ zIndex: 1000000001 }}
      />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
        // toastMessage={toastMessage}
      />
      <div className={isCartOpen ? "blurred" : ""}>
        <div className="main-header1">
          <Suspense fallback={<div>Loading...</div>}>
            <Header
              openCart={openCart}
              wishlistCount={userId ? wishlistCount : null}
              cartCount={userId ? cartCount : null}
            />
          </Suspense>
        </div>
        <div>
          <img
            onContextMenu={disableRightClick}
            draggable="false"
            loading="eager"
            src="/Images/Group 1597884579.png"
            className="img_fluid1_banner"
            alt="contact us"
          />
          {/* <div className='banner_text_sss'>
                    <h1 className='banner_exx'>Contact Us</h1>
                </div> */}
        </div>
        <div className="container pt-5 pb-5 contact_us_main">
          <div className="d-flex justify-content-between text-center text-md-start crad_idm_222_sss">
            {/* Phone Number */}
            <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </div>
              <div className="text-left d-flex flex-column acrtd_sss">
                <h4 className="ssyhgyeye">Phone Number</h4>
                <span className="ssyhgyey_sse">+91 72650 77755</span>
              </div>
            </div>
            <p className="sssss11"></p>
            {/* Email Address */}
            <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
              <div className="text-left d-flex flex-column acrtd_sss">
                <h4 className="ssyhgyeye">Email Address</h4>
                <span className="ssyhgyey_sse">crystovajewels@gmail.com</span>
              </div>
            </div>
            <p className="sssss11"></p>
            {/* Office Address */}
            <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faLocationDot} size="lg" />
              </div>
              <div className="text-left d-flex flex-column acrtd_sss">
                <h4 className="ssyhgyeye">Office Address</h4>
                <span className="ssyhgyey_sse">
                  B-714 IT Park, Opp. AR Mall,
                  <br />
                  Mota Varachha, Surat - 394101
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex gap-5 hdr_cs sdc_Sdc_888">
            <div className="shyr_con">
              <div className="con_main">
                <h3 className="habv_www">Have Queries?</h3>
                <h3 className="habv_www">We're Here to Help!</h3>
                <div className="pt-4">
                  <span className="dhs_ddd">
                    Have questions, feedback, or need assistance? Connect with
                    us, and we'll ensure you get the support you need.
                  </span>
                </div>
                <div className="pt-4">
                  <span className="dhs_ddd">
                    Your trust and satisfaction are our treasures. Reach out to
                    us anytime, and let us help you shine!" Whether you have a
                    question, need assistance, or want to share feedback, we'd
                    love to hear from you. Let's make your jewellery shopping
                    experience exceptional.
                  </span>
                </div>
                <div className="pt-4">
                  <div className="ssjnsec_fdd p-3 ">
                    <span className="ens_ddds">
                      Engagement rings, wedding bands, and anniversary gifts
                      commemorate milestones, making the jewellery a lifelong
                      symbol of love and commitment.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="shyr_con">
              {/* <div className='card h-100 con_ssss'>
                            <div className='row '>
                            </div>
                        </div> */}
              <Card className="contact-card con_ssss">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="con_row_sss">
                      <Col md={6} className="sx_row_sss">
                        <Form.Group className="my-4">
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="con_filddd"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="sx_row_sss">
                        <Form.Group className="my-4">
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="con_filddd"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="con_row_sss">
                      <Form.Group className="my-4">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="con_filddd"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>
                    <Row className="con_row_sss">
                      <Form.Group className="my-4">
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          className="con_filddd"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="con_row_sss">
                      <Form.Group className="my-4">
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="message"
                          placeholder="Your message here..."
                          className="con_filddd"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>
                    <Button type="submit" className="submit-btn my-3">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        {/* map here */}
        {/* <div
          className="map-container hdr_csd "
          style={{ width: "100%", height: "600px", marginBottom: "-10rem" }}
        >
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.304037324984!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzU2LjciTiA3MsKwNDknNTUuNSJF!5e0!3m2!1sen!2sin!4v1648032200000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}
        <div className="pb-sm-5 client_footer_monial"></div>
        <Footer />
      </div>
    </>
  );
};
export default Contact;
