import React, { lazy, Suspense, useEffect } from "react";
import "./index.css";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));
const CartPopup = lazy(() => import("../Add to Cart"));

const posts = [
  {
    id: 1,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: "/Images/image (14).png",
  },
  {
    id: 2,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: "/Images/image (15).png",
  },
  {
    id: 3,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: "/Images/image (16).png",
  },
  {
    id: 4,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: "/Images/image (17).png",
  },
];

const Blog = () => {
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const [imageIndexes, setImageIndexes] = useState({});
  const disableRightClick = (e) => e.preventDefault();

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
    document.body.classList.add("no-scroll");
  };

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
            src="/Images/Group 1597884577.png"
            className="img_fluid1_banner"
            alt="blog"
          />
          {/* <div className='banner_text_sss'>
          <h1 className='banner_exx'>Blogs</h1>
        </div> */}
        </div>
        <div className="container pt-5 ">
          <div className="d-flex gap-5 blog_main_dddd">
            <div
              className="sdncsduchs h-100 position-sticky blog_sins_ssss"
              style={{ top: "12px" }}
            >
              <div className="card p-3 shadow-sm border-0 ">
                <h4 className="fw-bold border-bottom pb-2">Popular Posts</h4>
                {posts.map((post, index) => (
                  <div key={post.id} className="d-flex align-items-center my-3">
                    <img
                      onContextMenu={disableRightClick}
                      draggable="false"
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
                  style={{
                    listStyle: "none",
                    fontWeight: 400,
                    fontSize: "24px",
                  }}
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
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (20).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="ssss_dddd10">
                <div className="blog_fade_ds">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (20).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="ssss_dddd10 mt-5">
                <div className="blog_fade_ds">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (21).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="ssss_dddd10 mt-5">
                <div className="blog_fade_ds">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (22).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="ssss_dddd10 mt-5">
                <div className="blog_fade_ds">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (23).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="ssss_dddd10 mt-5">
                <div className="blog_fade_ds">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    src="/Images/image (24).png"
                    className="blog_ss_tysn_mg"
                    width={554}
                    alt="blog"
                    style={{width:"100%"}}
                  />
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
                  <a
                    href="/blog-details"
                    className="red_ddd d-flex gap-2 align-items-center"
                  >
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-sm-5 client_footer_monial"></div>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
