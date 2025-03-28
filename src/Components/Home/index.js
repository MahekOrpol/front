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

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };

  // Function to add an item to the cart
  const addToCart = async (product) => {
    try {
      const userId = localStorage.getItem("user_Id");
      const productSize = Array.isArray(product?.productSize)
        ? product.productSize.join(",")
        : product?.productSize || "";
      // Define the payload for the API request
      const payload = {
        userId: userId,
        productId: product?.id,
        productPrice: product.salePrice?.$numberDecimal,
        quantity: product?.quantity || 1,
        productSize: productSize,
        discount: product?.discount?.$numberDecimal || 0,
      };

      // Make the API request
      const response = await axios.post(
        "http://localhost:3000/api/v1/order-details/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("Product added to cart successfully:", response.data);
        openCart(); // Open cart after successful addition
      } else {
        console.error("Failed to add product to cart:", response);
      }
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
    document.body.classList.remove("no-scroll");
  };

  const addWishlist = async (productId) => {
    try {
      const userId = localStorage.get("userId");
      const response = await axios.post(
        "https://crystova.cloudbusiness.cloud/api/v1/wishlist/create",
        {
          userId,
          productId,
        }
      );
      console.log("Wishlist Response:", response.data);
      setIsFavorite(response.data);
    } catch (error) {
      console.error(
        "Error adding to wishlist:",
        error.response?.data || error.message
      );
    }
  };

  const deleteWishlist = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.delete(
        `https://crystova.cloudbusiness.cloud/api/v1/wishlist/${productId}?userId=${userId}`
      );
      console.log("Wishlist Delete Response:", response.data);
      setIsFavorite(response.data);
    } catch (error) {
      console.error(
        "Error deleting from wishlist:",
        error.response?.data || error.message
      );
    }
  };

  const getTopRated = async () => {
    const res = await axios(
      "https://crystova.cloudbusiness.cloud/api/v1/product/getTopRated"
    );
    setTopRated(res.data);
  };
  const getBestSelling = async () => {
    const res = await axios(
      "https://crystova.cloudbusiness.cloud/api/v1/product/getBestSelling"
    );
    setBestSelling(res.data);
  };
  const getOnSale = async () => {
    const res = await axios(
      "https://crystova.cloudbusiness.cloud/api/v1/product/getOnSale"
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

  const toggleFavorite = (id) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite state for the specific card
    }));
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
      <CartPopup isOpen={isCartOpen} closeCart={closeCart} />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <Header openCart={openCart} />

        <div>
          {/* <img src={banner} className="img_fluid1_banner hoe_page_main_bvannei" /> */}
          {/* <div className="hoe_page_main_bvannei"></div> */}
          <JewelrySale />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd container p-0 mt-sm-3">
          <span className="category_name mt-2">Categories</span>
          <p className="category_txt">Radiance Fits for Everyone</p>
          <img
            src={require("../../Images/Groupimg.png")}
            className="home_tag_img"
          />

          <div className="container p-0">
            <Swiper
              spaceBetween={10}
              loop={true}
              // autoplay={{ delay: 2000, disableOnInteraction: false }}
              // modules={[ Autoplay]}
              breakpoints={{
                0: { slidesPerView: 4 },
                480: { slidesPerView: 4 },
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
                  onClick={() => {
                    handleCategoryClick();
                  }}
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
                          {isFavorite[product.id] ? (
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart
                              className="heart-icon_ss"
                              size={18}
                              onClick={() => addWishlist(product._id)} // Use product._id from the backend
                            />
                          )}
                        </div>

                        {/* Product Image */}
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`https://crystova.cloudbusiness.cloud${product.image[0]}`}
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
                          {product.salePrice?.$numberDecimal}
                        </span>
                        <span className="mikdec_axsx">
                          {product.regularPrice?.$numberDecimal}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                        <button
                          className="more_btn_dsdd w-50"
                          onClick={() => navigate("/product-details")}
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
                      <div className="card-image-wrapper position-relative">
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                          SALE
                        </button>

                        <div
                          className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                          onClick={() => toggleFavorite(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {isFavorite[product.id] ? (
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>

                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`https://crystova.cloudbusiness.cloud${product.image[0]}`}
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
                          {product.salePrice?.$numberDecimal}
                        </span>
                        <span className="mikdec_axsx">
                          {product.regularPrice?.$numberDecimal}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                        <button
                          className="more_btn_dsdd w-50"
                          onClick={() => navigate("/products")}
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
                          SALE
                        </button>

                        {/* Favorite Icon */}
                        <div
                          className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                          onClick={() => toggleFavorite(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {isFavorite[product.id] ? (
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>

                        {/* Product Image */}
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          <img
                            src={`https://crystova.cloudbusiness.cloud${product.image[0]}`}
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
                          {product.salePrice?.$numberDecimal}
                        </span>
                        <span className="mikdec_axsx">
                          {product.regularPrice?.$numberDecimal}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                        <button
                          className="more_btn_dsdd w-50"
                          onClick={() => navigate("/products")}
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
          {/* <div className="container d-flex gap-3 justify-content-between position-relative pt-4 w-100">
          <div className="grp_img position-relative box-trens-1 w-25">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image 98.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>

            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-1 w-25">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/tre-2.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-1 w-25">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image 100.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>

          <div className="grp_img position-relative box-trens-1 w-25">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/trending-5.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
        </div> */}
          {/* <div className="paddingdn d-flex flex-column container">
          <div className="row pt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
                // onMouseEnter={() => setHoveredProduct(product.id)}
                // onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="card prio_card scdscsed_sdss">
                  <div className="card-title">
                    <div>
                      <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3">NEW</button>
                      <div
                        className="snuf_dfv text-overlay position-absolute top-0 p-2 text-white text-center d-flex flex-column me-3 mt-3"
                        onClick={() => toggleFavorite(product.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {isFavorite[product.id] ? (
                          <GoHeartFill className="heart-icon_ss" size={18} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={18} />
                        )}
                      </div>
                    </div>
                    <div className="card-body d-flex justify-content-center ">
                      <img
                        src={product.imgSrc}
                        className="p-1_proi"
                        alt="Product"
                      />
                    
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column main_cdsss">
                  <span className="mikdec_asdaa pt-3">{product.name}</span>
                  <div className="d-flex align-items-center gap-3 pt-1">
                    <span className="mikdec_asdxsx">{product.price}</span>
                    <span className="mikdec_axsx">{product.cutPrice}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                    <button
                      className="more_btn_dsdd w-50"
                      onClick={() => navigate("/products")}
                    >
                      More Info
                    </button>
                    <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                      Add to Cart <BiShoppingBag size={25} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hdr_csd">
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
            <div className="row justify-content-between scc_gift_edit_sdsd gap-2">
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

          {/* <div className="rings-container home_ring_1">
            <div className="rings-row">
              {getVisibleRings().map((ring, index) => (
                <div
                  key={ring.id}
                  className={`ring-item ${index === 1 ? "large" : "small"}`}
                >
                  <div className="ring-shadow">
                    <img
                      src={ring.image}
                      alt={`Diamond Ring ${ring.id}`}
                      className="ring-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rings-container home_ring_3">
            <div className="rings-row">
              {getVisibleRing2().map((ring, index) => (
                <div key={ring.id} className={`ring-item large`}>
                  <div className="ring-shadow">
                    <img
                      src={ring.image}
                      alt={`Diamond Ring ${ring.id}`}
                      className="ring-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rings-container home_ring_2">
            <div className="rings-row">
              {getVisibleRings1().map((ring, index) => (
                <div
                  key={ring.id}
                  className={`ring-item ${
                    index === 2
                      ? "large"
                      : index === 1 || index === 3
                      ? "medium"
                      : "small"
                  }`}
                >
                  <div className="ring-shadow">
                    <img
                      src={ring.image}
                      alt={`Diamond Ring ${ring.id}`}
                      className="ring-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="carousel-controls d-flex justify-content-center gap-5"
            style={{ cursor: "pointer" }}
          >
            <div onClick={prevSlide}>
              <FaAngleLeft size={25} />
            </div>
            <span className="soli_txt_sccs">Solitare Rings</span>
            <div onClick={nextSlide}>
              <FaAngleRight size={25} />
            </div>
          </div> */}

          <div className="ring-slider-container " style={{width:"100%"}}>
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              slidesPerView={20}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              loopedSlides={ringData.length}
              watchSlidesProgress={true}
              speed={600}
              initialSlide={2}
              slideToClickedSlide={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                525: { slidesPerView: 3, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 0 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1700: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="swiper"
            >
              {ringData.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <img src={item.image} alt={item.title} />
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </Swiper>

            <img src={bgImage} alt="" className="bg" />
            <img src={bgImage2} alt="" className="bg2" />
          </div>
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

        {/* <div className="paddingdn d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Gifting Guide</span>
        <p className="category_txt">Jewelry makes the perfect gift</p>
        <img src={require("../../Images/Groupimg.png")} className="home_tag_img"/>

        <div className="pt-5 d-flex position-relative w-100 justify-content-center">
          <div className=" position-relative box-trens-2 w-25 ">
            <div className="d-flex justify-content-center align-items-center h-100 first_bnnrrr">
              <img
                src={require("../../Images/earings.png")}
                alt="Dainty Earrings"
                className="img-fluid fir_bnr_rd"
              />
            </div>

            <div className="text-overlay position-absolute top-50 translate-middle_frst text-white text-center d-flex flex-column gap-1">
              <span className="bird_ddc">Birthday Gifts</span>
              <a href="#" className="shop_now_lnk" style={{ color: "#fff" }}>
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>

          <div className="w-25">
            <div className=" position-relative box-trens-2 sec_bbbb">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/birth.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec1 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk " style={{ color: "#fff" }}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
            <div className=" position-relative box-trens-2 sec_bbbb1">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/bar.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec2 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk" style={{ color: "#fff" }}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
          </div>

          <div className="w-25">
            <div className=" position-relative box-trens-2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/chn.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec3 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a
                  href="#"
                  className="shop_now_lnk_lst "
                  style={{ color: "#fff" }}
                >
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
            <div className=" position-relative box-trens-2 sec_bbbb2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/ring.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec3 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a
                  href="#"
                  className="shop_now_lnk_lst "
                  style={{ color: "#fff" }}
                >
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
          </div>

          <div className=" position-relative box-trens-2 w-25">
            <div className="d-flex justify-content-center align-items-center last_bnnn">
              <img
                src={require("../../Images/diam.png")}
                alt="Dainty Earrings"
                className="img-fluid fir_bnr_rd"
              />
            </div>
            <div className="text-overlay position-absolute top-50 translate-middle_sec4 text-white text-center d-flex flex-column gap-1">
              <span className="bird_ddc">Birthday Gifts</span>
              <a
                href="#"
                className="shop_now_lnk_lst "
                style={{ color: "#fff" }}
              >
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
        </div>
      </div> */}

        {/* <div className="paddingdn d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Client Testimonial</span>
        <p className="category_txt">What our Client’s say about us</p>
        <img src={require("../../Images/Groupimg.png")} className="home_tag_img"/>

        <div className="pt-5 container d-flex position-relative w-100 justify-content-between gap-3">
          <div className="card testimonial-card mt-5">
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
          <div className="card  testimonial-card1 mt-5">
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
          <div className="card  testimonial-card2 mt-5">
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
        {/* <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div class="card w-25 dfrderf_mhk">
            <div class="card-body pt-5">
              <h5 class="card-title scerff_sdcds d-flex justify-content-center">Emily Carol</h5>
              <p class="card-text szdcsdz_txtx">
              I wanted a custom bracelet to honor my daughter’s birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought 
              it to life. It’s a masterpiece I’ll cherish forever.
              </p>
              
              <p className="cl_sdcsd">Client</p>
             <div className="d-flex justify-content-center align-items-center">
             <FaStar color="#DBB439"/>
             <FaStar color="#DBB439"/>
             <FaStar color="#DBB439"/>
             <CiStar />
             <CiStar />
             </div>
            </div>
          </div>
          
          
        </div> 
      </div> */}

        <div className="testimonial-container d-flex align-items-center">
          <button
            className="nav-button left"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaAngleLeft />
          </button>

          <div
            className="heder_sec_main d-flex flex-column align-items-center hdr_csd"
            style={{ paddingTop: "4rem" }}
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
          <button
            className="nav-button right"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaAngleRight />
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
