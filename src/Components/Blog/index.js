import React, { useEffect } from "react";
import "./index.css";
import Header from "../../Pages/Header";
import { FaArrowRight } from "react-icons/fa6";
import Footer from "../../Pages/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CartPopup from "../Add to Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const posts = [
  {
    id: 1,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (14).png"),
  },
  {
    id: 2,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (15).png"),
  },
  {
    id: 3,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (16).png"),
  },
  {
    id: 4,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (17).png"),
  },
];


const Blog = () => {
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

  // useEffect(() => {
  //   const fetchCartCount = async () => {
  //     const userId = localStorage.getItem("user_Id");
  //     if (!userId) return;
  //     try {
  //       const response = await axios.get(
  //         `http://147.93.104.196:3000/api/v1/order-details/get/${userId}`
  //       );
  //       const count = response.data.data.length || 0;
  //       setCartCount(count);
  //       localStorage.setItem("cartCount", count);
  //     } catch (error) {
  //       console.error("Error fetching cart count:", error);
  //     }
  //   };
  //   fetchCartCount();
  // }, []);

  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/register");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

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
          src={require("../../Images/Group 1597884577.png")}
          className="img_fluid1_banner"
        />
        {/* <div className='banner_text_sss'>
          <h1 className='banner_exx'>Blogs</h1>
        </div> */}
      </div>
      <div className="container pt-5 pb-5">
        <div className="d-flex gap-5 blog_main_dddd">
          <div className="sdncsduchs h-100 position-sticky blog_sins_ssss" style={{ top: '12px' }}>
            <div className="card p-3 shadow-sm border-0 ">
              <h4 className="fw-bold border-bottom pb-2">Popular Posts</h4>
              {posts.map((post, index) => (
                <div key={post.id} className="d-flex align-items-center my-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded blog_dim_dd"
                    width="100"
                    height="100"
                  />
                  <div className="ms-3">
                    <h6 className="mb-2 fw-bold sdiuuhjus">{post.title}</h6>
                    <span className="sxdexes mt-5">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-3 shadow-sm border-0  mt-5 blog_det_crdsss">
              <h4 className="fw-bold border-bottom pb-2">Category</h4>
              <ul
                className="mt-3 d-flex flex-column gap-2 align-items-start ms-0 dfc_newssss"
                style={{ listStyle: "none", fontWeight: 400, fontSize: "24px" }}
              >
                <li>News</li>
                <li>Accessories</li>
                <li>Collection</li>
                <li>Fashion</li>
                <li>Jewellery</li>
                <li>Trends</li>
              </ul>
            </div>

            <div className="card p-3 shadow-sm border-0  mt-5 blog_det_crdsss">
              <h4 className="fw-bold border-bottom pb-2">Tags</h4>
              <div className="d-flex flex-wrap gap-3 pt-4 pb-2">
                <div className="hjvbxy">Accessories</div>
                <div className="hjvbxy">Jewellery Collection</div>
                <div className="hjvbxy">Trends</div>
                <div className="hjvbxy">Fashion</div>
                <div className="hjvbxy">Collection</div>
              </div>
            </div>
          </div>

          <div className="sdncsduch row">
            <div className="ssss_dddd10">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (20).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (20).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (21).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (22).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (23).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (24).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
