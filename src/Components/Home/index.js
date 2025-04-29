import React, { useEffect, useRef, useState, useMemo, useCallback, Suspense, lazy } from "react";
import "./index.css";
import { FaAward, FaMedal, FaStar, FaArrowRight, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiShoppingBag, BiSolidOffer } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { CiStar } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchCartCount } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import LazyVideo from "./LazyVideo";

const CartPopup = lazy(() => import("../Add to Cart"));
const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));
const JewelrySale = lazy(() => import("../Contact Us/sdcsd/demo"));
const OueColletion = lazy(() => import("./ourColletion"));
const Instruction = lazy(() => import("./instruction"));
const Occasion = lazy(() => import("./Occasion"));
const RingSlider = lazy(() => import("./ring"));
const DimondJewelery = lazy(() => import("./Dimond Jewellery/dimond"));
const Ring1 = lazy(() => import("./ring demo 1/ring"));
const Gift = lazy(() => import("./gift"));

const BASE_API = "https://dev.crystovajewels.com/api/v1";
const AUTO_SLIDE_INTERVAL = 2000;

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    slidesPerView: 1
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let slidesPerView = 1;
      
      if (width > 1024) slidesPerView = 3;
      else if (width > 768) slidesPerView = 2;
      else if (width > 427) slidesPerView = 2;

      setSize({ width, slidesPerView });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const productsToDisplay = useMemo(() => filteredBestSellers.length > 0 ? filteredBestSellers : bestSelling, [filteredBestSellers, bestSelling]);

  const openCart = React.useCallback(() => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  }, [navigate]);

  const closeCart = React.useCallback(() => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  }, [dispatch]);

  useEffect(() => {
    const update = () => setProductsPerPage(window.innerWidth < 768 ? 1 : 2);
    const debounce = setTimeout(update, 100); // Debounced update
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleProductClick = useCallback((productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  }, [navigate]);

  const addToCart = useCallback(async (product) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        userId,
        productId: product?.id,
        productPrice: product.salePrice?.$numberDecimal,
        quantity: product?.quantity || 1,
        productSize: Array.isArray(product?.productSize) ? product.productSize.join(",") : product?.productSize || "",
        discount: product?.discount?.$numberDecimal || 0,
        variation: Array.isArray(product?.variations) ? product.variations.map(v => v.id) : [],
      };

      const response = await axios.post(
        `${BASE_API}/order-details/create`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setState(prev => ({
          ...prev,
          isCartOpen: true,
          toastMessage: "Item added to cart successfully!",
          showToast: true
        }));
        dispatch(fetchCartCount());
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add item to cart");
    }
  }, [userId, navigate, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRated, bestSelling, onSale, categories] = await Promise.all([
          axios.get(`${BASE_API}/product/getTopRated`),
          axios.get(`${BASE_API}/product/getBestSelling`),
          axios.get(`${BASE_API}/product/getOnSale`),
          axios.get(`${BASE_API}/category/get`)
        ]);

        setState(prev => ({
          ...prev,
          topRated: topRated.data,
          bestSelling: bestSelling.data,
          onSale: onSale.data,
          categoriesa: categories.data
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    dispatch(fetchCartCount());
  }, [dispatch]);

  const testimonials = [
    {
      name: "Emily Carol",
      text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
    },
    {
      name: "John Doe",
      text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
    },
    {
      name: "Jane Smith",
      text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
    },
  ];

  const toggleFavorite = useCallback(
    async (productId, productData) => {
      const userId = localStorage.getItem("user_Id");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        if (state.wishlistItems[productId]) {
          // Remove from wishlist
          const wishlistItemId = state.wishlistItems[productId];
          setState(prev => ({
            ...prev,
            wishlistItems: { ...prev.wishlistItems, [productId]: undefined },
            toastMessage: "Removed from wishlist!"
          }));
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
          setState(prev => ({
            ...prev,
            wishlistItems: { ...prev.wishlistItems, [productId]: wishlistItem.id },
            toastMessage: "Added to wishlist!"
          }));
          updateWishlistCount(wishlistCount + 1);
          toast.success(response.data.message || "Added to wishlist!");
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
    [userId, state.wishlistItems, wishlistCount]
  );

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
        setState(prev => ({
          ...prev,
          wishlistItems: wishlistMap
        }));
        setWishlistCount(wishlistData.length);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const productsToDisplay = useMemo(() => state.filteredBestSellers.length > 0 ? state.filteredBestSellers : state.bestSelling, [state.filteredBestSellers, state.bestSelling]);

  const openCart = useCallback(() => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/login");
      return;
    }
    setState(prev => ({
      ...prev,
      isCartOpen: true,
      toastMessage: "Item added to cart successfully!",
      showToast: true
    }));
    document.body.classList.add("no-scroll");
  }, [navigate]);

  const closeCart = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCartOpen: false,
      showToast: false
    }));
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  }, [dispatch]);

  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/products?categoryName=${category}`);
    },
    [navigate]
  );

  const fetchBestSellersByCategory = useCallback(async (category) => {
    try {
      const url = `https://dev.crystovajewels.com/api/v1/product/get?categoryName=${category}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      return [];
    }
  }, []);

  const handleTooltipClick = useCallback(
    async (category) => {
      setState(prev => ({
        ...prev,
        currentCategory: category,
        filteredBestSellers: [],
        currentIndex: 0
      }));
      const products = await fetchBestSellersByCategory(category);
      setState(prev => ({
        ...prev,
        filteredBestSellers: products
      }));
      console.log("products :>> ", products);
    },
    [fetchBestSellersByCategory]
  );

  const handleChange = useCallback((event, newValue) => {
    setState(prev => ({
      ...prev,
      value: newValue
    }));
  }, []);

  // Optimize scrolling wrapper content
  const scrollItems = useMemo(() => [
    "Shop Gold and Diamond Jewelry",
    "Friendly Sale 30% Off",
    "Shop Gold and Diamond Jewelry",
    "Friendly Sale 30% Off",
  ], []);

  const renderScrollItem = useCallback((text, index) => (
    <div key={index} className="scroll-item">
      <img loading="lazy" src='/Images/Vector.png' alt="icon" />
      <span className="scroll_heder">{text}</span>
    </div>
  ), []);

  // Optimize product rendering with windowing
  const renderProducts = useCallback((products, renderType) => {
    const itemsPerPage = 8;
    const startIndex = state.currentIndex;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);
    
    return products.slice(startIndex, endIndex).map((product) => (
      <div
        key={product.id}
        className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards dcvdfxC_dfrvdfvf"
        style={{ flex: "0 0 auto" }}
      >
        <div className="card prio_card scdscsed_sdss">
          <div className="card-image-wrapper position-relative">
            <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
              {renderType}
            </button>
            <div
              className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
              onClick={() => toggleFavorite(product.id)}
              style={{ cursor: "pointer" }}
            >
              {state.wishlistItems[product.id] ? (
                <GoHeartFill className="heart-icon_ss" size={18} />
              ) : (
                <GoHeart className="heart-icon_ss" size={18} />
              )}
            </div>
            <img
              loading="lazy"
              src={product.image}
              className="card-img-top product-image"
              alt={product.name}
            />
          </div>
          {/* Product details */}
          <div className="card-body text-center">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
          </div>
        </div>
      </div>
    ));
  }, [state.currentIndex, state.wishlistItems, toggleFavorite]);

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
        isOpen={state.isCartOpen}
        closeCart={closeCart}
        showToast={state.showToast}
        toastMessage={state.toastMessage}
      />
      {state.isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={state.isCartOpen ? "blurred" : ""}>
        <div className="main-header">
          <Suspense fallback={<div>Loading...</div>}>
            <Header
              openCart={openCart}
              wishlistCount={userId ? wishlistCount : null}
              cartCount={userId ? cartCount : null}
            />
          </Suspense>
        </div>
        <div>
          <JewelrySale />
        </div>

        <div className="d-flex flex-column align-items-center hdr_csd p-0 sdcds_cate">
          <span className="category_name mt-md-4">Categories</span>
          <p className="category_txt">Radiance Fits for Everyone</p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />

          <div className="categories-slider">
            <Swiper
              spaceBetween={20}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 4 },
                640: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1200: { slidesPerView: 6 },
              }}
              className="mySwiper"
              preloadImages={false}
              lazy={true}
            >
              {state.categoriesa?.map((category) => (
                <SwiperSlide
                  key={category.id}
                  onClick={() => handleCategoryClick(category.categoryName)}
                >
                  <div className="category-image-wrapper">
                    <img
                      loading="lazy"
                      src={`https://dev.crystovajewels.com${category.categoryImage}`}
                      alt={category.categoryName}
                      onLoad={(e) =>
                        e.currentTarget.classList.add("lazy-img-active")
                      }
                    />
                  </div>
                  <span className="category-label">
                    {category.categoryName}
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="hdr_csd sdcxsdcx_Sdcxszdcx">
          <div className="scrolling-wrapper fastival-offerssss">
            <div className="scroll-content">
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
            <div className="position-relative">
              <img
                src="/Images/image (3).webp"
                className="img-fluid w-100"
                alt="Main Image"
                width="1920"
                height="700"
              />

            <div className="overlay-img11">
              <img
                loading="lazy"
                src="/Images/Rectangle 105457.png"
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
                <br className="d-md-none d-lg-block d-none" /> Here's a guide
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
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">
                  Shop Gold and Diamond Jewelry
                </span>
              </div>
              <div className="scroll-item">
                <img loading="lazy" src='/Images/Vector.png' alt="icon" />
                <span className="scroll_heder">Friendly Sale 30% Off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center diamon_jewe">
          <span className="category_name mt-md-4">Diamond Jewelry</span>
          <p className="category_txt">Minimal. Modern. Mesmerizing</p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
          <DimondJewelery />
        </div>

        <div className="paddingdn d-flex flex-column align-items-center hnbgygjhh mt-md-4">
          <span className="category_name ">Trending Collection</span>
          <p className="category_txt">
            The Latest looks, Crafted to Perfection
          </p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
          <div className="w-auto mt-1">
            <TabContext value={state.value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={state.value}
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
          {state.value === "1" && (
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
                  View All <FaArrowRight />
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
                            {product.image[0]?.endsWith(".mp4") ? (
                              <LazyVideo
                                loading="lazy"
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
                                loading="lazy"
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
          {state.value === "2" && (
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
                  View All <FaArrowRight />
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
                            {product.image[0]?.endsWith(".mp4") ? (
                              <LazyVideo
                                loading="lazy"
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
                                loading="lazy"
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
          {state.value === "3" && (
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
                  View All <FaArrowRight />
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
                            {product.image[0]?.endsWith(".mp4") ? (
                              <LazyVideo
                                loading="lazy"
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
                                loading="lazy"
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
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img best_sellig_sdcdc d-none"
            alt="home"
          />
          <Suspense fallback={<div>Loading carousel...</div>}>
            <Gift />
          </Suspense>
        </div>

        <div className="container d-flex flex-column align-items-center asdxdsx_bases_sell mt-md-4">
          <span className="category_name">Signature Collections</span>
          <p className="category_txt">
            Elevate the Everyday in Diamond Elegance
          </p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
          <div className="row d-flex align-items-stretch mt-3 w-100">
            {/* Left Image Section */}
            <div className="col-lg-6 ring_banner_szcdvc position-relative">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <img
                  loading="lazy"
                  src="/Images/Mask group (9).webp"
                  className="img-fluid w-100 h-100 object-fit-cover rounded"
                  alt="home"
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
              onMouseEnter={() => setState(prev => ({ ...prev, isPaused: true }))}
              onMouseLeave={() => setState(prev => ({ ...prev, isPaused: false }))}
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
                  View All <FaArrowRight />
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
                      preloadImages={false}
                      lazy={true}
                      // autoplay={{
                      //   delay: 3000, // Change delay as needed (3000ms = 3s)
                      //   disableOnInteraction: false,
                      // }}
                      // modules={[Autoplay]}
                    >
                      {productsToDisplay
                        .slice(
                          state.currentIndex,
                          state.currentIndex + productsToDisplay?.length
                        )
                        .map((product) => (
                          <SwiperSlide key={product.id}>
                            <div
                              className="card prio_card scdscsed_sdss_jdfn fgfdddds_hvb"
                              onMouseEnter={() => setState(prev => ({ ...prev, hoveredProduct: product.id }))}
                              onMouseLeave={() => setState(prev => ({ ...prev, hoveredProduct: null }))}
                            >
                              <div className="card-image-wrapper position-relative">
                                <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                                  {state.filteredBestSellers.length > 0
                                    ? state.currentCategory.toUpperCase()
                                    : "Top"}
                                </button>
                                <div
                                  className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2 fhhdd"
                                  onClick={() => toggleFavorite(product.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {state.wishlistItems[product.id] ? (
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
                                  {(() => {
                                    const imageToShow = product.image?.find(
                                      (img) => !img.endsWith(".mp4")
                                    );
                                    return imageToShow ? (
                                      <img
                                        src={`https://dev.crystovajewels.com${imageToShow}`}
                                        alt="Product"
                                        className="p-1_proi img-fluid border-0"
                                        onClick={() =>
                                          handleProductClick(product.id)
                                        }
                                        style={{ height: "100%" }}
                                      />
                                    ) : (
                                      <div className="text-center text-muted py-4">
                                        No image available
                                      </div>
                                    );
                                  })()}

                                  {/* {product.image[0]?.endsWith(".mp4") ? (
                                    <LazyVideo
                                      loading="lazy"
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
                                      loading="lazy"
                                      src={`https://dev.crystovajewels.com${product.image[0]}`}
                                      className="p-1_proi img-fluid border-0"
                                      alt="Product"
                                      onClick={() =>
                                        handleProductClick(product.id)
                                      }
                                      style={{ height: "100%" }}
                                    />
                                  )} */}
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
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
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
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
          <div className="row pt-3 w-100 scc_gift_edit container">
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                loading="lazy"
                className="img-sssssss"
                src="/Images/Group 1597884624 (1).png"
                alt="home"
              />
              <div className="lionk_ss">
                <a>Gifts for Her</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                loading="lazy"
                className="img-sssssss"
                src="/Images/Group 1597884625 (1).png"
                alt="home"
              />
              <div className="lionk_ss">
                <a>Gifts for Him</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                loading="lazy"
                className="img-sssssss"
                src="/Images/Group 1597884626 (1).png"
                alt="home"
              />
              <div className="lionk_ss">
                <a>Gifts for Self</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-lg-4 mt-md-0 mt-sm-0 col-sm-6 dsjnurh_sx p-0 sdcijdic_ass_sssssswx">
              <img
                loading="lazy"
                className="img-sssssss"
                src="/Images/Group 1597884636.png"
                alt="home"
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
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
        </div>
        <div>
          <Suspense fallback={<div>Loading carousel...</div>}>
            <RingSlider />
          </Suspense>
        </div>

        <div className="paddingdn d-flex flex-column align-items-center mt-2 mt-md-4 asxs_sdxszx dxfcvdfsCV_ss">
          <span className="category_name ">New Arrivals</span>
          <p className="category_txt">New Creations, Forever Elegance</p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
            className="home_tag_img"
            alt="home"
          />
        </div>

        <Suspense fallback={<div>Loading carousel...</div>}>
          <Ring1 />
        </Suspense>

        <div className="heder_sec_main d-flex flex-column align-items-center dscdsc_inst">
          <span className="category_name">Instructions</span>
          <p className="category_txt">Store it Soft, Shine it Often</p>
          <img
            loading="lazy"
            src="/Images/Groupimg.png"
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
            <p className="category_txt">What our Client's say about us</p>
            <img
              loading="lazy"
              src="/Images/Groupimg.png"
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
              preloadImages={false}
              lazy={true}
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
                          I wanted a custom bracelet to honor my daughter's
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

export default React.memo(Home);
