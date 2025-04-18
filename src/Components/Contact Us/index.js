import React from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import "./index.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import CartPopup from "../Add to Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const Contact = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });
  const [wishlistCount, setWishlistCount] = useState(0);
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
  const navigate = useNavigate('');
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

 

  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  };

  const toggleFavorite = async (productId) => {
    // if (!userId) return toast.error("Please log in to add items to wishlist");
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/register");
      return;
    }
    try {
      if (wishlistItems[productId]) {
        // Remove from wishlist
        const wishlistItemId = wishlistItems[productId]; // Store the current ID
        setWishlistItems((prev) => {
          const updatedWishlist = { ...prev };
          delete updatedWishlist[productId]; // Update UI immediately
          return updatedWishlist;
        });
        setWishlistCount(prev => prev - 1);
        const res = await axios.delete(
          `http://147.93.104.196:3000/api/v1/wishlist/delete/${wishlistItemId}`
        );
        toast.success(res.data.message || "Removed from wishlist!");
      } else {
        // Add to wishlist
        const response = await axios.post(
          `http://147.93.104.196:3000/api/v1/wishlist/create`,
          {
            productId,
            userId,
          }
        );

        const newWishlistItemId = response.data.data.id;
        setWishlistItems((prev) => ({
          ...prev,
          [productId]: newWishlistItemId, // Store wishlist ID properly
        }));
        setWishlistCount(prev => prev + 1);
        toast.success(response.data.message || "Added to wishlist!");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error("Failed to update wishlist. Please try again!");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://147.93.104.196:3000/api/v1/wishlist/${userId}`
        );
        const wishlistData = response.data.data || [];

        const wishlistMap = {};
        wishlistData.forEach((item) => {
          let productId = item.productId._id || item.productId.id;

          if (typeof productId === "string" || typeof productId === "number") {
            wishlistMap[productId] = item.id;
          } else {
            console.error("Invalid productId format:", item.productId);
          }
        });

        setWishlistItems(wishlistMap);
        setWishlistCount(wishlistData.length);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/register");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      const response = await axios.post('http://147.93.104.196:3000/api/v1/contact-us/create', formData);

      if (response.status === 201) {
        toast.success("Thank you for contacting us! We'll get back to you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: ""
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
      />
      <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
      // toastMessage={toastMessage}
      />
      <Header openCart={openCart}  wishlistCount={userId ? wishlistCount : null}
          cartCount={userId ? cartCount : null} />
      <div>
        <img
          src={require("../../Images/Group 1597884579.png")}
          className="img_fluid1_banner"
        />
        {/* <div className='banner_text_sss'>
                    <h1 className='banner_exx'>Contact Us</h1>
                </div> */}
      </div>
      <div className="container pt-5 pb-5">
        <div className="d-flex justify-content-between text-center text-md-start crad_idm_222_sss">
          {/* Phone Number */}
          <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </div>
            <div className="text-left d-flex flex-column acrtd_sss">
              <h4 className="ssyhgyeye">Phone Number</h4>
              <span className="ssyhgyey_sse">+91 72650 77755</span>
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
              <span className="ssyhgyey_sse">info@crystovajewels.com</span>
              <span className="ssyhgyey_sse">info@crystovajewels.com</span>
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
              <h3 className="habv_www">We’re Here to Help!</h3>
              <div className="pt-4">
                <span className="dhs_ddd">
                  Have questions, feedback, or need assistance? Connect with us,
                  and we’ll ensure you get the support you need.
                </span>
              </div>
              <div className="pt-4">
                <span className="dhs_ddd">
                  Your trust and satisfaction are our treasures. Reach out to us
                  anytime, and let us help you shine!" Whether you have a
                  question, need assistance, or want to share feedback, we’d
                  love to hear from you. Let’s make your jewellery shopping
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

                  <Form.Group className="my-4">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Your message here..."
                      className="con_filddd"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="submit-btn my-3">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* map here */}
      <div
        className="map-container hdr_csd d-none "
        style={{ width: "100%", height: "600px", marginBottom: "-10rem" }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.304037324984!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzU2LjciTiA3MsKwNDknNTUuNSJF!5e0!3m2!1sen!2sin!4v1648032200000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
};
export default Contact;