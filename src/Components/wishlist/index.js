import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";

import {
  FaAngleDown,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const CartPopup = lazy(() => import("../Add to Cart"));
const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));

const Wishlist = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const userId = localStorage.getItem("user_Id");
  const [wishlist, setWishlist] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

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

  const handleProductClick = useCallback(
    (productId, productData) => {
      navigate(`/product-details/${productId}`, {
        state: { product: productData },
      });
    },
    [navigate]
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  }, [navigate]);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  }, [dispatch]);

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
        setWishlist([]);
        setWishlistCount(0);
        localStorage.setItem("wishlistCount", "0");
        return;
      }

      const wishlistData = response.data.data.filter((item) => item?.productId); // Filter out items without productId
      setWishlist(wishlistData);
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
      setWishlist([]);
      setWishlistCount(0);
      localStorage.setItem("wishlistCount", "0");
    }
  };

  const toggleWishlist = useCallback(
    async (productId) => {
      if (!userId || !productId) {
        toast.error("Please login to manage wishlist");
        return;
      }

      try {
        const wishlistItem = wishlist.find(
          (item) => item?.productId?.id === productId
        );

        if (!wishlistItem?.id) {
          console.error("Invalid wishlist item");
          return;
        }

        const res = await axios.delete(
          `https://dev.crystovajewels.com/api/v1/wishlist/delete/${wishlistItem.id}`
        );

        if (res.status === 200) {
          setWishlist((prev) =>
            prev.filter((item) => item?.productId?.id !== productId)
          );
          setWishlistCount((prev) => Math.max(0, prev - 1));
          localStorage.setItem(
            "wishlistCount",
            Math.max(0, wishlistCount - 1).toString()
          );
          toast.success(res.data.message || "Removed from wishlist!");
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        toast.error("Failed to remove item from wishlist");
      }
    },
    [wishlist, userId, wishlistCount]
  );

  const handleNextImage = useCallback((productId, images) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId.id]: (prevIndexes[productId.id] + 1) % images.length,
    }));
  }, []);

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      setIsCartOpen(true);
      sessionStorage.removeItem("cameFromCheckout");
    }
  }, []);

  const handlePrevImage = useCallback((productId, images) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId.id]:
        (prevIndexes[productId.id] - 1 + images.length) % images.length,
    }));
  }, []);

  const addToCart = useCallback(
    async (productId) => {
      try {
        const userId = localStorage.getItem("user_Id");
        const productSize = Array.isArray(productId?.productSize)
          ? productId.productSize.join(",")
          : productId?.productSize || "";
        const variationIds = Array.isArray(productId?.variations)
          ? productId.variations.map((variation) => variation.id)
          : [];
        const payload = {
          userId: userId,
          productId: productId?.id,
          productPrice: productId.salePrice?.$numberDecimal,
          quantity: productId?.quantity || 1,
          productSize: productSize,
          discount: productId?.discount?.$numberDecimal || 0,
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
    [dispatch, openCart]
  );

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
      <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
        toastMessage={toastMessage}
      />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <div className="main-header">
          <Suspense fallback={<div>Loading...</div>}>
            <Header
              openCart={openCart}
              wishlistCount={userId ? wishlistCount : null}
              cartCount={userId ? cartCount : null}
            />
          </Suspense>
        </div>
        <div className="container">
          <div className="hdr_csd flex-column align-items-center produ_sss">
            <div className="row">
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((item) => {
                  if (!item?.productId) {
                    return null;
                  }

                  const { productId, id } = item;

                  if (
                    !productId?.id ||
                    !productId?.image ||
                    !productId?.image.length
                  ) {
                    return null;
                  }

                  const currentImageIndex = imageIndexes[productId.id] || 0;
                  const imageUrl = productId.image[currentImageIndex];

                  return (
                    <div
                      key={id}
                      className="col-lg-3 col-md-4 col-6 mb-4 col-5ths asxasx_cards dcvdfxC_dfrvdfvf"
                      style={{ flex: "0 0 auto" }}
                      onMouseEnter={() => setHoveredProduct(productId.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="jjcsindn_jcb">
                        <div className="card prio_card scdscsed_sdss">
                          <div className="card-image-wrapper position-relative">
                            <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                              SALE
                            </button>
                            <div
                              className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(productId.id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <GoHeartFill
                                className="heart-icon_ss"
                                size={18}
                              />
                            </div>
                            <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                              {imageUrl?.endsWith(".mp4") ? (
                                <video
                                  src={`https://dev.crystovajewels.com${imageUrl}`}
                                  className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : (
                                <img
                                  loading="lazy"
                                  src={`https://dev.crystovajewels.com${imageUrl}`}
                                  className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                                  alt={productId.productName || "Product"}
                                />
                              )}
                              {hoveredProduct === productId.id &&
                                productId.image.length > 1 && (
                                  <div className="hover-overlay w-100 d-none d-sm-flex">
                                    <button
                                      className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevImage(
                                          productId,
                                          productId.image
                                        );
                                      }}
                                    >
                                      <FaChevronLeft />
                                    </button>
                                    <button
                                      className="btn btn-light right-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNextImage(
                                          productId,
                                          productId.image
                                        );
                                      }}
                                    >
                                      <FaChevronRight />
                                    </button>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column main_cdsss">
                          <span className="mikdec_asdaa text-truncate pt-3">
                            {productId.productName || "Untitled Product"}
                          </span>
                          <div className="d-flex align-items-center gap-3 pt-1">
                            <span className="mikdec_asdxsx">
                              {productId.salePrice?.$numberDecimal || "0.00"}
                            </span>
                            <span className="mikdec_axsx">
                              {productId.regularPrice?.$numberDecimal || "0.00"}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                            <button
                              className="more_btn_dsdd ewdcscdsedcds w-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(productId.id);
                              }}
                            >
                              More Info
                            </button>
                            <button
                              className="d-flex align-items-center add-to-crd-dd gfbfgbvgfcbfb w-75 p-1 justify-content-center gap-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(productId);
                              }}
                            >
                              Add to Cart <BiShoppingBag size={25} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center py-5">
                  <h3>Your wishlist is empty</h3>
                  <p>Add items to your wishlist to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Wishlist;
