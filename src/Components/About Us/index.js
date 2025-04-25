import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRight,
  FaStar,
} from "react-icons/fa6";
import { CiStar, CiWallet } from "react-icons/ci";
import { PiCertificateLight, PiMoneyWavy } from "react-icons/pi";
import ringVideo from "../../Videos/Abouy Sss.mp4";
import { MdOutlineContactSupport } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CartPopup from "../Add to Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const AboutUs = () => {
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const testimonials = [
    {
      name: "Emily Carol",
      text: "I wanted a custom bracelet to honor my daughter’s birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It’s a masterpiece I’ll cherish forever.",
    },
    {
      name: "John Doe",
      text: "I wanted a custom bracelet to honor my daughter’s birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It’s a masterpiece I’ll cherish forever.",
    },
    {
      name: "Jane Smith",
      text: "I wanted a custom bracelet to honor my daughter’s birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It’s a masterpiece I’ll cherish forever.",
    },
  ];
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
      />
      <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
        // toastMessage={toastMessage}
      />
      <div className="main-header">
        <Header
          openCart={openCart}
          wishlistCount={userId ? wishlistCount : null}
          cartCount={userId ? cartCount : null}
        />
      </div>
      <div>
        <img
          loading="lazy"
          src={require("../../Images/Group 1597884580.png")}
          className="img_fluid1_banner"
        />
        {/* <div className="banner_text_sss">
          <h1 className="banner_exx">About Us</h1>
        </div> */}
      </div>

      <div className="container hdr_csd">
        <div className="row">
          <div className="aout">
            <img
              loading="lazy"
              className="djs_about img-fluid sticky"
              src={require("../../Images/Group 1597884574.png")}
            />
          </div>
          <div className="w-50 d-flex flex-column gap-5 wr dlex">
            <span className="wel_sss">
              Welcome to the Crystova Jewels where Elegance meets Artistry{" "}
            </span>
            <span className="sx_dec25 d-flex justify-content-start dlex">
              Our brand was founded on the principles of quality, craftsmanship,
              and innovation. We bring a rich heritage of artistry into every
              design.
            </span>
            <span className="dsh_566_sss">
              Since our inception, we have been devoted to crafting exceptional
              pieces that celebrate life’s most meaningful moments. From
              engagements to anniversaries, birthdays to everyday expressions of
              love, our jewelry is designed to be a part of your story—each
              piece a reflection of your unique journey. Each piece we create is
              imbued with meaning, designed to resonate with your deepest
              sentiments and last for generations to come.
            </span>
            <div className="d-flex gap-1">
              <div className="d-flex align-items-center gap-3 flex-column">
                <img
                  loading="lazy"
                  src={require("../../Images/Group 1597884563.png")}
                />
                <span className="our_ddd">Our Journey</span>
                <span className="shsdy_555">
                  Our journey is one of passion and purpose that captures the
                  essence of the life’s most cherished moments.
                </span>
              </div>
              <div className="d-flex align-items-center gap-3 flex-column">
                <img
                  loading="lazy"
                  src={require("../../Images/Group 1597884564.png")}
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
          loading="lazy"
          src={require("../../Images/Group 1597884485.png")}
        />
      </div>

      <div className="container p-2">
        <div className="hdr_csd dcscds_xsx row cdc_dcdcd">
          <div className="col-md-6 d-flex flex-column gap-5 Her">
            <div className="d-flex flex-column gap-3">
              <span className="abt_vdio">What Sets Us Apart?</span>
              <span className="skijiws_256">
                We offer emergency towing service at unbeatable prices. Not only
                are our prices flexible but so is our service and schedule,
                which is why we also provide 24 hour towing service and speedy
                gas.
              </span>
            </div>
            <div className="d-flex flex-column gap-5">
              <div className="d-flex align-items-center gap-3">
                <img
                  loading="lazy"
                  src={require("../../Images/Group 1597884572.png")}
                />
                <div className="d-flex align-items-center gap-3 flex-column">
                  <span className="visionb d-flex justify-content-start w-100">
                    Vision
                  </span>
                  <span className="wqsjjhu_wwsw">
                    To be a globally recognized jewelry brand that inspires
                    confidence, celebrates individuality, and transforms life’s
                    moments into timeless treasures.
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <img
                  loading="lazy"
                  src={require("../../Images/Group 1597884573.png")}
                />

                <div className="d-flex align-items-center gap-3 flex-column">
                  <span className="visionb d-flex justify-content-start w-100">
                    Mission
                  </span>
                  <span className="wqsjjhu_wwsw">
                    Our mission is to empower individuals to express themselves,
                    celebrate their milestones, and create lasting memories with
                    every piece.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 position-relative d-flex justify-content-center m-auto GRoUp">
            <div className="video-container position-relative">
              <video
                preload="none"
                loading="lazy"
                src={ringVideo}
                className="bg-white vi_rng_fff"
                autoPlay
                loop
                muted
              />
              <img
                loading="lazy"
                src={require("../../Images/Mask group (3).png")}
                className="sjd_555 position-absolute top-50 translate-middle"
                alt="Jewelry Overlay"
              />
            </div>
          </div>
          {/* <div className="w-50">
            <div>
              <video
preload="none"
                                loading="lazy"
                src={ringVideo}
                className="bg-white mas_ddd"
                autoPlay
                loop
                muted
              />
            
              <img 
 loading="lazy"
                src={require("../../Images/Mask group (3).png")}
                className="sjd_555"
              />
            </div>
          </div> */}
        </div>

        <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
          <p className="foss_sd">NEWS AND BLOGS</p>
          <span className="category_name_ss">Latest News and Blog Updates</span>
        </div>

        <div className="sdncsduchs_1 row">
          <div className="col-sm-4 col-12 ssss_dddd1_aby mt-5">
            <div className="blog_fade_ds">
              <img
                loading="lazy"
                src={require("../../Images/image (21).png")}
                className="img-fluid"
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-4">
              <span className="mainj_ss">Jewellery Trends Inspired by Us</span>
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
                loading="lazy"
                src={require("../../Images/image (22).png")}
                className="img-fluid"
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-4">
              <span className="mainj_ss">Jewellery Trends Inspired by Us</span>
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
                loading="lazy"
                src={require("../../Images/image (23).png")}
                className="img-fluid"
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-4">
              <span className="mainj_ss">Jewellery Trends Inspired by Us</span>
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
                All our jewelry pieces are certified for quality and ethical
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
      {/* <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <p className="foss_sd">CLIENT TESTIMONIAL</p>
        <span className="category_name_ss">What Our Clients Say</span>
        <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div className="card w-25 testimonial-card mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
          <div className="card w-25 testimonial-card1 mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
          <div className="card w-25 testimonial-card2 mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="testimonial-container d-flex align-items-center">
        {/* <button
          className="nav-button left"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaAngleLeft />
        </button> */}

        <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd pb-5">
          <span className="category_name">Client Testimonial</span>
          <p className="category_txt">What our Client’s say about us</p>
          <img
            loading="lazy"
            src={require("../../Images/Groupimg.png")}
            alt="Decorative"
          />

          <Swiper
            grabCursor={true}
            loop={true} // Infinite Loop
            slidesPerView={slidesPerView}
            slidesPerGroup={1}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="swiper_testimonial container"
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
            }}
            preloadImages={false}
            lazy={true}
          >
            {[...testimonials, ...testimonials, ...testimonials].map(
              (item, index) => (
                <SwiperSlide className="slide_ssssss_sss_dexsdx" key={index}>
                  <div
                    className={`card testimonial-card${
                      index % 3 === 0 ? "" : index % 3 === 1 ? "1" : "2"
                    } mt-5`}
                  >
                    <div className="card-body pt-5">
                      <h5 className="card-title text-center emi_ffcc">
                        Emily Carol
                      </h5>
                      <p className="card-text sdcdscsd text-center">
                        I wanted a custom bracelet to honor my daughter’s birth,
                        and the designers exceeded my expectations. They
                        listened to every detail I envisioned and brought it to
                        life. It’s a masterpiece I’ll cherish forever.
                      </p>
                      <p className="text-center sdcdscsd">Client</p>
                      <div className="d-flex justify-content-center align-items-center">
                        <FaStar color="#DBB439" />
                        <FaStar color="#DBB439" />
                        <FaStar color="#DBB439" />
                        <CiStar />
                        <CiStar />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        {/* <button
          className="nav-button right"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaAngleRight />
        </button> */}
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
