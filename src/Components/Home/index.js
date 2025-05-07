import React, { useEffect, useRef, useState, useMemo } from "react";
import "./index.css";
import { Suspense, lazy } from "react";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchCartCount } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Pages/Header";
import JewelrySale from "../Contact Us/sdcsd/demo";
import Section2Categories from "./section2Categories";
import Section3Offers from "./section3Offers";

const CartPopup = lazy(() => import("../Add to Cart"));
const Section4DiamondJewelry = lazy(() => import("./section4DiamondJewelry"));
const Section5TrendingCollections = lazy(() =>
  import("./section5TrendingCollections")
);
const Section6OurCollections = lazy(() => import("./section6OurCollection"));
const Section7Occasions = lazy(() => import("./section7Occasions"));
const Section8SignatureCollections = lazy(() =>
  import("./section8SignatureCollections")
);
const Section9AffordableJewelry = lazy(() =>
  import("./section9AffordableJewelry")
);
const Section10ExquisiteJewelry = React.lazy(() =>
  import("./section10ExquisiteJewelry")
);
const Section11GiftingEdition = lazy(() => import("./section11GiftingEdition"));
const Section12RingSlider = React.lazy(() => import("./section12RingSlider"));
const Section13NewArrivals = React.lazy(() => import("./section13NewArrivals"));
const Section14Instruction = React.lazy(() => import("./section14Instruction"));
const Section15Testimonials = lazy(() => import("./section15Testimonials"));
const Footer = lazy(() => import("../../Pages/Footer"));

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_Id");
  const [wishlistItems, setWishlistItems] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(1); // Initialize with 1
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  const overlayRef = useRef(null);
  // Scroll control helpers
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
  
    const preventScroll = (e) => e.preventDefault();
  
    if (isCartOpen) {
      overlay.addEventListener("wheel", preventScroll, { passive: false });
      overlay.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      overlay.removeEventListener("wheel", preventScroll);
      overlay.removeEventListener("touchmove", preventScroll);
    }
  
    return () => {
      overlay.removeEventListener("wheel", preventScroll);
      overlay.removeEventListener("touchmove", preventScroll);
    };
  }, [isCartOpen]);
  
  
  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const openCart = React.useCallback(() => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
  }, [navigate]);
  
  const closeCart = React.useCallback(() => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
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

  // Function to add an item to the cart
  const addToCart = React.useCallback(
    async (product) => {
      try {
        const userId = localStorage.getItem("user_Id");

        if (!userId) {
          navigate("/login");
          return;
        }

        const productSize = Array.isArray(product?.productSize)
          ? product.productSize.join(",")
          : product?.productSize || "";
        const variationIds = Array.isArray(product?.variations)
          ? product.variations.map((variation) => variation.id)
          : [];

        const payload = {
          userId: userId,
          productId: product?.id,
          productPrice: product.salePrice?.$numberDecimal,
          quantity: product?.quantity || 1,
          productSize: productSize,
          discount: product?.discount?.$numberDecimal || 0,
          variation: variationIds,
        };

        const response = await axios.post(
          "https://dev.crystovajewels.com/api/v1/order-details/create",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        openCart();
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
    },
    [navigate, dispatch, openCart]
  );

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
    localStorage.setItem("wishlistCount", count.toString());
  };

  const toggleFavorite = React.useCallback(
    async (productId, productData) => {
      const userId = localStorage.getItem("user_Id");
      if (!userId) {
        navigate("/login");
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
          toast.success(response.data.message || "Added to wishlist!");
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
    [userId, wishlistItems, wishlistCount]
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
      <div className={isCartOpen ? "blurred" : ""}>
        <div className="main-header">
          <Header
            openCart={openCart}
            wishlistCount={userId ? wishlistCount : null}
            cartCount={userId ? cartCount : null}
          />
        </div>
        <JewelrySale />
        <Section2Categories />
        <Section3Offers />
        <Suspense fallback={<div>Loading...</div>}>
          <Section4DiamondJewelry />
          <Section5TrendingCollections
            toggleFavorite={toggleFavorite}
            wishlistItems={wishlistItems}
            addToCart={addToCart}
          />
          <Section6OurCollections />
          <Section7Occasions />
          <Section8SignatureCollections
            toggleFavorite={toggleFavorite}
            wishlistItems={wishlistItems}
            addToCart={addToCart}
          />
          <Section9AffordableJewelry />
          <Section10ExquisiteJewelry />
          <Section11GiftingEdition />
          <Section12RingSlider />
          <Section13NewArrivals />
          <Section14Instruction />
          <Section15Testimonials />
          <div className="pb-5 "></div>
          <Footer />
        </Suspense>
      </div>
      {isCartOpen && <div ref={overlayRef} className="overlay" onClick={closeCart}></div>}
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
      <div>
        <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
        toastMessage={toastMessage}
      />
      </div>
    </>
  );
};

export default Home;
