import React, { useEffect, useState } from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
  FaAngleDown,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import CartPopup from "../Add to Cart";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const userId = localStorage.getItem("user_Id");
  const [wishlist, setWishlist] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("user_Id");
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://192.168.1.9:3000/api/v1/order-details/get/${userId}`
        );
        const count = response.data.length || 0;
        setCartCount(count);
        localStorage.setItem('cartCount', count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        wishlist.forEach((product) => {
          if (!(product.id in newIndexes)) {
            newIndexes[product.id] = 0;
          }
        });
        return newIndexes;
      });
    }
  }, [wishlist]);
  const navigate = useNavigate();

  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, { state: { product: productData } });
  };


  //   const toggleFavorite = (id) => {
  //     setIsFavorite((prev) => ({
  //       ...prev,
  //       [id]: !prev[id], // Toggle the favorite state for the specific card
  //     }));
  //   };
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
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

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://192.168.1.9:3000/api/v1/wishlist/${userId}`
      );
      const wishlistData = response.data.data;
      setWishlist(wishlistData);
      setWishlistCount(wishlistData.length);
      // Initialize image indexes for each product
      const initialIndexes = {};
      wishlistData.forEach((product) => {
        initialIndexes[product?.productId?.id] = 0;
      });
      setImageIndexes(initialIndexes);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setToastMessage("Failed to add item to cart!");
      setShowToast(true);
    }
  };

  const toggleWishlist = async (productId) => {
    console.log("Removing product with ID:", productId);

    const wishlistItem = wishlist.find(
      (item) => item.productId.id === productId
    );

    if (!wishlistItem || !wishlistItem.id) {
      console.error("Invalid wishlist item:", wishlistItem);
      return;
    }

    try {
      const res = await axios.delete(
        `http://192.168.1.9:3000/api/v1/wishlist/delete/${wishlistItem.id}`
      );

      // Remove item from the wishlist state

      if (res.status === 200) {
        setWishlist((prev) =>
          prev.filter((item) => item.productId.id !== productId)
        );
        setWishlistCount(prev => prev - 1);
        console.log("res.data.message", res.data.message);
        fetchWishlist(); // Fetch updated wishlist after deletion
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleNextImage = (productId, images) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId.id]: (prevIndexes[productId.id] + 1) % images.length,
    }));
  };

  const handlePrevImage = (productId, images) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId.id]:
        (prevIndexes[productId.id] - 1 + images.length) % images.length,
    }));
  };

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("user_Id");
      const productSize = Array.isArray(productId?.productSize)
        ? productId.productSize.join(",")
        : productId?.productSize || "";
      const variationIds = Array.isArray(productId?.variations)
        ? productId.variations.map(variation => variation.id) // Ensure only ObjectIds are sent
        : [];

      // Define the payload for the API request
      const payload = {
        userId: userId,
        productId: productId?.id,
        productPrice: productId.salePrice?.$numberDecimal,
        quantity: productId?.quantity || 1,
        productSize: productSize,
        discount: productId?.discount?.$numberDecimal || 0,
        variation: variationIds

      };
      console.log('product', JSON.stringify(JSON.stringify(productId?.variations)
      ))

      // Make the API request
      const response = await axios.post(
        "http://192.168.1.9:3000/api/v1/order-details/create",
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
      <CartPopup isOpen={isCartOpen} closeCart={closeCart} showToast={showToast} toastMessage={toastMessage} setCartCount={setCartCount}/>
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <Header openCart={openCart} wishlistCount={wishlistCount} cartCount={cartCount}/>
        <div className="container">
          <div className="hdr_csd flex-column align-items-center produ_sss">
            <div className="row pt-sm-5">
              {wishlist.map(({ productId, id }) => (
                <div
                  key={id}
                  className="col-lg-3 col-md-4 col-6 mb-4 asxasx_card"
                  onMouseEnter={() => setHoveredProduct(productId.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Each column adapts based on screen size */}
                  <div className="card prio_card scdscsed_sdss_pro">
                    <div className="card-image-wrapper position-relative">
                      <div className="card-title">
                        <div>
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 trtrd">
                            SALE
                          </button>
                          <div
                            className="snuf_dfv text-overlay position-absolute top-0 p-sm-2 text-white text-center d-flex flex-column me-3 mt-sm-3"
                            onClick={() => toggleWishlist(productId?.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {wishlist.some(
                              (item) => item.productId.id === productId.id
                            ) ? (
                              <GoHeartFill
                                className="heart-icon_ss"
                                size={18}
                              />
                            ) : (
                              <GoHeart className="heart-icon_ss" size={18} />
                            )}
                          </div>
                        </div>
                        <div className="card-body">
                          {productId?.image[imageIndexes[productId?.id]]?.endsWith(
                            ".mp4"
                          ) ? (
                            <video
                              src={`http://192.168.1.9:3000${productId.image[imageIndexes[productId.id]]
                                }`}
                              className="w-100"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={`http://192.168.1.9:3000${productId.image[imageIndexes[productId.id]]
                                }`}
                              className="w-100"
                              alt={productId.productName}
                            />
                          )}
                          {hoveredProduct === productId.id &&
                            productId.image.length > 1 && (
                              <div className="hover-overlay w-100 d-none d-sm-flex">
                                <button
                                  className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3"
                                  onClick={() =>
                                    handlePrevImage(productId, productId.image)
                                  }
                                >
                                  <FaChevronLeft />
                                </button>

                                <button
                                  className="btn btn-light right-btn"
                                  onClick={() =>
                                    handleNextImage(productId, productId.image)
                                  }
                                >
                                  <FaChevronRight />
                                </button>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_try pt-3 text-truncate">
                      {" "}
                      {productId.productName}
                    </span>
                    <div className="d-flex align-items-center gap-3 pt-1">
                      <span className="mikdec_asdxsx judd">
                        {productId.salePrice?.$numberDecimal}
                      </span>
                      <span className="mikdec_axsx judd">
                        {productId.regularPrice?.$numberDecimal}
                      </span>
                    </div>
                    {hoveredProduct === productId.id && (
                      <div className="hover-overlay DFC_NHJ w-100 d-none d-sm-flex" onClick={() => handleProductClick(productId.id)}>
                        <button
                          className="d-flex align-items-center add-to-crd-dd p-1 mt-2 justify-content-center gap-3"
                          onClick={() => addToCart(productId)}
                        >
                          Add to Cart <BiShoppingBag size={25} />
                        </button>
                        {/* <a
                          onClick={() => handleProductClick(productId.id)}

                          className="mt-2 text-body szdc_zasxl d-flex gap-2 align-items-center justify-content-left w-100 ms-4"
                        >
                          Read more about the Product <FaArrowRight />
                        </a> */}
                      </div>
                    )}
                    <div className="d-flex d-sm-none flex-column mt-2">
                      <button
                        className="d-flex align-items-center add-to-crd-dd rtuy p-1 justify-content-center gap-3"
                        onClick={() => addToCart(productId)}
                      >
                        Add to Cart <BiShoppingBag size={25} />
                      </button>
                      {/* <p className="mt-1"> */}
                      {/* <a
                        onClick={() => handleProductClick(productId.id)}

                        className="mt-2 text-body szdc_za d-flex gap-2 align-items-left justify-content-left w-100"
                      >
                        Read more about the Product <FaArrowRight />
                      </a> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Wishlist;