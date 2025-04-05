import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import $ from "jquery";
import { FaArrowRight, FaChevronRight, FaStar } from "react-icons/fa6";
import logobnddd from "../../Images/diamondring.png";
import vector from "../../Images/Vector.png";
import { PiHeartThin } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Header from "../../Pages/Header";
import banner from "../../Images/Frame 200.png";
import { Swiper, SwiperSlide } from "swiper/react";
import best from "../../Images/Mask group (9).png";

import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
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
import Ring from "../../Pages/Demo/ring";
import OueColletion from "./ourColletion";
import RingSlider from "./ring";
import DimondJewellery from "./Dimond Jewellery/dimond";
import Occasion from "./Occasion";

const images = [
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),

  require("../../Images/ring222.png"),
];

const ringData = [
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Classic Ring",
    description: "Timeless elegance in its purest form",
  },
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Nature Ring",
    description: "Inspired by natural beauty",
  },
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Hidden Halo",
    description: "Intriguing brilliance from a concealed halo",
  },
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Solitaire",
    description: "Simple sophistication that speaks volumes",
  },
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Emerald Ring",
    description: "Modern elegance with vintage appeal",
  },
  {
    image: require("../../Images/Frame 197 (1).png"),
    title: "Emerald Ring",
    description: "Modern elegance with vintage appeal",
  },
];

const bgImage = require("../../Images/Frame 197.png");
const bgImage2 = require("../../Images/Frame 197.png");

const diamondRings = [
  {
    id: 1,
    image: require("../../Images/2 (4) (5).png"),
    size: "small",
  },
  {
    id: 2,
    image: require("../../Images/1 (5) (2).png"),
    size: "medium",
  },
  {
    id: 3,
    image: require("../../Images/111111.png"),
    size: "large",
    number: "4",
  },
  {
    id: 4,
    image: require("../../Images/1 (5) (2).png"),
    size: "medium",
  },
  {
    id: 5,
    image: require("../../Images/2 (4) (5).png"),
    size: "small",
  },
];

const categories = [
  { img: require("../../Images/Group 1597884634 (1).png"), label: "Pendant" },
  { img: require("../../Images/Group 1597884629 (1).png"), label: "Bracelet" },
  { img: require("../../Images/Group 1597884630.png"), label: "Earrings" },
  { img: require("../../Images/Group 1597884631.png"), label: "Rings" },
  { img: require("../../Images/Group 1597884632.png"), label: "Pendant" },
  { img: require("../../Images/Group 1597884632.png"), label: "Pendant" },
  { img: require("../../Images/Group 1597884632.png"), label: "Pendant" },
  { img: require("../../Images/Group 1597884632.png"), label: "Pendant" },
];

const Home = () => {
  const [isFavorite, setIsFavorite] = useState({});
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Store Swiper instance
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const userId = localStorage.getItem("user_Id");
  const [wishlistItems, setWishlistItems] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  // const [categories, setCategories] = useState();

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
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
        "http://localhost:3000/api/v1/order-details/create",
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
      setToastMessage("Item added to cart successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
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
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false); // Reset toast state when closing
    document.body.classList.remove("no-scroll");
  };

  const getTopRated = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/product/getTopRated"
    );
    setTopRated(res.data);
    console.log("res.data", res.data);
  };
  const getBestSelling = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/product/getBestSelling"
    );
    setBestSelling(res.data);
  };
  const getOnSale = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/product/getOnSale"
    );
    setOnSale(res.data);
  };

  useEffect(() => {
    getTopRated();
    getBestSelling();
    getOnSale();
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

  const toggleFavorite = async (productId) => {
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

        const res = await axios.delete(
          `http://localhost:3000/api/v1/wishlist/delete/${wishlistItemId}`
        );
        toast.success(res.data.message || "Removed from wishlist!");
      } else {
        // Add to wishlist
        const response = await axios.post(
          `http://localhost:3000/api/v1/wishlist/create`,
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
          `http://localhost:3000/api/v1/wishlist/${userId}`
        );
        const wishlistData = response.data.data || [];

        console.log("Fetched Wishlist Data:", wishlistData);

        const wishlistMap = {};
        wishlistData.forEach((item) => {
          let productId = item.productId._id || item.productId.id; // Extract _id if present
          console.log(
            "Processed Product ID:",
            productId,
            "Type:",
            typeof productId
          );

          if (typeof productId === "string" || typeof productId === "number") {
            wishlistMap[productId] = item.id;
          } else {
            console.error("Invalid productId format:", item.productId);
          }
        });

        setWishlistItems(wishlistMap);
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

  const [currentIndex, setCurrentIndex] = useState(0); // ID 3 is at index 2

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % diamondRings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? diamondRings.length - 1 : prevIndex - 1
    );
  };

  const getVisibleRings = () => {
    const total = diamondRings.length;
    return [
      diamondRings[(currentIndex - 1 + total) % total],
      diamondRings[currentIndex],
      diamondRings[(currentIndex + 1) % total],
    ];
  };
  const getVisibleRings1 = () => {
    const total = diamondRings.length;
    return [
      diamondRings[(currentIndex - 2 + total) % total],
      diamondRings[(currentIndex - 1 + total) % total],
      diamondRings[currentIndex],
      diamondRings[(currentIndex + 1) % total],
      diamondRings[(currentIndex + 2) % total],
    ];
  };

  const getVisibleRing2 = () => {
    return [diamondRings[currentIndex]]; // Return a single ring inside an array
  };

  // const toggleFavorite = (id) => {
  //   setIsFavorite((prev) => ({
  //     ...prev,
  //     [id]: !prev[id], // Toggle the favorite state for the specific card
  //   }));
  // };

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
        <Header openCart={openCart} />

        <div>
          {/* <img src={banner} className="img_fluid1_banner hoe_page_main_bvannei" /> */}
          {/* <div className="hoe_page_main_bvannei"></div> */}
          <JewelrySale />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd p-0 mt-sm-3">
          <span className="category_name mt-2">Categories</span>
          <p className="category_txt">Radiance Fits for Everyone</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          <div className=" p-0">
            <Swiper
              spaceBetween={10}
              loop={true}
              // autoplay={{ delay: 2000, disableOnInteraction: false }}
              // modules={[ Autoplay]}
              breakpoints={{
                0: { slidesPerView: 4 },
                480: { slidesPerView: 5 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1200: { slidesPerView: 6 },
              }}
              className="mySwiper xfvdfvdfvc "
            >
              {categories.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="slide-item"
                  onClick={() => handleCategoryClick(item.label)}
                >
                  <div className="d-flex flex-column align-items-center fvfvfc_Zdcdsc">
                    <img
                      src={item.img}
                      className="home-img home_img_ssssss"
                      alt={item.label}
                    />
                    <span className="category-label">{item.label}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="paddingdn hdr_csd sdcxsdcx_Sdcxszdcx">
          <div className="scrolling-wrapper">
            <div className="scroll-content">
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
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
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewellery
                </span>
              </div>
              <div className="scroll-item">
                <img src={vector} alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd mt-3">
        <span className="category_name mt-2">Diamond Jewelry</span>
          <p className="category_txt">
          Minimal. Modern. Mesmerizing
          </p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <DimondJewellery />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd hnbgygjhh">
          <span className="category_name mt-2">Trending Collection</span>
          <p className="category_txt">
            The Latest looks, Crafted to Perfection
          </p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="w-auto mt-3">
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
                  <Tab className="xjc_dbv" label="On Sale" value="1" />
                  <Tab className="xjc_dbv" label="Best Seller" value="2" />
                  <Tab className="xjc_dbv" label="Top Rated" value="3" />
                </Tabs>
              </Box>
            </TabContext>
          </div>

          {value === "1" && (
            <div className="d-flex flex-column container">
              <div className="row pt-5 dscsdc_fdvfv_sdcdsc">
                {onSale.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
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
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>

                        {/* Product Image */}
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`http://localhost:3000${product.image[0]}`}
                            className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                            alt="Product"
                          />
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
          )}

          {value === "2" && (
            <div className="d-flex flex-column container">
              <div className="row pt-5 dscsdc_fdvfv_sdcdsc">
                {bestSelling.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
                  >
                    <div className="card prio_card scdscsed_sdss">
                      <div className="card-image-wrapper position-relative best_saller_btn">
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                          BEST SALLER
                        </button>

                        <div
                          className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                          onClick={() => toggleFavorite(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {wishlistItems[product.id] ? (
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>

                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`http://localhost:3000${product.image[0]}`}
                            className="p-1_proi img-fluid"
                            alt="Product"
                          />
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
          )}

          {value === "3" && (
            <div className="d-flex flex-column container">
              <div className="row pt-5 dscsdc_fdvfv_sdcdsc">
                {topRated.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
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
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>

                        {/* Product Image */}
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`http://localhost:3000${product.image[0]}`}
                            className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                            alt="Product"
                          />
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
          )}
         
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd">
          <OueColletion />
        </div>

        <div className="container d-flex flex-column align-items-center asdxdsx_bases_sell mt-5">
        <span className="category_name">Bestselling Jewelery</span>
          <p className="category_txt">
          Elevate the Everyday in Diamond Elegance</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="row d-flex align-items-stretch mt-5 ">
            {/* Left Image Section */}
            <div className="col-lg-6 ring_banner_szcdvc position-relative">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <img
                  src={best}
                  className="img-fluid w-100 h-100 object-fit-cover rounded"
                />
              </div>
            </div>
              <div className="tooltip_home">
                <span className="tooltip_home_rrr">
                </span>
              </div>
              
              <div className="tooltip_home_sec">
                <span className="tooltip_home_rrr_sec">
                </span>
              </div>

            {/* Right Product Cards Section */}
            <div className="col-lg-6">
              <div className="h-100 d-flex flex-column justify-content-between ">
                <div className="row g-3 h-100 sdcsdcsd_dfrtgdffcdszxc">
                  {bestSelling.slice(0, 2).map((product) => (
                  <div
                  key={product.id}
                  className="col-lg-12 col-6 asxasx_cards dcvdfxC_dfrvdfvf1 ring-collection-csssss h-100"
                >
                  <div className="h-100 d-flex flex-column">
                    <div className="card prio_card scdscsed_sdss dimond_section dimof_sss sdcsdc_rinf_dimnsss">
                      <div className="card-image-wrapper position-relative best_saller_btn">
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                          BEST SALLER
                        </button>
                
                        <div
                          className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                          onClick={() => toggleFavorite(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {wishlistItems[product.id] ? (
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>
                
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`http://localhost:3000${product.image[0]}`}
                            className="p-1_proi img-fluid BEST_SELLING_IMSESSSS"
                            alt="Product"
                          />
                        </div>
                      </div>
                    </div>
                
                    {/* OUTSIDE the card but part of same block */}
                    <div className="d-flex flex-column main_cdsss px-3 pt-2 bg-white rounded-bottom ring_secededfcvd">
                      <span className="mikdec_asdaa text-truncate">
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
                </div>
                
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd mt-3">
          <span className="category_name mt-0 mobile-hide">
            Celebrate love with our Collection
          </span>
          <span className="category_name mt-0 mobile-show">
            Stunning Surprise
          </span>

          <p className="category_txt">Perfect Presents for Every Occasion.</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          {/* <div className="pt-4 row position-relative w-100 container justify-content-between gap-3"> */}
          <div className="pt-4 container djb_dsjvn mx-2">
            <div className="row justify-content-evenly scc_gift_edit_sdsd gap-2">
              <div className="d-flex flex-column align-items-center gap-3  offer_prixx p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss">
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹1,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-3  offer_prixx1 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss">
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹1,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-3  offer_prixx2 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss">
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹1,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-3  offer_prixx3 p-5 col-12 col-sm-12 col-md-6 col-lg-3 sdcijdic_ass_sssssswx_ss">
                <span className="under_cimn">Under</span>
                <span className="under_cimn">₹1,999</span>
                <span className="next_arrow p-2">
                  <GrNext size={28} />
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Occasion />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd">
          <span className="category_name mt-2">Gifting Edition</span>
          <p className="category_txt">Elegant & Versatile Gifts</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />
          <div className="row pt-4 w-100 scc_gift_edit container">
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

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd ">
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

        <div className="paddingdn d-flex flex-column align-items-center mt-2 asxs_sdxszx dxfcvdfsCV_ss">
          <span className="category_name mt-0">New Arrivals</span>
          <p className="category_txt">New Designs, Same Timeless Elegance</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          <div className="pt-4 row position-relative w-100 justify-content-between xcdf_sdcsd ">
            <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12 sdcs_ASxsax_dfrvdxf">
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <video
                  src={ringVideo1}
                  className=" bg-white video_new_arrr"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
            <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12 sdcs_ASxsax_dfrvdxf">
              <div className="d-flex justify-content-center align-items-center h-100">
                <video
                  src={ringVideo2}
                  className=" bg-white video_new_arrr"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
            <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12 sdcs_ASxsax_dfrvdxf">
              <div className="d-flex justify-content-center align-items-center h-100">
                <video
                  src={ringVideo3}
                  className=" bg-white video_new_arrr"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>

            <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12 sdcs_ASxsax_dfrvdxf">
              <div className="d-flex justify-content-center align-items-center h-100">
                <video
                  src={ringVideo4}
                  className=" bg-white video_new_arrr"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
            <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12 sdcs_ASxsax_dfrvdxf">
              <div className="d-flex justify-content-center align-items-center h-100">
                <video
                  src={ringVideo5}
                  className=" bg-white video_new_arrr"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          </div>
        </div>

       
        <div
          className="heder_sec_main d-flex flex-column align-items-center mt-5"
        >
          <span className="category_name mt-2">Instructions</span>
          {/* <p className="category_txt">What our Client’s say about us</p> */}
          <img src={require("../../Images/Groupimg.png")} alt="Decorative" />

          <Instruction />
        </div>
        
        <div className="testimonial-container d-flex align-items-center">
         

          <div
            className="heder_sec_main d-flex flex-column align-items-center "
            // style={{ paddingTop: "3rem" }}
          >
            <span className="category_name mt-2">Client Testimonial</span>
            <p className="category_txt">What our Client’s say about us</p>
            <img src={require("../../Images/Groupimg.png")} alt="Decorative" />

            <Swiper
              grabCursor={true}
              loop={true}
              slidesPerView={slidesPerView}
              slidesPerGroup={1}
              loopedSlides={testimonials.length}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                      <div className="card-body pt-5">
                        <h5 className="card-title text-center emi_ffcc">
                          Emily Carol
                        </h5>
                        <p className="card-text sdcdscsd text-center">
                          I wanted a custom bracelet to honor my daughter’s
                          birth, and the designers exceeded my expectations.
                          They listened to every detail I envisioned and brought
                          it to life. It’s a masterpiece I’ll cherish forever.
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
        <div className="pb-5"></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
