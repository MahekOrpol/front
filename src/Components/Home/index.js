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


const images = [
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
];

const products = [
  {
    id: 1,
    imgSrc: require("../../Images/image 98.png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 2,
    imgSrc: require("../../Images/tre-2.png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 3,
    imgSrc: require("../../Images/image 100 (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 4,
    imgSrc: require("../../Images/latsss.png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
];

const products1 = [
  {
    id: 1,
    imgSrc: require("../../Images/image 98.png"),
    name: "Two Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 2,
    imgSrc: require("../../Images/tre-2.png"),
    name: "Two Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 3,
    imgSrc: require("../../Images/image 100 (1).png"),
    name: "Two Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 4,
    imgSrc: require("../../Images/latsss.png"),
    name: "Two Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
];

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

const Home = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleAddToCart = () => {
    console.log("Button clicked!"); // Debugging
    setIsCartOpen(true);
    console.log("Cart state:", isCartOpen); // Check if the state is changing
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isCartOpen]);

  const [isFavorite, setIsFavorite] = useState({});
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Store Swiper instance
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnSale] = useState([]);

  const getTopRated = async () => {
    const res = await axios("http://localhost:3000/api/v1/product/getTopRated");
    setTopRated(res.data);
  };
  const getBestSelling = async () => {
    const res = await axios(
      "http://localhost:3000/api/v1/product/getBestSelling"
    );
    setBestSelling(res.data);
  };
  const getOnSale = async () => {
    const res = await axios("http://localhost:3000/api/v1/product/getOnSale");
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


  const toggleFavorite = (id) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite state for the specific card
    }));
  };

  return (
    <>  
     <CartPopup isOpen={isCartOpen} closeCart={closeCart}/>
    <div className={`${isCartOpen ? "blurred" : ""}`} onClick={(e) => e.stopPropagation()}>
      <Header />

      <div>
        {/* <img src={banner} className="img_fluid1_banner hoe_page_main_bvannei" /> */}
        <div className="hoe_page_main_bvannei"></div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd container">
        <span className="category_name">Categories</span>
        <p className="category_txt">Radiance Fits for Everyone</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="row pt-5">
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884634 (1).png")} />
            <span>Pendant</span>
          </div>
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884629 (1).png")} />
            <span>Bracelet</span>
          </div>
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884630.png")} />
            <span>Earrings</span>
          </div>
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884631.png")} />
            <span>Rings</span>
          </div>
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884632.png")} />
            <span>Pendant</span>
          </div>
          <div className="col-md-2 col-sm-3 col-6 d-flex flex-column align-items-center">
            <img src={require("../../Images/Group 1597884632.png")} />
            <span>Pendant</span>
          </div>
        </div>
        {/* <div className="pt-5 d-flex position-relative">
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image.png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Dainty Earrings</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image (1).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Radiant Rings</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image (2).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Festive Pendants</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/Mask group.png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Diamond Bracelet</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/Mask group (1).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Men’s Ring</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="hdr_csd1 position-relative">
        <div className="position-relative">
          <img
            src={require("../../Images/Rectangle 105464.png")}
            className="ractangle_box pt-5"
          />
          <div className="bn_sdc w-25 container">
            <span className="banner_txxts_hom">
              Buy the Ring of <br />
              your Choice
            </span>
            <hr className="hr_bnr w-25" />
            <span className="hszhh">
              Spark your imagination with recently <br /> purchased engagement
              rings.
            </span>
            <button className="text-white explore_btn d-flex align-items-center gap-3 mt-3">
              Explore Rings <FaArrowRight />
            </button>

            <div className=" bn_sdc1">
              <img src={logobnddd} />
            </div>

            <div className="class-txt-sss">CLASSIC SILVER</div>
            <div className="class-txt-sss1">PIECES</div>
          </div>
        </div>
      </div> */}

      <div className="hdr_csd">
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
            <div className="txt_frss d-flex flex-column gap-3">
              <span>Upto 25% Off on All Jewelry Favorites</span>
              <span>Limited Time!</span>
            </div>
            <span className="txt_par">
              Diamonds come in a variety of shapes, each offering unique beauty
              and appeal.
              <br /> Here’s a guide to different shapes of diamond rings
            </span>
            <button
              className="w-25 spg_nb_sle"
              style={{ whiteSpace: "nowrap" }}
            >
              Shop Now
            </button>
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

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd pb-4">
        <span className="category_name">Trending Collection</span>
        <p className="category_txt">The Latest looks, Crafted to Perfection</p>
        <img src={require("../../Images/Groupimg.png")} />
        <div className="w-auto mt-3">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTabs-list": {
                    justifyContent: "space-between",
                  },
                }}
              >
                <Tab label="On Sale" value="1" />
                <Tab label="Best Seller" value="2" />
                <Tab label="Top Rated" value="3" />
              </Tabs>
            </Box>
          </TabContext>
        </div>
        {/* {value === "1" && (
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {onSale.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
                >
                  <div className="card prio_card scdscsed_sdss">
                    <div className="card-title">
                      <div>
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3">
                          SALE
                        </button>
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
                      <div className="card-body d-flex justify-content-center">
                        <img
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
          </div>
        )} */}
        {value === "1" && (
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {onSale.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
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
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi img-fluid"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
                    <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                      <button
                        className="more_btn_dsdd w-50"
                        onClick={() => navigate("/products")}
                      >
                        More Info
                      </button>
                      <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3" onClick={handleAddToCart}>
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
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {bestSelling.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
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
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi img-fluid"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
                    <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                      <button
                        className="more_btn_dsdd w-50"
                        onClick={() => navigate("/products")}
                      >
                        More Info
                      </button>
                      <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3" onClick={handleAddToCart}>
                        Add to Cart <BiShoppingBag size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {value === "2" && (
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {bestSelling.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
                >
                  <div className="card prio_card scdscsed_sdss">
                    <div className="card-title">
                      <div>
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3">
                          NEW
                        </button>
<<<<<<< deep
                        <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3" onClick={handleAddToCart}>
                          Add to Cart <BiShoppingBag size={25} />
=======
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
                      <div className="card-body d-flex justify-content-center">
                        <img
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
          </div>
        )} */}

        {/* {value === "3" && (
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {topRated.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
                >
                  <div className="card prio_card scdscsed_sdss">
                    <div className="card-title">
                      <div>
                        <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3">
                          NEW
>>>>>>> master
                        </button>
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
                      <div className="card-body d-flex justify-content-center">
                        <img
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi "
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
          </div>
        )} */}

        {value === "3" && (
          <div className="heder_sec_main d-flex flex-column container">
            <div className="row pt-5">
              {topRated.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
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
                          src={`http://localhost:3000${product.image[0]}`}
                          className="p-1_proi img-fluid"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">
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
                    <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                      <button
                        className="more_btn_dsdd w-50"
                        onClick={() => navigate("/products")}
                      >
                        More Info
                      </button>
                      <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3" onClick={handleAddToCart}>
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
        {/* <div className="heder_sec_main d-flex flex-column container">
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

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">
          Celebrate love with our Collection
        </span>
        <p className="category_txt">Perfect Presents for Every Occasion.</p>
        <img src={require("../../Images/Groupimg.png")} />

        {/* <div className="pt-4 row position-relative w-100 container justify-content-between gap-3"> */}
        <div className="pt-4 container">
          <div className="row justify-content-center justify-content-md-between">
            <div className="d-flex flex-column align-items-center gap-3 offer_prixx p-5 col-12 col-sm-12 col-md-6 col-lg-3">
              <span className="under_cimn">Under</span>
              <span className="under_cimn">₹1,999</span>
              <span className="next_arrow p-2">
                <GrNext size={28} />
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 offer_prixx1 p-5 col-12 col-sm-12 col-md-6 col-lg-3">
              <span className="under_cimn">Under</span>
              <span className="under_cimn">₹1,999</span>
              <span className="next_arrow p-2">
                <GrNext size={28} />
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 offer_prixx2 p-5 col-12 col-sm-12 col-md-6 col-lg-3">
              <span className="under_cimn">Under</span>
              <span className="under_cimn">₹1,999</span>
              <span className="next_arrow p-2">
                <GrNext size={28} />
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-3 offer_prixx3 p-5 col-12 col-sm-12 col-md-6 col-lg-3">
              <span className="under_cimn">Under</span>
              <span className="under_cimn">₹1,999</span>
              <span className="next_arrow p-2">
                <GrNext size={28} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Gifting Edition</span>
        <p className="category_txt">Elegant & Versatile Gifts</p>
        <img src={require("../../Images/Groupimg.png")} />
        <div className="row pt-4 w-100">
          <div className="col-md-6 col-lg-3 mt-md-4 mt-sm-4 col-sm-6 mt-4 dsjnurh_sx">
            <img src={require("../../Images/Group 1597884624 (1).png")} />
            <div className="lionk_ss">
              <a>Gifts for Her</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mt-md-4 mt-sm-4 col-sm-6 mt-4 dsjnurh_sx">
            <img src={require("../../Images/Group 1597884625 (1).png")} />
            <div className="lionk_ss">
              <a>Gifts for Him</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mt-md-4 mt-sm-4 col-sm-6 mt-4 dsjnurh_sx">
            <img src={require("../../Images/Group 1597884626 (1).png")} />
            <div className="lionk_ss">
              <a>Gifts for Self</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mt-md-4 mt-sm-4 col-sm-6 mt-4 dsjnurh_sx">
            <img src={require("../../Images/Group 1597884636.png")} />
            <div className="lionk_ss">
              <a>Wedding Bands</a>
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd ">
        <span className="category_name">Discover Styles</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img src={require("../../Images/Groupimg.png")} />

        {/* <div className="carousel-container pt-5">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            // pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <img src={img} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="carousel-controls d-flex justify-content-center gap-5"
            style={{ cursor: "pointer" }}
          >
            <div ref={prevRef}>
              <FaAngleLeft size={25} />
            </div>
            <span className="soli_txt_sccs">Solitare Rings</span>
            <div ref={nextRef}>
              <FaAngleRight size={25} />
            </div>
          </div>
        </div> */}

        <div className="rings-container home_ring_1">
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
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd asxs_sdxszx">
        <span className="category_name">New Arrivals</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-4 row position-relative w-100 justify-content-between xcdf_sdcsd">
          <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <img
                src={require("../../Images/image (4).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
          </div>
          <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image (5).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
          </div>
          <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/Mask group (2).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
          </div>

          <div className=" position-relative box-trens-2 col-md-3 col-lg-3 col-6 col-sm-6 col-12">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image (6).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Gifting Guide</span>
        <p className="category_txt">Jewelry makes the perfect gift</p>
        <img src={require("../../Images/Groupimg.png")} />

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

      {/* <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Client Testimonial</span>
        <p className="category_txt">What our Client’s say about us</p>
        <img src={require("../../Images/Groupimg.png")} />

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

        <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
          <span className="category_name">Client Testimonial</span>
          <p className="category_txt">What our Client’s say about us</p>
          <img src={require("../../Images/Groupimg.png")} alt="Decorative" />

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
          >
            {[...testimonials, ...testimonials, ...testimonials].map(
              (item, index) => (
                <SwiperSlide key={index}>
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
