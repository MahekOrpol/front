import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import "./index.css";
import { BiShoppingBag } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import ringVideo from "../../Videos/ring.mp4";
import CartPopup from "../Add to Cart";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiWhatsapp } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductViewCounter from "../../ProductViewCounter";
import { fetchCartCount } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

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
const ProductDetailss = () => {
  const [liked, setLiked] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState({});
  const { productId } = useParams();
  const location = useLocation();
  const productData = location.state?.product;
  const [openIndex, setOpenIndex] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const userId = localStorage.getItem("user_Id");
  const [wishlistItems, setWishlistItems] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [sku, setSku] = useState();
  const [productName, setProductName] = useState();
  const [salePrice, setSalePrice] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const phoneNumber = "919099975424"; // Replace with your WhatsApp number
const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem('wishlistCount')) || 0
  );
  const videoSliderRef = useRef(null);
  const imageSliderRef = useRef(null);

  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [currentImageSlide, setCurrentImageSlide] = useState(0);

  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  const message = `👋 Hi! Thank you for contacting us. I'm interested in placing an order.

🛍 *Product:* ${productName}
🆔 *SKU:* ${sku}
💰 *Price:* ₹${salePrice}
🖼 *Image:* ${imageUrl}
🔗 *Product Link:* ${window.location.href}

Please let me know the next steps.`;

  const encodedMessage = encodeURIComponent(message);
  // const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/register");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const navigate = useNavigate();

  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  };

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, [location]);

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      setIsCartOpen(true);
      sessionStorage.removeItem("cameFromCheckout");
    }
  }, []);

  // Filter images and videos from productDetails.image
  const images = useMemo(
    () => productDetails?.image?.filter((img) => !img.endsWith(".mp4")) || [],
    [productDetails]
  );

  const videos = useMemo(
    () => productDetails?.image?.filter((vid) => vid.endsWith(".mp4")) || [],
    [productDetails]
  );

  useEffect(() => {
    if (!productData) {
      // Fetch product data if not available in state
      axios
        .get(
          `http://147.93.104.196:3000/api/v1/product/get-product-id/${productId}`
        )
        .then((response) => {
          console.log("Fetched product:", response.data);
          setProductDetails(response.data);
          setSku(response.data.sku);
          setProductName(response.data.productName);
          setSalePrice(response.data.salePrice?.$numberDecimal);
          setImageUrl(response.data.image[0]);
          console.log("response.data.image[0] :>> ", response.data.image[0]);
          if (response.data.categoryName) {
            fetchRelatedProducts(response.data.categoryName);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [productId, productData]);

  const fetchRelatedProducts = (categoryName) => {
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    axios
      .get(`http://147.93.104.196:3000/api/v1/product/get-related-product`, {
        params: { categoryName },
      }) // Use params for GET
      .then((response) => {
        setRelatedProducts(response.data || []);
      })
      .catch((error) =>
        console.error("Error fetching related products:", error)
      );
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false); // Reset toast state when closing
    document.body.classList.remove("no-scroll");
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [selectedSize, setSelectedSize] = useState("Select size");
  const [displayPrice, setDisplayPrice] = useState({
    regularPrice: productDetails?.regularPrice?.$numberDecimal || 0,
    salePrice: productDetails?.salePrice?.$numberDecimal || 0,
    discount: productDetails?.discount?.$numberDecimal || 0,
  });

  const handleSelect = (size) => {
    setSelectedSize(size);

    if (productDetails?.hasVariations) {
      const selectedVariation = productDetails.variations.find(
        (variation) => variation.productSize === size
      );

      if (selectedVariation) {
        setDisplayPrice({
          regularPrice: selectedVariation.regularPrice,
          salePrice: selectedVariation.salePrice,
          discount: selectedVariation.discount,
        });
      }
    } else {
      setDisplayPrice({
        regularPrice: productDetails?.regularPrice?.$numberDecimal,
        salePrice: productDetails?.salePrice?.$numberDecimal,
        discount: productDetails?.discount?.$numberDecimal,
      });
    }
  };

  const isVideo = (file) => file?.endsWith(".mp4");

  // const getMediaURL = (path) => `http://147.93.104.196:3000${path}`;

  useEffect(() => {
    if (
      productDetails?.hasVariations &&
      productDetails.variations?.length > 0
    ) {
      // Set default price from the first variation
      const firstVariation = productDetails.variations[0];

      setDisplayPrice({
        regularPrice: firstVariation.regularPrice,
        salePrice: firstVariation.salePrice,
        discount: firstVariation.discount,
      });
    } else {
      // Set default price if there are no variations
      setDisplayPrice({
        regularPrice: productDetails?.regularPrice?.$numberDecimal || 0,
        salePrice: productDetails?.salePrice?.$numberDecimal || 0,
        discount: productDetails?.discount?.$numberDecimal || 0,
      });
    }
  }, [productDetails]);

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
    localStorage.setItem('wishlistCount', count.toString());
  };

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
        updateWishlistCount(wishlistCount - 1);
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
        updateWishlistCount(wishlistCount + 1);
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
          `http://147.93.104.196:3000/api/v1/wishlist/${userId}`
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

  const faqs = [
    {
      icon: <img src={require("../../Images/watch.png")} />,
      title: "Shipping",
      answer:
        "This item is made to order and takes 2-3 weeks to craft. We ship FedEx Priority Overnight, signature required and fully insured.",
    },
    {
      icon: <img src={require("../../Images/Vector (6).png")} />,
      title: "Return Policy",
      answer:
        "Received an item you don't like? Crystova is proud to offer free returns within 30 days from receiving your item. Contact our support team to issue a return.",
    },
  ];

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
        "http://147.93.104.196:3000/api/v1/order-details/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      openCart(); // Open cart after successful addition
      if (response.status === 200) {
        console.log("Product added to cart successfully:", response.data);
        dispatch(fetchCartCount());
      } else {
        console.error("Failed to add product to cart:", response);
      }
      setToastMessage("Item added to cart successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
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
        <div className="container detail_arrowW_xss">
          <section>
            <div class=" pb-2 pt-3 md:px-5">
              <div class="Breadcrumbs max-w-8xl d-flex align-items-center mx-auto flex items-center flex-nowrap whitespace-nowrap overflow-hidden gap-2">
                <div class="BreadcrumbItem flex ">
                  <div class="flex items-center flex-nowrap gap-1.5">
                    <a
                      class="font-semibold text-1.25xs leading-tight underline capitalize bread_crumnbss"
                      data-discover="true"
                      href="/"
                    >
                      Homepage
                    </a>
                  </div>
                </div>
                <FaChevronRight />
                <div class="BreadcrumbItem flex">
                  <div class="flex items-center flex-nowrap gap-1.5">
                    <a
                      class="font-semibold text-1.25xs leading-tight underline capitalize bread_crumnbss"
                      data-discover="true"
                      href={`/products?category=${
                        productDetails?.categoryName || "rings"
                      }`}
                    >
                      {productDetails?.categoryName || "Rings"}
                    </a>
                  </div>
                </div>
                <FaChevronRight />
                <div class="BreadcrumbItem flex max-w-1/3">
                  <span class="font-light text-1.25xs leading-tight line-clamp-1 whitespace-normal mt-0.5 bread_crumnbs">
                    {productDetails.productName || "products"}
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* {product details} */}
          <section className="d-flex gap-lg-5 p-0 pro_sss_gubs">
            <div className="w-100 sdcsd_saxza d-md-none">
              <div className="pt-5 d-flex flex-column gap-4 position-sticky top-0 dscsd_insdsss">
                {productDetails?.image && productDetails.image.length > 0 ? (
                  productDetails.image.map((img, index) => {
                    const isVideo = img.endsWith(".mp4"); // Check if the file is a video
                    return (
                      <div className="det_min_cd2" key={index}>
                        {isVideo ? (
                          <video
                            className="detr_img bg-white"
                            src={`http://147.93.104.196:3000${img}`}
                            controls
                            autoPlay
                            loop
                            muted
                          />
                        ) : (
                          <img
                            className="detr_img bg-white"
                            src={`http://147.93.104.196:3000${img}`}
                            alt={`Product ${index + 1}`}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>Loading images...</p>
                )}
              </div>
              <div className="mobile-slider">
                <Swiper
                  spaceBetween={0}
                  loop={true}
                  speed={1000}
                  modules={[Autoplay, Pagination]}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true, // Enables a modern pagination style
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1, // Mobile - 1 item
                    },
                    768: {
                      slidesPerView: 2, // Tablet and up - 2 items
                    },
                    1200: {
                      slidesPerView: 3, // Optional for large screens
                    },
                  }}
                >
                  <SwiperSlide className="swiper-slide_sssss">
                    <video
                      src={ringVideo}
                      className="detr_img slider_ring_sss bg-white"
                      autoPlay
                      loop
                      muted
                    />
                  </SwiperSlide>

                  {productDetails?.image && productDetails.image.length > 0 ? (
                    productDetails.image.map((img, index) => {
                      const isVideo = img.endsWith(".mp4"); // Check if the file is a video

                      return (
                        <SwiperSlide className="swiper-slide_sssss" key={index}>
                          {isVideo ? (
                            <video
                              className="detr_img slider_ring_sss"
                              src={`http://147.93.104.196:3000${img}`}
                              controls
                              autoPlay
                              loop
                              muted
                            />
                          ) : (
                            <img
                              className="detr_img slider_ring_sss"
                              src={`http://147.93.104.196:3000${img}`}
                              alt={`Slide ${index + 1}`}
                            />
                          )}
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <p>Loading images...</p>
                  )}
                </Swiper>
              </div>
            </div>

            <div className="row col-md-6 gap-2 dfcdfsc_drtvdvdf escjh_drftvbfbvfcv d-none d-md-flex ps-lg-3 sticky-gallery">
              {/* Box 1: Video(s) */}
              <div className="col-md-6 border vider_saxasxs">
                {videos.length === 1 ? (
                  <video
                    src={`http://147.93.104.196:3000${videos[0]}`}
                    className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                    autoPlay
                    loop
                    muted
                  />
                ) : videos.length > 1 ? (
                  <Slider
                    className="custom-slick-slider"
                    ref={videoSliderRef}
                    dots
                    infinite
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    beforeChange={(oldIndex, newIndex) =>
                      setCurrentVideoSlide(newIndex)
                    }
                    appendDots={(dots) => {
                      const totalDots = dots.length;
                      const maxVisible = 3;
                      let startDot = 0;

                      if (currentVideoSlide >= maxVisible - 1) {
                        startDot = Math.min(
                          currentVideoSlide - 1,
                          totalDots - maxVisible
                        );
                      }

                      const visibleDots = dots.slice(
                        startDot,
                        startDot + maxVisible
                      );

                      return (
                        <div
                          className="dots-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {visibleDots.map((dot, index) => {
                            const dotIndex = startDot + index;
                            const isActive = dotIndex === currentVideoSlide;

                            return (
                              <div
                                key={dotIndex}
                                className={`dot ${isActive ? "active" : ""}`}
                                onClick={() => {
                                  videoSliderRef.current.slickGoTo(dotIndex);
                                  setCurrentVideoSlide(dotIndex);
                                }}
                                style={{
                                  width: isActive ? "12px" : "8px",
                                  height: isActive ? "12px" : "8px",
                                  borderRadius: "50%",
                                  background: isActive ? "#811331" : "#ccc",
                                  transition: "all 0.3s ease",
                                  cursor: "pointer",
                                }}
                              />
                            );
                          })}
                        </div>
                      );
                    }}
                  >
                    {videos.map((media, index) => (
                      <div key={index}>
                        <video
                          src={`http://147.93.104.196:3000${media}`}
                          className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                          autoPlay
                          loop
                          muted
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <p className="text-center">No Video</p>
                )}
              </div>

              <div className="col-md-6 border vider_saxasxs escjh_drftvbfbvfcv">
                {images.length > 3 ? (
                  <Slider
                    className="custom-slick-slider"
                    dots
                    infinite
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    beforeChange={(oldIndex, newIndex) =>
                      setCurrentImageSlide(newIndex)
                    }
                    appendDots={(dots) => {
                      const totalDots = dots.length;
                      const maxVisible = 3;
                      let startDot = 0;

                      if (currentImageSlide >= maxVisible - 1) {
                        startDot = Math.min(
                          currentImageSlide - 1,
                          totalDots - maxVisible
                        );
                      }

                      const visibleDots = dots.slice(
                        startDot,
                        startDot + maxVisible
                      );

                      return (
                        <div
                          className="dots-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {visibleDots.map((dot, index) => {
                            const dotIndex = startDot + index;
                            const isActive = dotIndex === currentImageSlide;

                            return (
                              <div
                                key={dotIndex}
                                className={`dot ${isActive ? "active" : ""}`}
                                onClick={() => {
                                  imageSliderRef.current.slickGoTo(dotIndex);
                                  setCurrentImageSlide(dotIndex);
                                }}
                                style={{
                                  width: isActive ? "12px" : "8px",
                                  height: isActive ? "12px" : "8px",
                                  borderRadius: "50%",
                                  background: isActive ? "#811331" : "#ccc",
                                  transition: "all 0.3s ease",
                                  cursor: "pointer",
                                }}
                              />
                            );
                          })}
                        </div>
                      );
                    }}
                  >
                    {images.map((media, index) => (
                      <div key={index}>
                        <img
                          src={`http://147.93.104.196:3000${media}`}
                          className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                          alt={productDetails?.productName || "Product image"}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : images[0] ? (
                  <img
                    src={`http://147.93.104.196:3000${images[0]}`}
                    className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                    alt={productDetails?.productName || "Product image"}
                  />
                ) : (
                  <p className="text-center">No Image</p>
                )}
              </div>
              {/* Box 3: Image[1] */}
              {images[1] && (
                <div className="col-md-6 border vider_saxasxs">
                  <img
                    src={`http://147.93.104.196:3000${images[1]}`}
                    className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                    alt={productDetails?.productName || "Product image"}
                  />
                </div>
              )}

              {/* Box 4: Image[2] */}
              {images[2] && (
                <div className="col-md-6 border vider_saxasxs">
                  <img
                    src={`http://147.93.104.196:3000${images[2]}`}
                    className="main-product-image w-100 object-fit-contain vider_saxasxs_sec"
                    alt={productDetails?.productName || "Product image"}
                  />
                </div>
              )}
            </div>

            <div className="w-100 sdcsd_saxza dscd_54_Dscds ">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="secrt_1">{productDetails?.productName}</span>
                  <div>
                    <button className="sav_btn p-2 pe-3 ps-3 dcs_dddd_8888">
                      Save {displayPrice.discount}%
                    </button>
                  </div>
                </div>
                <div className="pt-3 d-flex gap-5 align-items-center sdcdc">
                  <div className="d-flex justify-content-left align-items-center gap-3 df_rrrrr">
                    <div className="d-flex align-items-center gap-1">
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                    </div>
                    <div>
                      <span className="rv_ssss ">
                        <ProductViewCounter productId={productId} />
                      </span>
                    </div>
                  </div>
                  <div className="gap-3 d-flex align-items-center df_rrrrr">
                    <span className="sku_dsd">SKU : {productDetails?.sku}</span>
                    <button className="stk_btn p-2 pe-3 ps-3">
                      {productDetails?.stock}
                    </button>
                  </div>
                </div>
                <div className="pt-3 pt-sm-4">
                  <div className="d-flex gap-3 align-items-center">
                    <span className="main_txt_pb">
                      ₹{displayPrice.salePrice}
                    </span>
                    <span className="cut_txt_sc">
                      ₹{displayPrice.regularPrice}
                    </span>
                  </div>
                </div>
                <div className="pt-sm-3 pt-md-3 pt-lg-5">
                  <p className="seb_p_g">
                    {productDetails?.productsDescription}
                  </p>
                </div>

                <div className="pt-2">
                  <hr className="hr_pb_dtl" />
                </div>

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle size_drp_dpwn d-flex align-items-center w-50 justify-content-between p-2 ps-4 pe-4"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedSize || "Select size"}
                  </button>
                  <ul className="dropdown-menu product_det_menu w-50 mt-1">
                    {(Array.isArray(productDetails?.productSize)
                      ? productDetails.productSize[0].split(",")
                      : []
                    ).map((size) => (
                      <li key={size.trim()}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleSelect(size.trim())}
                        >
                          {size.trim()}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="">
                  <hr className="hr_pb_dtl" />
                </div>

                <div className="dcb_jbcsc">
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-between align-items-center gap-3 but_buton_ssssxs">
                      <button
                        className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3"
                        onClick={() => addToCart(productDetails)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3"
                        onClick={() => addToCart(productDetails)}
                      >
                        Add to Cart{" "}
                        <BiShoppingBag size={25} className="sopgdd" />
                      </button>
                    </div>
                    <div className="d-flex gap-4 align-items-center sdcs_axssx_aswxs ddsc_ybhfthfrt">
                      <div
                        className="gohrt_bod p-2"
                        onClick={() => toggleFavorite(productDetails.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {wishlistItems[productDetails.id] ? (
                          <GoHeartFill className="heart-icon_ss" size={25} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={25} />
                        )}
                      </div>

                      <div className="gohrt_bod p-2">
                        <GoShareAndroid size={25} className="hert_fff" />
                      </div>
                    </div>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center whats_abtn  justify-content-center gap-3 mt-2 "
                    // onClick={() => {
                    //   window.open("https://wa.me/919099975424", "_blank");
                    // }}
                    // onClick={() => addToCart(productDetails)}
                  >
                    Order On Whatsapp{" "}
                    <span className="whatsapp-icon">
                      <IoLogoWhatsapp size={30} />
                    </span>
                  </a>
                </div>

                <div className="dcb_jbcsc_kn">
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-between align-items-center w-100 but_buton_ssssxs">
                      <button
                        className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3"
                        onClick={() => addToCart(productDetails)}
                      >
                        Add to Cart{" "}
                        <BiShoppingBag size={25} className="sopgdd" />
                      </button>
                      <button
                        className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3"
                        onClick={() => addToCart(productDetails)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="pt-3 d-flex gap-2" style={{ height: "4rem" }}>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center w-100 whats_abtn_1 txt_shu justify-content-center gap-1"
                      // onClick={() => {
                      //   window.open("https://wa.me/919099975424", "_blank");
                      // }}
                      // onClick={() => addToCart(productDetails)}
                    >
                      Order On Whatsapp{" "}
                      <span className="whatsapp-icon">
                        <IoLogoWhatsapp size={30} />
                      </span>
                    </a>
                    <div className="d-flex gap-4 align-items-center sdcs_axssx_aswxs ddsc_ybhfthfrt">
                      <div
                        className="gohrt_bod p-2"
                        onClick={() => toggleFavorite(productDetails.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {wishlistItems[productDetails.id] ? (
                          <GoHeartFill className="heart-icon_ss" size={25} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={25} />
                        )}
                      </div>
                      <div className="gohrt_bod p-2">
                        <GoShareAndroid size={25} className="hert_fff" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-4 pt-4 fdcvd_life_tttdd">
                  <div className="icon-bdf">
                    <img
                      src={require("../../Images/material.png")}
                      alt="AVOID WATER / MOISTURE"
                    />
                    <span>AVOID WATER / MOISTURE</span>
                  </div>
                  <div className="divider"></div>
                  <div className="icon-bdf">
                    <img
                      src={require("../../Images/oeeofiw.png")}
                      alt="REMOVE BEFORE SLEEPING"
                    />
                    <span>REMOVE BEFORE SLEEPING</span>
                  </div>
                  <div className="divider szcxds_fix"></div>
                  <div className="icon-bdf">
                    <img
                      src={require("../../Images/fragrance_6211860.png")}
                      alt="AVOID PERFUME / LOTION"
                    />
                    <span>AVOID PERFUME / LOTION</span>
                  </div>
                  <div className="divider"></div>
                  <div className="icon-bdf">
                    <img
                      src={require("../../Images/box_14309182 (1).png")}
                      alt="USE SOFT / DRY FABRIC TO CLEAN"
                    />
                    <span>USE SOFT / DRY FABRIC TO CLEAN</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="card det_cddd p-3">
                    {/* <div className="d-flex gap-3 align-items-center align-content-center">
                      <img
                        src={require("../../Images/Ellipse 1687.png")}
                        className="position-relative"
                      />
                      <div className="position-absolute dvtfrvfr">
                        <img src={require("../../Images/Vector (4).png")} />
                      </div>
                      <span className="knoe_www">Know your Setting</span>
                    </div> */}

                    <div className="d-flex align-items-center gap-3 pt-4 sdsc_knoww">
                      {/* <div className="card det_cd_sec dfc_vardss p-3 w-100">
                        <div className="d-flex align-items-center gap-3">
                          <img src={require("../../Images/Vector (5).png")} />
                          <span className="knoe_www_rng">APPROX CTW</span>
                        </div>
                        <div className="pt-3">
                          <span className="sdjuij">0.2 ct</span>
                        </div>
                        <div className="pt-5">
                          <span className="mes_ddd">
                            The setting’s average total carat weight.
                          </span>
                        </div>
                      </div> */}
                      <div className="offer-container w-100">
                        <h5 className="fw-bold mb-4 offe_dscdfcc">
                          Offers For You{" "}
                        </h5>

                        <div
                          className="accordion w-100 mhkmhkfdv"
                          id="offerAccordion"
                        >
                          {/* Offer 1 */}
                          <div className="accordion-item w-100">
                            <h2
                              className="accordion-header w-100"
                              id="headingOne"
                            >
                              <button
                                className="accordion-button d-flex align-items-center w-100 dxvfdfrv"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <img
                                  src={
                                    require("../../Images/Frame (23).svg")
                                      .default
                                  }
                                  className="offer-icon"
                                  alt="Offer Icon"
                                />
                                <b>FLAT 100₹ off</b>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#offerAccordion"
                            >
                              <div className="accordion-body d-flex justify-content-between align-items-center">
                                <span className="coupon-code">
                                  If you do not receive your parcel within 12
                                  days, you’ll get ₹100 off for each additional
                                  day of delay starting from the 13th day
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3">
                      <div className="card det_cd_sec p-3 w-100">
                        <div className="d-flex align-items-center gap-3">
                          <img src={require("../../Images/Group (2).png")} />
                          <span className="knoe_www_rng">METAL</span>
                        </div>
                        <div className="pt-3">
                          <span className="sdjuij">925 Silver</span>
                        </div>
                        <div className="pt-5">
                          <span className="mes_ddd">
                            It comes with the authenticity and gaurantee
                            certificate of 925 Silver with lifetime exchange
                            gaurantee.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  {/* FAQ is here */}

                  <div className="accordion" id="faqAccordion">
                    {faqs.map((faq, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              openIndex === index ? "" : "collapsed"
                            }`}
                            type="button"
                            onClick={() => toggleFAQ(index)}
                          >
                            <span className="d-flex align-items-center gap-3 faq_txtt">
                              {faq.icon} {faq.title}
                            </span>
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            openIndex === index ? "show" : ""
                          }`}
                          data-bs-parent="#faqAccordion"
                        >
                          <div className="accordion-body srfferc">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd mt-md-3 szdcd_99909">
            <span className="category_name">Related Products</span>
            <p className="category_txt">A Touch of Grace for Every Gesture</p>
            <img src={require("../../Images/Groupimg.png")} />
          </div>
          <div className="heder_sec_main d-flex flex-column p-0">
            <div className="row">

              <div className="slider_ssss_fdcdf ">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={2}
                  breakpoints={{
                    1200: { slidesPerView: 4 },
                    810: { slidesPerView: 3 },
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
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div
                        className="card prio_card scdscsed_sdss fgfdddds"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="card-image-wrapper position-relative">
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0 dssdd">
                            NEW
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
                              <GoHeart className="heart-icon_ss" size={18} />
                            )}
                          </div>

                          <div
                            className="card-body p-0 d-flex justify-content-center"
                            style={{ height: "100%" }}
                          >
                            {product.image[0]?.endsWith(".mp4") ? (
                              <video
                                src={`http://147.93.104.196:3000${product.image[0]}`}
                                className="p-1_proi img-fluid"
                                autoPlay
                                loop
                                muted
                                onClick={() => handleProductClick(product.id)}
                              />
                            ) : (
                              <img
                                src={`http://147.93.104.196:3000${product.image[0]}`}
                                className="p-1_proi img-fluid border-0"
                                alt="Product"
                                onClick={() => handleProductClick(product.id)}
                                style={{ height: "100%" }}
                              />
                            )}
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
                            {product.salePrice.$numberDecimal}
                          </span>
                          <span className="mikdec_axsx">
                            {product.regularPrice?.$numberDecimal}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-2 pt-2 hjghfd">
                          <button
                            className="more_btn_dsdd w-50 rtrddg"
                            onClick={() => handleProductClick(product.id)}
                          >
                            More Info
                          </button>
                          <button
                            className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3 add_avai"
                            onClick={() => addToCart(productDetails)}
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
        <div class="pb-5"></div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailss;
