import React, { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";
import { FaArrowRight } from "react-icons/fa6";
const CartPopup = lazy(() => import("../Add to Cart"));
const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));

const CustomJewel = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    type: "",
    budget: "",
    metalType: "",
    file: null,
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

 

  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
  };

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
    localStorage.setItem("wishlistCount", count.toString());
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `https://dev.crystovajewels.com/api/v1/wishlist/${userId}`
        );
        const wishlistData = response.data.data || [];
        const count = wishlistData.length;
        updateWishlistCount(count); // Initialize count properly
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
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
        formDataToSend.append("file", formData.file);
      }

      const response = await axios.post(
       "https://dev.crystovajewels.com/api/v1/whatsapp/custom/create",
        formDataToSend
      );

      if (response.status === 201) {
        toast.success("We will get back to you soon!");
        setSubmitMessage("Form submitted successfully!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          type: "",
          budget: "",
          metalType: "",
          file: null,
          description: "",
        });
      }
    } catch (error) {
      if (error.response) {
        // Handle specific field errors
        if (error.response.data.message.includes("must be a number")) {
          setSubmitMessage("Please enter a valid number for budget");
        } else {
          setSubmitMessage(error.response.data.message);
        }
      } else {
        setSubmitMessage("Error submitting form. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const blogData = [
    {
      title: "Jewellery Trends Inspired by Us",
      description:
        "Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus, sit amet dictum ligula lorem non nisl.",
      tags: ["Design", "Research", "Jewellery"],
      image: "/Images/image (20).png",
    },
    {
      title: "The Future of Handcrafted Jewellery",
      description:
        "Discover how artisans are blending tradition with innovation to create timeless designs with modern flair.",
      tags: ["Handcraft", "Innovation", "Style"],
      image: "/Images/image (20).png",
    },
    {
      title: "Jewellery Trends Inspired by Us",
      description:
        "Explore the growing demand for personalized pieces that reflect individuality and emotional connection.",
      tags: ["Custom", "Trends", "Luxury"],
      image: "/Images/image (20).png",
    },
    {
      title: "The Future of Handcrafted Jewellery",
      description:
        "Discover how artisans are blending tradition with innovation to create timeless designs with modern flair.",
      tags: ["Handcraft", "Innovation", "Style"],
      image: "/Images/image (20).png",
    },
  ];

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
        <div className="main-header">
          <Suspense fallback={<div>Loading...</div>}>
            <Header
              openCart={openCart}
              wishlistCount={userId ? wishlistCount : null}
              cartCount={userId ? cartCount : null}
            />
          </Suspense>
        </div>
        <div className="custom-jewel-container">
          {/* Banner Section */}
          <div className="bsn">
            <img
              loading="eager"
              src="/Images/customjewel.png"
              alt="Custom Jewellery"
            />
          </div>
          {/* Features Section */}
          <div className="container">
            <div className="features-section pe-0 ps-0">
              <h2 className="iojhf">Custom Jewellery</h2>
              <p className="pb-0 mb-0">Jewellery as Unique as Your Story</p>
              <img
                loading="eager"
                src="/Images/Groupimg.png"
                className="home_tag_img"
                alt="Decorative"
              />
              <div className="features-grid">
                {[
                  {
                    title: "Uniqueness and Exclusivity",
                    desc: "Custom Jewellery ensures no one else will have the exact same piece, making it truly yours.",
                    img: "/Images/23 Jewelry store.png",
                  },
                  {
                    title: "Jewellery Personalization",
                    desc: "Tailor every detail to your style, from the choice of gemstones to the design elements.",
                    img: "/Images/12 Handmade.png",
                  },
                  {
                    title: "Celebrate Special Moments",
                    desc: "Create a lasting memory for engagements, anniversaries, birthdays, or any milestone.",
                    img: "/Images/Group 1597884504.png",
                  },
                  {
                    title: "Quality and Craftsmanship",
                    desc: "Every custom piece is handcrafted by skilled artisans using the finest materials.",
                    img: "/Images/22 Jewelry making.png",
                  },
                ].map((feature, index) => (
                  <div className="feature-box" key={index}>
                    <img
                      loading="eager"
                      src={feature.img}
                      alt={feature.title}
                      className="feature-img"
                    />
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-0 pt-4 vustome-jewel-blog">
              <div className="row g-4  custrome_jelery">
                {blogData.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-12 col-sm-6"
                    key={index}
                  >
                    <div className="blog_fade_ds">
                      <img
                        src={item.image}
                        className="blog_ss_tysn_mg w-100"
                        alt="blog"
                      />
                    </div>
                    <div className="d-flex flex-column gap-2 pt-4">
                      <span className="mainj_ss text-start">{item.title}</span>
                      <p className="psps">{item.description}</p>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Jewellery Form */}
          <div className="custom-form ">
            <h2>Designed by You, Crafted by Us</h2>
            <p>
              Create a unique piece of Jewellery that reflects your personal
              style and story.
            </p>
            <img
              loading="eager"
              src="/Images/Groupimg.png"
              className="home_tag_img mb-4"
              alt="Decorative"
            />
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
                Choose your file here to upload. Allowed types: pdf, jpg, png,
                jpeg, doc, docx.
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
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default CustomJewel;
