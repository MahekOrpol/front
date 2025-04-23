import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import {
  FaAward,
  FaMedal,
  FaStar,
} from "react-icons/fa6";
import vector from "../../Images/Vector.png";
import {  BiShoppingBag, BiSolidOffer } from "react-icons/bi";
import Header from "../../Pages/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import best from "../../Images/Mask group (9).png";

import {
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CiStar } from "react-icons/ci";
import Footer from "../../Pages/Footer";
import { GrNext } from "react-icons/gr";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Navigate, useNavigate } from "react-router-dom";
// import { Tab, Tabs } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Tabs } from "@mui/material";
import CartPopup from "../Add to Cart";
import axios from "axios";
import "swiper/css/navigation";
import ringVideo1 from "../../Videos/dfcvdfx.mp4";
import ringVideo2 from "../../Videos/dfvdfvd.mp4";
import ringVideo3 from "../../Videos/sdcsdcdfc.mp4";
import ringVideo4 from "../../Videos/sdcxdscx.mp4";
import ringVideo5 from "../../Videos/dsfcdfc.mp4";
import JewelrySale from "../Contact Us/sdcsd/demo";
import { ToastContainer, toast } from "react-toastify";
import Instruction from "./instruction";
import OueColletion from "./ourColletion";
import RingSlider from "./ring";
import DimondJewelery from "./Dimond Jewellery/dimond";
import Occasion from "./Occasion";
import Gift from "./gift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { fetchCartCount } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Ring1 from "./ring demo 1/ring";


const Home = () => {
  const [isFavorite, setIsFavorite] = useState({});
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Store Swiper instance
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const userId = localStorage.getItem("user_Id");
  const [wishlistItems, setWishlistItems] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [categoriesa, setCategoriesa] = useState();
  const [currentCategory, setCurrentCategory] = useState("");
  const [filteredBestSellers, setFilteredBestSellers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(1); // Initialize with 1
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next"); // Track slide direction for animation
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const dispatch = useDispatch();

  const BASE_API = "https://dev.crystovajewels.com/api/v1";

  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  const [showArrow, setShowArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      setIsCartOpen(true);
      sessionStorage.removeItem("cameFromCheckout");
    }

    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10; // 10px threshold
    setShowArrow(isAtEnd);
  };

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const productsToDisplay =
    filteredBestSellers.length > 0 ? filteredBestSellers : bestSelling;

  const AUTO_SLIDE_INTERVAL = 2000; // 3 seconds

  useEffect(() => {
    const update = () => setProductsPerPage(window.innerWidth < 768 ? 1 : 2);
    const debounce = setTimeout(update, 100); // Debounced update
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener("resize", update);
    };
  }, []);
  

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };


  const fetchBestSellersByCategory = async (category) => {
    try {
      const url = `https://dev.crystovajewels.com/api/v1/product/get?categoryName=${category}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      return [];
    }
  };
  const handleTooltipClick = async (category) => {
    setCurrentCategory(category);
    const products = await fetchBestSellersByCategory(category);
    setFilteredBestSellers(products);
    setCurrentIndex(0);
    console.log("products :>> ", products);
  };

  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  };
  // Function to add an item to the cart
  const addToCart = async (product) => {
    try {
      const userId = localStorage.getItem("user_Id");

      if (!userId) {
        navigate("/register");
        return;
      }

      const productSize = Array.isArray(product?.productSize)
        ? product.productSize.join(",")
        : product?.productSize || "";
      const variationIds = Array.isArray(product?.variations)
        ? product.variations.map((variation) => variation.id) // Ensure only ObjectIds are sent
        : [];

      // Define the payload for the API request
      const payload = {
        userId: userId,
        productId: product?.id,
        productPrice: product.salePrice?.$numberDecimal,
        quantity: product?.quantity || 1,
        productSize: productSize,
        discount: product?.discount?.$numberDecimal || 0,
        variation: variationIds,
      };
      console.log(
        "product",
        JSON.stringify(JSON.stringify(product?.variations))
      );

      // Make the API request
      const response = await axios.post(
        "https://dev.crystovajewels.com/api/v1/order-details/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      openCart(); // Open cart after successful addition
      if (response.status === 200) {
        console.log("Product added to cart successfully:", response.data);
      } else {
        console.error("Failed to add product to cart:", response);
      }
      dispatch(fetchCartCount());
      setToastMessage("Item added to cart successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await axios.get(
      "https://dev.crystovajewels.com/api/v1/category/get"
    );
    setCategoriesa(res.data);
    console.log("res.datassss :>> ", res.data);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const scaleSlides = () => {
      swiperInstance.slides.forEach((slide) => {
        slide.style.transform = "scale(0.8)";
        slide.style.opacity = "1";
      });

      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      if (activeSlide) {
        activeSlide.style.transform = "scale(1)";
        activeSlide.style.opacity = "1";
      }
    };

    scaleSlides();
    swiperInstance.on("slideChangeTransitionStart", scaleSlides);

    return () => {
      swiperInstance.off("slideChangeTransitionStart", scaleSlides);
    };
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
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

useEffect(() => {
  const fetchAll = async () => {
    try {
      const [topRated, bestSelling, onSale] = await Promise.all([
        axios.get(`${BASE_API}/product/getTopRated`),
        axios.get(`${BASE_API}/product/getBestSelling`),
        axios.get(`${BASE_API}/product/getOnSale`),
      ]);
      setTopRated(topRated.data);
      setBestSelling(bestSelling.data);
      setOnSale(onSale.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchAll();
}, []);


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

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
    localStorage.setItem("wishlistCount", count.toString());
  };

  const toggleFavorite = async (productId, productData) => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/register");
      return;
    }
  
    try {
      if (wishlistItems[productId]) {
        // Remove from wishlist
        const wishlistItemId = wishlistItems[productId];
        setWishlistItems((prev) => {
          const updatedWishlist = { ...prev };
          delete updatedWishlist[productId];
          return updatedWishlist;
        });
        updateWishlistCount(wishlistCount - 1);
        const res = await axios.delete(
          `https://dev.crystovajewels.com/api/v1/wishlist/delete/${wishlistItemId}`
        );
        toast.success(res.data.message || "Removed from wishlist!");
      } else {
        // Add to wishlist
        const payload = {
          userId,
          productId,
        };
        const response = await axios.post(
          `https://dev.crystovajewels.com/api/v1/wishlist/create`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const wishlistItem = response.data?.data;
        setWishlistItems((prev) => ({
          ...prev,
          [productId]: wishlistItem.id,
        }));
        updateWishlistCount(wishlistCount + 1);
        toast.success(response.data.message  || "Added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong. Please try again.");
    }
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

      if (screenWidth <= 427) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 599) {
        newSlidesPerView = 2;
      } else if (screenWidth <= 768) {
        newSlidesPerView = 2;
      } else if (screenWidth <= 1024) {
        newSlidesPerView = 3;
      } else {
        newSlidesPerView = 3;
      }
      if (newSlidesPerView !== slidesPerView) {
        setSlidesPerView(newSlidesPerView);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [slidesPerView]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      swiperRef.current?.update();
    });
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const scaleSlides = () => {
      swiperInstance.slides.forEach((slide) => {
        slide.style.transform = "scale(0.8)";
        slide.style.opacity = "1";
      });

      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      if (activeSlide) {
        activeSlide.style.transform = "scale(1)";
        activeSlide.style.opacity = "1";
      }
    };

    scaleSlides();
    swiperInstance.on("slideChangeTransitionStart", scaleSlides);

    return () => {
      swiperInstance.off("slideChangeTransitionStart", scaleSlides);
    };
  }, []);

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
        toastMessage={toastMessage}
      />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <Header
          openCart={openCart}
          wishlistCount={userId ? wishlistCount : null}
          cartCount={userId ? cartCount : null}
        />

        <div>
         
          <JewelrySale />
        </div>

        <div className="d-flex flex-column align-items-center hdr_csd p-0 sdcds_cate">
          <span className="category_name mt-md-4">Categories</span>
          <p className="category_txt">Radiance Fits for Everyone</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          <div className=" p-0" style={{ width: "100vw" }}>
            <Swiper
              spaceBetween={10}
              loop={true}
             
              breakpoints={{
                0: { slidesPerView: 4 },
                480: { slidesPerView: 5 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1200: { slidesPerView: 6 },
              }}
              className="mySwiper xfvdfvdfvc "
            >
              {categoriesa?.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="slide-item"
                  onClick={() => handleCategoryClick(category.categoryName)}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={`https://dev.crystovajewels.com${category.categoryImage}`}
                      className="home-img home_img_ssssss fvfvfc_Zdcdsc"
                      alt={category.categoryName}
                    />
                    <span className="category-label">
                      {category.categoryName}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="hdr_csd sdcxsdcx_Sdcxszdcx">
          <div className="scrolling-wrapper fastival-offerssss">
            <div className="scroll-content">
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
            <div className="position-relative">
              <img
                src={require("../../Images/image (3).png")}
                className="img-fluid w-100"
                alt="Main Image"
              />

              <div className="overlay-img11">
                <img
                  src={require("../../Images/Rectangle 105457.png")}
                  className="img-fluid w-100"
                  alt="Overlay"
                />
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center gap-5 ps-md-5 ms-md-5 pt-sm-5 ps-sm-4 pb-sm-5 pt-5 ps-4 pb-5 fest_00ssss">
              <span className="fest_fff">FESTIVAL SALE OFFERS</span>
              <div className="txt_frss d-flex flex-column gap-3 sale_offer_sss">
                <span>Upto 25% Off on All Jewelry Favorites</span>
                <span> Limited Time!</span>
              </div>
              <div>
                <span className="txt_par">
                  Diamonds come in a variety of shapes, each offering unique
                  beauty and appeal.
                  <br className="d-md-none d-lg-block d-none" /> Here’s a guide
                  to different shapes of diamond rings
                </span>
              </div>
              <div>
                <button
                  className="w-25 spg_nb_sle"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div className="scrolling-wrapper">
            <div className="scroll-content">
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center diamon_jewe">
          <span className="category_name mt-md-4">Diamond Jewelry</span>
          <p className="category_txt">Minimal. Modern. Mesmerizing</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <DimondJewelery />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hnbgygjhh mt-md-4">
          <span className="category_name ">Trending Collection</span>
          <p className="category_txt">
            The Latest looks, Crafted to Perfection
          </p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="w-auto mt-1">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  textColor="black"
                  TabIndicatorProps={{
                    style: { backgroundColor: "#611D2B" }, // Active indicator color
                  }}
                  sx={{
                    "& .MuiTab-root": {
                      color: "black", // Default text color for all tabs
                    },
                    "& .Mui-selected": {
                      color: "#611D2B !important",
                      fontWeight: 600,
                    },
                    "& .MuiTabs-list": {
                      justifyContent: "space-between",
                    },
                  }}
                >
                  <Tab
                    className="xjc_dbv flex-row align-items-center "
                    icon={
                      <BiSolidOffer
                        color="#611D2B"
                        className="pt-1"
                        size={30}
                      />
                    }
                    label="On Sale"
                    value="1"
                  />
                  <Tab
                    className="xjc_dbv flex-row align-items-center "
                    icon={
                      <FaAward color="#611D2B" className="pt-1" size={30} />
                    }
                    label="Best Seller"
                    value="2"
                  />
                  <Tab
                    className="xjc_dbv flex-row align-items-center "
                    icon={
                      <FaMedal color="#611D2B" className="pt-1" size={30} />
                    }
                    label="Top Rated"
                    value="3"
                  />
                </Tabs>
              </Box>
            </TabContext>
          </div>
          {value === "1" && (
            <>
              <div
                className="d-flex align-items-center justify-content-end w-100 container pt-2"
                style={{ cursor: "pointer" }}
              >
                <div className="view_more_round"></div>
                <a
                  href="/products"
                  className="d-flex align-items-center gap-2 more_link"
                >
                  View All <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
              <div className="d-flex flex-column container position-relative">
                <div
                  className="row pt-3 dscsdc_fdvfv_sdcdsc"
                  ref={scrollContainerRef}
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth",
                  }}
                >
                  {onSale.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
                      style={{
                        flex: "0 0 auto",
                      }}
                    >
                      <div className="card prio_card scdscsed_sdss ">
                        {/* Image Wrapper with position-relative */}
                        <div className="card-image-wrapper position-relative">
                          {/* SALE Badge */}
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                            SALE
                          </button>
                          {/* Favorite Icon */}
                          <div
                            className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                            onClick={() => toggleFavorite(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {wishlistItems[product.id] ? (
                              <GoHeartFill
                                className="heart-icon_ss"
                                size={18}
                              />
                            ) : (
                              <GoHeart className="heart-icon_ss" size={18} />
                            )}
                          </div>
                          <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                            {/* {(() => {
                              const imageToShow = product.image.find(
                                (img) => !img.endsWith(".mp4")
                              );
                              return imageToShow ? (
                                <img
                                  src={`https://dev.crystovajewels.com${imageToShow}`}
                                  className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                  alt="Product"
                                  onClick={() => handleProductClick(product.id)}
                                />
                              ) : (
                                <div className="text-center text-muted py-4">
                                  No image available
                                </div>
                              );
                            })()} */}
                            {product.image[0]?.endsWith(".mp4") ? (
                              <video
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                onClick={() => handleProductClick(product.id)}
                              />
                            ) : (
                              <img
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                alt="Product"
                                onClick={() => handleProductClick(product.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Product Details */}
                      <div className="d-flex flex-column main_cdsss">
                        <span className="mikdec_asdaa text-truncate pt-3 ">
                          {product.productName}
                        </span>
                        <div className="d-flex align-items-center gap-3 pt-1">
                          <span className="mikdec_asdxsx">
                            ₹{product.salePrice?.$numberDecimal}
                          </span>
                          <span className="mikdec_axsx">
                            ₹{product.regularPrice?.$numberDecimal}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                          <button
                            className="more_btn_dsdd ewdcscdsedcds w-50"
                            // onClick={() => navigate("/product-details")}
                            onClick={() => handleProductClick(product.id)}
                          >
                            More Info
                          </button>
                          <button
                            className="d-flex align-items-center add-to-crd-dd gfbfgbvgfcbfb w-75 p-1 justify-content-center gap-3"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart <BiShoppingBag size={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {value === "2" && (
            <>
              <div
                className="d-flex align-items-center justify-content-end w-100 container pt-2"
                style={{ cursor: "pointer" }}
              >
                <div className="view_more_round"></div>
                <a
                  href="/products"
                  className="d-flex align-items-center gap-2 more_link"
                >
                  View All <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
              <div className="d-flex flex-column container position-relative">
                <div
                  className="row pt-3 dscsdc_fdvfv_sdcdsc"
                  ref={scrollContainerRef}
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth",
                  }}
                >
                  {bestSelling.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
                      style={{ flex: "0 0 auto" }}
                    >
                      <div className="card prio_card scdscsed_sdss">
                        <div className="card-image-wrapper position-relative best_saller_btn">
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                            Top
                          </button>
                          <div
                            className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                            onClick={() => toggleFavorite(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {wishlistItems[product.id] ? (
                              <GoHeartFill
                                className="heart-icon_ss"
                                size={18}
                              />
                            ) : (
                              <GoHeart className="heart-icon_ss" size={18} />
                            )}
                          </div>
                          <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                            {/* {(() => {
                              const imageToShow = product.image.find(
                                (img) => !img.endsWith(".mp4")
                              );
                              return imageToShow ? (
                                <img
                                  src={`https://dev.crystovajewels.com${imageToShow}`}
                                  className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                  alt="Product"
                                  onClick={() => handleProductClick(product.id)}
                                />
                              ) : (
                                <div className="text-center text-muted py-4">
                                  No image available
                                </div>
                              );
                            })()} */}
                            {product.image[0]?.endsWith(".mp4") ? (
                              <video
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                onClick={() => handleProductClick(product.id)}
                              />
                            ) : (
                              <img
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                alt="Product"
                                onClick={() => handleProductClick(product.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column main_cdsss">
                        <span className="mikdec_asdaa pt-3 text-truncate">
                          {product.productName}
                        </span>
                        <div className="d-flex align-items-center gap-3 pt-1">
                          <span className="mikdec_asdxsx">
                            ₹{product.salePrice?.$numberDecimal}
                          </span>
                          <span className="mikdec_axsx">
                            ₹{product.regularPrice?.$numberDecimal}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                          <button
                            className="more_btn_dsdd w-50"
                            onClick={() => handleProductClick(product.id)}
                          >
                            More Info
                          </button>
                          <button
                            className="d-flex align-items-center add-to-crd-dd gfbfgbvgfcbfb w-75 p-1 justify-content-center gap-3"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart <BiShoppingBag size={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {value === "3" && (
            <>
              <div
                className="d-flex align-items-center justify-content-end w-100 container pt-2"
                style={{ cursor: "pointer" }}
              >
                <div className="view_more_round"></div>
                <a
                  href="/products"
                  className="d-flex align-items-center gap-2 more_link"
                >
                  View All <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
              <div className="d-flex flex-column container position-relative">
                <div
                  className="row pt-3 dscsdc_fdvfv_sdcdsc"
                  ref={scrollContainerRef}
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth",
                  }}
                >
                  {topRated.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
                      style={{ flex: "0 0 auto" }}
                    >
                      <div className="card prio_card scdscsed_sdss">
                        {/* Image Wrapper with position-relative */}
                        <div className="card-image-wrapper position-relative">
                          {/* SALE Badge */}
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                            NEW
                          </button>
                          {/* Favorite Icon */}
                          <div
                            className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                            onClick={() => toggleFavorite(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {wishlistItems[product.id] ? (
                              <GoHeartFill
                                className="heart-icon_ss"
                                size={18}
                              />
                            ) : (
                              <GoHeart className="heart-icon_ss" size={18} />
                            )}
                          </div>
                          {/* Product Image */}
                          <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                            {/* {(() => {
                              const imageToShow = product.image.find(
                                (img) => !img.endsWith(".mp4")
                              );
                              return imageToShow ? (
                                <img
                                  src={`https://dev.crystovajewels.com${imageToShow}`}
                                  className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                  alt="Product"
                                  onClick={() => handleProductClick(product.id)}
                                />
                              ) : (
                                <div className="text-center text-muted py-4">
                                  No image available
                                </div>
                              );
                            })()} */}

                            {product.image[0]?.endsWith(".mp4") ? (
                              <video
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                onClick={() => handleProductClick(product.id)}
                              />
                            ) : (
                              <img
                                src={`https://dev.crystovajewels.com${product.image[0]}`}
                                className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                alt="Product"
                                onClick={() => handleProductClick(product.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Product Details */}
                      <div className="d-flex flex-column main_cdsss">
                        <span className="mikdec_asdaa pt-3 text-truncate">
                          {product.productName}
                        </span>
                        <div className="d-flex align-items-center gap-3 pt-1">
                          <span className="mikdec_asdxsx">
                            ₹{product.salePrice?.$numberDecimal}
                          </span>
                          <span className="mikdec_axsx">
                            ₹{product.regularPrice?.$numberDecimal}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                          <button
                            className="more_btn_dsdd w-50"
                            // onClick={() => navigate("/product-details")}
                            onClick={() => handleProductClick(product.id)}
                          >
                            More Info
                          </button>
                          <button
                            className="d-flex align-items-center add-to-crd-dd gfbfgbvgfcbfb w-75 p-1 justify-content-center gap-3"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart <BiShoppingBag size={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd MHK1">
          <OueColletion />
        </div>
        <div className="paddingdn d-flex flex-column align-items-center hdr_csd mt-md-1 ewcdsecesdfc">
          <span className="category_name best_sellig_sdcdc d-none">
            Jewelry for Occasions
          </span>
          <p className="category_txt best_sellig_sdcdc d-none">
            Celebrate Forever with a Sparkle
          </p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img best_sellig_sdcdc d-none"
          />
          <Gift />
        </div>

        <div className="container d-flex flex-column align-items-center asdxdsx_bases_sell mt-md-4">
          <span className="category_name">Signature Collections</span>
          <p className="category_txt">
            Elevate the Everyday in Diamond Elegance
          </p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="row d-flex align-items-stretch mt-3 w-100">
            {/* Left Image Section */}
            <div className="col-lg-6 ring_banner_szcdvc position-relative">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <img
                  src={best}
                  className="img-fluid w-100 h-100 object-fit-cover rounded"
                />
                {/* Add hover spots with tooltips */}

                <div
                  className="tooltip-spot spot-1"
                  onClick={() => handleTooltipClick("Earrings")}
                >
                  <div className="spot-marker"></div>
                </div>
                <div
                  className="tooltip-spot spot-2"
                  onClick={() => handleTooltipClick("Rings")}
                >
                  <div className="spot-marker"></div>
                </div>
                <div
                  className="tooltip-spot spot-3"
                  onClick={() => handleTooltipClick("Necklace")}
                >
                  <div className="spot-marker"></div>
                </div>
              </div>
            </div>

            {/* Right Product Cards Section */}
            <div
              className="col-lg-6 kdjvb_jicn"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="d-flex align-items-center justify-content-end w-100 container pb-3 pt-1 pe-2"
                style={{ cursor: "pointer" }}
              >
                <div className="view_more_round"></div>
                <a
                  href="/products"
                  className="d-flex align-items-center gap-2 more_link"
                >
                  View All <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
              <div className="h-100 d-flex flex-column justify-content-center domind_jew_sec">
                <div className="row g-3 h-100 sdcsdcsd_dfrtgdffcdszxc dscsdc_fdvfv_scdsc m-0 product-scroll-container">
                 
                  <div className="slider_ssss_fdcdf khdcj_csj p-0 mt-0">
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={2}
                      breakpoints={{
                        1200: { slidesPerView: 2 },
                        810: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        500: { slidesPerView: 2 },
                        // 0: { slidesPerView: 1 }, // Mobile - 1 card
                      }}
                      loop={true}
                      // autoplay={{
                      //   delay: 3000, // Change delay as needed (3000ms = 3s)
                      //   disableOnInteraction: false,
                      // }}
                      // modules={[Autoplay]}
                    >
                      {productsToDisplay
                        .slice(
                          currentIndex,
                          currentIndex + productsToDisplay?.length
                        )
                        .map((product) => (
                          <SwiperSlide key={product.id}>
                            <div
                              className="card prio_card scdscsed_sdss_jdfn fgfdddds_hvb"
                              onMouseEnter={() => setHoveredProduct(product.id)}
                              onMouseLeave={() => setHoveredProduct(null)}
                            >
                              <div className="card-image-wrapper position-relative">
                                <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                                  {filteredBestSellers.length > 0
                                    ? currentCategory.toUpperCase()
                                    : "Top"}
                                </button>
                                <div
                                  className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2 fhhdd"
                                  onClick={() => toggleFavorite(product.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {wishlistItems[product.id] ? (
                                    <GoHeartFill
                                      className="heart-icon_ss"
                                      size={18}
                                    />
                                  ) : (
                                    <GoHeart
                                      className="heart-icon_ss"
                                      size={18}
                                    />
                                  )}
                                </div>

                                <div
                                  className="card-body p-0 d-flex justify-content-center"
                                  style={{ height: "100%" }}
                                >
                                  {product.image[0]?.endsWith(".mp4") ? (
                                    <video
                                      src={`https://dev.crystovajewels.com${product.image[0]}`}
                                      className="p-1_proi img-fluid border-0"
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      controls={false}
                                      onClick={() =>
                                        handleProductClick(product.id)
                                      }
                                      style={{ height: "100%" }}
                                    />
                                  ) : (
                                    <img
                                      src={`https://dev.crystovajewels.com${product.image[0]}`}
                                      className="p-1_proi img-fluid border-0"
                                      alt="Product"
                                      onClick={() =>
                                        handleProductClick(product.id)
                                      }
                                      style={{ height: "100%" }}
                                    />
                                  )}
                                  {/* <img
                                    src={`https://dev.crystovajewels.com${product.image[0]}`}
                                    className="p-1_proi img-fluid border-0"
                                    alt="Product"
                                    style={{ height: "100%" }}
                                  /> */}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex flex-column main_cdsss">
                              <span className="mikdec_asdaa pt-3 wssddd text-truncate">
                                {product.productName}
                              </span>
                              <div className="d-flex align-items-center gap-3 pt-1">
                                <span className="mikdec_asdxsx">
                                  {" "}
                                  ₹{product.salePrice.$numberDecimal}
                                </span>
                                <span className="mikdec_axsx">
                                  ₹{product.regularPrice?.$numberDecimal}
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between gap-2 pt-2 hjghfd">
                                <button
                                  className="w-100 more_btn_dsdd w-50 rtrddg"
                                  onClick={() => handleProductClick(product.id)}
                                >
                                  More Info
                                </button>
                                <button
                                  className="w-100 d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3 add_avai"
                                  onClick={() => addToCart(product)}
                                >
                                  Add to Cart <BiShoppingBag size={25} />
                                </button>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="abc1 paddingdn d-flex flex-column align-items-center mt-md-4 stunning_price_fvf">
          <span className="category_name mt-0 mobile-hide">
          Affordable Luxury
          </span>
          <span className="category_name mt-0 mobile-show">
            Stunning Surprise
          </span>

          <p className="category_txt">Sophistication, smartly priced.</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          {/* <div className="pt-4 row position-relative w-100 container justify-content-between gap-3"> */}
          <div className="pt-3 container djb_dsjvn mx-2">
            <div className="row justify-content-evenly scc_gift_edit_sdsd gap-2">
              <div
                title="Explore products under ₹999"
                className="d-flex flex-column align-items-center gap-3 offer_prixx p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss"
                onClick={() => navigate("/products?price=999")}
              >
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>

              <div
                title="Explore products under ₹1,999"
                className="d-flex flex-column align-items-center gap-3 offer_prixx1 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss"
                onClick={() => navigate("/products?price=1999")}
              >
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹1,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
              <div
                title="Explore products under ₹2,999"
                className="d-flex flex-column align-items-center gap-3 offer_prixx2 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss"
                onClick={() => navigate("/products?price=2999")}
              >
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹2,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
              <div
                title="Explore products under ₹3,999"
                className="d-flex flex-column align-items-center gap-3 offer_prixx3 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss"
                onClick={() => navigate("/products?price=3999")}
              >
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹3,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <Occasion />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd sdcsdc_rtgrtfdxcasxNJK">
          <span className="category_name mt-2">Gifting Edition</span>
          <p className="category_txt">Elegant & Versatile Gifts</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="row pt-3 w-100 scc_gift_edit container">
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                className="img-sssssss"
                src={require("../../Images/Group 1597884624 (1).png")}
              />
              <div className="lionk_ss">
                <a>Gifts for Her</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                className="img-sssssss"
                src={require("../../Images/Group 1597884625 (1).png")}
              />
              <div className="lionk_ss">
                <a>Gifts for Him</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                className="img-sssssss"
                src={require("../../Images/Group 1597884626 (1).png")}
              />
              <div className="lionk_ss">
                <a>Gifts for Self</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                className="img-sssssss"
                src={require("../../Images/Group 1597884636.png")}
              />
              <div className="lionk_ss">
                <a>Wedding Bands</a>
              </div>
            </div>
          </div>
        </div>

        <div className="paddingdn d-flex flex-column align-items-center mt-md-4 szdxksdx_HGVBH">
          <span className="category_name mt-2">Discover Styles</span>
          <p className="category_txt">New Designs, Same Timeless Elegance</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
        </div>
        <div>
          <RingSlider />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center mt-2 mt-md-4 asxs_sdxszx dxfcvdfsCV_ss">
          <span className="category_name ">New Arrivals</span>
          <p className="category_txt">New Creations, Forever Elegance</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
        </div>


        <Ring1 />
        

        <div className="heder_sec_main d-flex flex-column align-items-center dscdsc_inst">
          <span className="category_name">Instructions</span>
          <p className="category_txt">Store it Soft, Shine it Often</p>
          <img
            src={require("../../Images/Groupimg.png")}
            alt="Decorative"
            className="home_tag_img"
          />

          <Instruction />
        </div>

        <div className="testimonial-container d-flex align-items-center client_test cline_ytsdhcsd">
          <div
            className="heder_sec_main d-flex flex-column align-items-center mt-md-4 Client_xcTestimonial"
            style={{ width: "100vw" }}
          >
            <span className="category_name ">Client Testimonial</span>
            <p className="category_txt">What our Client’s say about us</p>
            <img
              src={require("../../Images/Groupimg.png")}
              alt="Decorative"
              className="home_tag_img"
            />

            <Swiper
              grabCursor={true}
              loop={true}
              slidesPerView={slidesPerView}
              slidesPerGroup={1}
              loopedSlides={testimonials.length}
              modules={[Pagination]}
              // autoplay={{ delay: 3000, disableOnInteraction: false }}
              observer={true} // Observe changes
              observeParents={true} // Observe parent element changes
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="swiper_testimonial container"
            >
              {[...testimonials, ...testimonials, ...testimonials].map(
                (item, index) => (
                  <SwiperSlide className="slide_ssssss_sss" key={index}>
                    <div
                      className={`card testimonial-card${
                        index % 3 === 0 ? "" : index % 3 === 1 ? "1" : "2"
                      } mt-5`}
                    >
                      <div className="card-body pt-4">
                        <h5 className="card-title text-center emi_ffcc">
                          Emily Carol
                        </h5>
                        <p className="card-text sdcdscsd text-center">
                          I wanted a custom bracelet to honor my daughter’s
                          birth, and the designers exceeded my expectations.
                        </p>
                        <p className="text-center sdcdscsd pb-0 mb-1">Client</p>
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
        
        </div>
        <div className="pb-5"></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
