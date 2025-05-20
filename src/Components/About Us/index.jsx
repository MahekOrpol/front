import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./index.css";

import { FaArrowRight } from "react-icons/fa6";
import { CiWallet } from "react-icons/ci";
import { PiCertificateLight, PiMoneyWavy } from "react-icons/pi";
import { MdOutlineContactSupport } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";
import Section15Testimonials from "../Home/section15Testimonials";
const CartPopup = lazy(() => import("../Add to Cart"));
const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));

const AboutUs = () => {
  const disableRightClick = (e) => e.preventDefault();

  const [slidesPerView, setSlidesPerView] = useState(1);

  
  
  const dispatch = useDispatch();
  const { count: cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);
  const navigate = useNavigate("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

  // useEffect(() => {
  //   const fetchCartCount = async () => {
  //     const userId = localStorage.getItem("user_Id");
  //     if (!userId) return;
  //     try {
  //       const response = await axios.get(
  //         `https://dev.crystovajewels.com/api/v1/order-details/get/${userId}`
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


  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      let newSlidesPerView;

      if (screenWidth <= 600) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 1000) {
        newSlidesPerView = 2;
      } else {
        newSlidesPerView = 3;
      }
      if (newSlidesPerView !== slidesPerView) {
        setSlidesPerView(newSlidesPerView);
      }
    };

    updateSlidesPerView(); // Run on mount
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [slidesPerView]); // Dependency to prevent infinite re-renders

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
            src="/Images/Group 1597884580.png"
            className="img_fluid1_banner"
            alt="about us"
          />
          {/* <div className="banner_text_sss">
          <h1 className="banner_exx">About Us</h1>
        </div> */}
        </div>

        <div className="container hdr_csd">
          <div className="row">
            <div className="aout">
              <img
                onContextMenu={disableRightClick}
                draggable="false"
                loading="eager"
                className="djs_about img-fluid sticky"
                src="/Images/Group 1597884574.png"
                alt="about us"
              />
            </div>
            <div className="w-50 d-flex flex-column gap-5 wr dlex">
              <span className="wel_sss">
                Welcome to the Crystova Jewels where Elegance meets Artistry{" "}
              </span>
              <span className="sx_dec25 d-flex justify-content-start dlex">
                Our brand was founded on the principles of quality,
                craftsmanship, and innovation. We bring a rich heritage of
                artistry into every design.
              </span>
              <span className="dsh_566_sss">
                Since our inception, we have been devoted to crafting
                exceptional pieces that celebrate life’s most meaningful
                moments. From engagements to anniversaries, birthdays to
                everyday expressions of love, our Jewellery is designed to be a
                part of your story—each piece a reflection of your unique
                journey. Each piece we create is imbued with meaning, designed
                to resonate with your deepest sentiments and last for
                generations to come.
              </span>
              <div className="d-flex gap-1">
                <div className="d-flex align-items-center gap-3 flex-column">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    loading="eager"
                    src="/Images/Group 1597884563.png"
                    alt="about us"
                  />
                  <span className="our_ddd">Our Journey</span>
                  <span className="shsdy_555">
                    Our journey is one of passion and purpose that captures the
                    essence of the life’s most cherished moments.
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3 flex-column">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    loading="eager"
                    src="/Images/Group 1597884564.png"
                    alt="about us"
                  />
                  <span className="our_ddd">Explore & Connect</span>
                  <span className="shsdy_555">
                    Browse our collections to find pieces that speak to you or
                    reach out to our team for personalized assistance.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hdr_csd">
          <img
            onContextMenu={disableRightClick}
            // draggable="false"
            loading="eager"
            src="/Images/Group 1597884485.png"
            alt="about us"
          />
        </div>

        <div className="container p-2">
          <div className="hdr_csd dcscds_xsx row cdc_dcdcd">
            <div className="col-md-6 d-flex flex-column gap-5 Her">
              <div className="d-flex flex-column gap-3">
                <span className="abt_vdio">What Sets Us Apart?</span>
                <span className="skijiws_256">
                  We offer emergency towing service at unbeatable prices. Not
                  only are our prices flexible but so is our service and
                  schedule, which is why we also provide 24 hour towing service
                  and speedy gas.
                </span>
              </div>
              <div className="d-flex flex-column gap-5">
                <div className="d-flex align-items-center gap-3">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    loading="eager"
                    src="/Images/Group 1597884572.png"
                    alt="about us"
                  />
                  <div className="d-flex align-items-center gap-3 flex-column">
                    <span className="visionb d-flex justify-content-start w-100">
                      Vision
                    </span>
                    <span className="wqsjjhu_wwsw">
                      To be a globally recognized Jewellery brand that inspires
                      confidence, celebrates individuality, and transforms
                      life’s moments into timeless treasures.
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img
                    onContextMenu={disableRightClick}
                    draggable="false"
                    loading="eager"
                    src="/Images/Group 1597884573.png"
                    alt="about us"
                  />

                  <div className="d-flex align-items-center gap-3 flex-column">
                    <span className="visionb d-flex justify-content-start w-100">
                      Mission
                    </span>
                    <span className="wqsjjhu_wwsw">
                      Our mission is to empower individuals to express
                      themselves, celebrate their milestones, and create lasting
                      memories with every piece.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 position-relative d-flex justify-content-center m-auto GRoUp">
              <div className="video-container position-relative">
                <video
                  preload="none"
                  loading="eager"
                  src="/Videos/Abouy Sss.mp4"
                  className="bg-white vi_rng_fff"
                  autoPlay
                  loop
                  muted
                />
                <img
                  onContextMenu={disableRightClick}
                  draggable="false"
                  loading="eager"
                  src="/Images/Mask group (3).png"
                  className="sjd_555 position-absolute top-50 translate-middle"
                  alt="Jewelry Overlay"
                />
              </div>
            </div>
            {/* <div className="w-50">
            <div>
              <video
preload="none"
                                loading="eager"
                src='/Videos/Abouy Sss.mp4'
                className="bg-white mas_ddd"
                autoPlay
                loop
                muted
              />
            
             <img   
  onContextMenu={disableRightClick}
   // draggable="false" 
 loading="lazy"
                src="/Images/Mask group (3).png")}
                className="sjd_555"
              />
            </div>
          </div> */}
          </div>

          <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
            <p className="foss_sd">NEWS AND BLOGS</p>
            <span className="category_name_ss">
              Latest News and Blog Updates
            </span>
          </div>

          <div className="sdncsduchs_1 row">
            <div className="col-sm-4 col-12 ssss_dddd1_aby mt-5">
              <div className="blog_fade_ds">
                <img
                  onContextMenu={disableRightClick}
                  draggable="false"
                  loading="eager"
                  src="/Images/image (21).png"
                  className="img-fluid"
                  alt="about us"
                />
              </div>
              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur.
                </p>
                <a
                  href="/blog-details"
                  className="red_ddd d-flex gap-2 align-items-center"
                >
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>

            <div className="col-sm-4 col-12 ssss_dddd1_aby mt-5">
              <div className="blog_fade_ds">
                <img
                  onContextMenu={disableRightClick}
                  draggable="false"
                  loading="eager"
                  src="/Images/image (22).png"
                  className="img-fluid"
                  alt="about us"
                />
              </div>
              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur.
                </p>
                <a
                  href="/blog-details"
                  className="red_ddd d-flex gap-2 align-items-center"
                >
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>

            <div className="col-sm-4 col-12 ssss_dddd1_aby mt-5">
              <div className="blog_fade_ds">
                <img
                  onContextMenu={disableRightClick}
                  draggable="false"
                  loading="eager"
                  src="/Images/image (23).png"
                  className="img-fluid"
                  alt="about us"
                />
              </div>
              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur.
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

          <div className="container pt-5">
            <div className="row g-4 Fyty">
              <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center text-center FlBi">
                <CiWallet size={50} className="icon-style" />
                <span className="xshhhss_ss">Flexible Payment</span>
                <span className="xshhhss">
                  Enjoy easy, flexible payment options to suit your budget
                </span>
              </div>

              <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center text-center FlBi">
                <PiMoneyWavy size={50} className="icon-style" />
                <span className="xshhhss_ss">Money Guarantee</span>
                <span className="xshhhss">
                  Shop with confidence, our money-back guarantee ensures your
                  satisfaction
                </span>
              </div>

              <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center text-center FlBi">
                <PiCertificateLight size={50} className="icon-style" />
                <span className="xshhhss_ss">Certifications</span>
                <span className="xshhhss">
                  All our Jewellery pieces are certified for quality and ethical
                  sourcing.
                </span>
              </div>

              <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center text-center FlBi">
                <MdOutlineContactSupport size={50} className="icon-style" />
                <span className="xshhhss_ss">Online Support</span>
                <span className="xshhhss">
                  Need assistance? Our dedicated online support team is here to
                  help you
                </span>
              </div>
            </div>
          </div>
        </div>
        <Section15Testimonials />
        <div className="pb-sm-5 client_footer_monial"></div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
