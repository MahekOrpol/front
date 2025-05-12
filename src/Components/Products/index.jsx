import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import "./index.css";
import {
  FaAngleDown,
  FaAngleUp,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const Header = lazy(() => import("../../Pages/Header"));
const Footer = lazy(() => import("../../Pages/Footer"));
const CartPopup = lazy(() => import("../Add to Cart"));

const Products = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [openSections, setOpenSections] = useState({
    categories: true,
    priceFilter: true,
    weight: true,
  });
  const [priceRange, setPriceRange] = useState([1000, 15000]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("categoryName");
  const price = queryParams.get("price");
  const gender = queryParams.get("gender");
  const [productList, setProductList] = useState([]);
  const [wishlistItems, setWishlistItems] = useState({});
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const userId = localStorage.getItem("user_Id");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("high-to-low");
  const dropdownRef = useRef(null);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Women");

  const productWithBanners = [
    "/Images/Product-offer-banner/banner1.svg",
    "/Images/Product-offer-banner/banner2.svg",
    "/Images/Product-offer-banner/banner3.svg",
  ];
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const urlSearchQuery = queryParams.get("search");
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );

  // web view
  const getBannerPosition = (index) => {
    const pattern = [8, 10, 11, 10, 11]; // Show banner before 10th, then before 22nd, 32nd, etc.
    let sum = 1;
    let patternIndex = 0;
    let bannerIndex = 0;

    while (sum < index + 1) {
      sum += pattern[patternIndex % pattern.length];
      if (sum === index + 1) {
        return bannerIndex % productWithBanners.length;
      }
      patternIndex++;
      bannerIndex++;
    }

    return null;
  };

  // Laptop view
  const getLaptopBannerPosition = (index) => {
    const pattern = [8]; // Show banner before 10th, then before 22nd, 32nd, etc.
    let sum = 1;
    let patternIndex = 0;
    let bannerIndex = 0;

    while (sum < index + 1) {
      sum += pattern[patternIndex % pattern.length];
      if (sum === index + 1) {
        return bannerIndex % productWithBanners.length;
      }
      patternIndex++;
      bannerIndex++;
    }

    return null;
  };

  // tab view
  const getTabBannerPosition = (index) => {
    const pattern = [6, 8, 6, 8]; // Show banner before 10th, then before 22nd, 32nd, etc.
    let sum = 1;
    let patternIndex = 0;
    let bannerIndex = 0;

    while (sum < index + 1) {
      sum += pattern[patternIndex % pattern.length];
      if (sum === index + 1) {
        return bannerIndex % productWithBanners.length;
      }
      patternIndex++;
      bannerIndex++;
    }

    return null;
  };

  // Mobile view
  const getMobileBannerPosition = (index) => {
    const pattern = [6]; // Show banner before 10th, then before 22nd, 32nd, etc.
    let sum = 1;
    let patternIndex = 1;
    let bannerIndex = 1;

    while (sum < index + 1) {
      sum += pattern[patternIndex % pattern.length];
      if (sum === index + 1) {
        return bannerIndex % productWithBanners.length;
      }
      patternIndex++;
      bannerIndex++;
    }

    return null;
  };

  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      setIsSearchActive(true);
    } else {
      setSearchQuery("");
      setIsSearchActive(false);
    }
  }, [urlSearchQuery]);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];
    if (sortOption === "high-to-low") {
      sortedProducts.sort(
        (a, b) =>
          parseFloat(b.salePrice?.$numberDecimal || 0) -
          parseFloat(a.salePrice?.$numberDecimal || 0)
      );
    } else if (sortOption === "low-to-high") {
      sortedProducts.sort(
        (a, b) =>
          parseFloat(a.salePrice?.$numberDecimal || 0) -
          parseFloat(b.salePrice?.$numberDecimal || 0)
      );
    }
    return sortedProducts;
  };

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        let url = `https://dev.crystovajewels.com/api/v1/product/get?`;

        // Add all filters from URL
        if (gender) url += `gender=${gender}&`;
        if (categoryName) url += `categoryName=${categoryName}&`;
        if (price) url += `salePrice=${price}&`;
        if (urlSearchQuery) url += `search=${encodeURIComponent(urlSearchQuery)}&`;

        // Remove trailing '&' if present
        url = url.replace(/&$/, "");

        const response = await axios.get(url);
        const sortedProducts = sortProducts(response.data, selectedOption);

        // Update state from URL parameters
        if (categoryName) {
          setSelectedCategories(categoryName.split(','));
        }
        if (gender) {
          setSelectedGender(gender);
        }

        setProductList(sortedProducts);

        // Search logic
        if (urlSearchQuery?.trim()) {
          const searchTerm = urlSearchQuery.toLowerCase();
          const filtered = sortedProducts.filter(
            (p) =>
              p.productName.toLowerCase().includes(searchTerm) ||
              p.categoryName?.toLowerCase().includes(searchTerm)
          );
          setFilteredProducts(filtered);
          setIsSearchActive(true);
        } else {
          setFilteredProducts(sortedProducts);
          setIsSearchActive(false);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchAndFilter();
  }, [
    categoryName,
    gender,
    selectedOption,
    urlSearchQuery,
    price
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      setIsCartOpen(true);
      sessionStorage.removeItem("cameFromCheckout");
    }
  }, []);

  const handleProductClick = useCallback(
    (productId, productData) => {
      navigate(`/product-details/${productId}`, {
        state: { product: productData },
      });
    },
    [navigate]
  );

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [imageIndexes, setImageIndexes] = useState({});
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

  const openCart = useCallback(() => {
    const userId = localStorage.getItem("user_Id");
    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
  }, [navigate]);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
  }, [dispatch]);

  const handleNextImage = useCallback((productId, images) => {
    setImageIndexes((prevIndex) => ({
      ...prevIndex,
      [productId]: (prevIndex[productId] + 1) % images.length,
    }));
  }, []);

  const handlePrevImage = useCallback((productId, images) => {
    setImageIndexes((prevIndex) => ({
      ...prevIndex,
      [productId]: (prevIndex[productId] - 1 + images.length) % images.length,
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    // Reset all checkboxes
    document.querySelectorAll(".category-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset state
    setPriceRange([1000, 15000]);
    setSearchQuery("");
    setIsSearchActive(false);
    setFilteredProducts([]);
    setSelectedCategories([]);
    setSelectedGender("Women"); // Reset gender to default

    // Reset URL to default state
    navigate("/products");

    // Fetch all products
    fetchAllProducts();
  }, [price, navigate]);

  const fetchProductsWithPriceFilter = async () => {
    try {
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/product/get?salePrice=${price}`
      );
      setSelectedGender(gender);
      const sortedProducts = sortProducts(response.data, selectedOption);
      setProductList(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const toggleFilter = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const handleApplyFilters = useCallback(async () => {
    // Create URLSearchParams object for client-side URL
    const params = new URLSearchParams();

    // Add selected categories to URL if any (comma-separated)
    if (selectedCategories.length > 0) {
      params.append('categoryName', selectedCategories.join(','));
    }

    
    if (searchQuery.trim() !== '') {
      params.append('search', searchQuery.trim());
    }

    // Update the URL
    navigate(`/products?${params.toString()}`);

    try {
      // Create URLSearchParams object for API request
      const apiParams = new URLSearchParams();

      // Add gender filter
      if (selectedGender) {
        apiParams.append('gender', selectedGender);
      }

      // Add search query if exists
      if (searchQuery.trim() !== "") {
        apiParams.append('search', searchQuery.trim());
      }

      // Handle multiple categories
      if (selectedCategories.length > 0) {
        apiParams.append('categoryName', selectedCategories.join(','));
      }

      const url = `https://dev.crystovajewels.com/api/v1/product/get?${apiParams.toString()}`;
      const response = await axios.get(url);
      const sortedProducts = sortProducts(response.data, selectedOption);

      setProductList(sortedProducts);
      setFilteredProducts(sortedProducts);
      setIsFilterVisible(false);
      setIsSearchActive(searchQuery.trim() !== "");
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      // Consider adding error state handling here
    }
  }, [
    selectedCategories,
    selectedGender,
    searchQuery,
    selectedOption,
    navigate
  ]);

  const updateWishlistCount = useCallback((count) => {
    setWishlistCount(count);
    localStorage.setItem("wishlistCount", count.toString());
  }, []);

  const toggleFavorite = useCallback(
    async (productId) => {
      const userId = localStorage.getItem("user_Id");
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        if (wishlistItems[productId]) {
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
          const response = await axios.post(
            `https://dev.crystovajewels.com/api/v1/wishlist/create`,
            {
              productId,
              userId,
            }
          );
          updateWishlistCount(wishlistCount + 1);
          const newWishlistItemId = response.data.data.id;
          setWishlistItems((prev) => ({
            ...prev,
            [productId]: newWishlistItemId,
          }));
          toast.success(response.data.message || "Added to wishlist!");
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
        toast.error("Failed to update wishlist. Please try again!");
      }
    },
    [navigate, wishlistItems, updateWishlistCount, wishlistCount]
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = useCallback(
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
    [dispatch, openCart, navigate]
  );

  const getCategory = async () => {
    const res = await axios.get(
      "https://dev.crystovajewels.com/api/v1/category/get"
    );
    setCategory(res.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories(prev => {
      // Toggle the category in the selection
      const newSelection = prev.includes(category)
        ? prev.filter(c => c !== category) // Remove if already selected
        : [...prev, category]; // Add if not selected

      // Update checkboxes visually
      const checkboxes = document.querySelectorAll('.category-checkbox');
      checkboxes.forEach(checkbox => {
        if (checkbox.value === category) {
          checkbox.checked = !prev.includes(category);
        }
      });

      return newSelection;
    });
  }, []);

  const displayProducts = isSearchActive ? filteredProducts : productList;

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://dev.crystovajewels.com/api/v1/product/get"
      );
      const sortedProducts = sortProducts(response.data, selectedOption);
      setProductList(sortedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleClick = useCallback(
    (gender) => {
      setSelectedGender(gender);
      // Keep categoryName if it exists, otherwise don't include it
      const params = new URLSearchParams();
      if (categoryName) params.append('categoryName', categoryName);
      params.append('gender', gender);
      navigate(`/products?${params.toString()}`);
    },
    [navigate, categoryName]  // Add categoryName as dependency
  );

  useEffect(() => {
    const body = document.body;

    if (isFilterVisible) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    return () => {
      body.classList.remove("no-scroll");
    };
  }, [isFilterVisible]);

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
      {isCartOpen && <div ref={overlayRef} className="overlay" onClick={closeCart}></div>}
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
        <div>
          <img
            loading="eager"
            src="/Images/productt_sss.webp"
            className="img_fluid1_banner"
            alt="product"
          />
        </div>
        <div className="container pb-5">
          <div className="hdr_csdg align-items-center produ_sss">
            <span className="produ_shsu">
              Choose Perfect {categoryName} Style for You
            </span>
            <p className="pro_p">
              Find the design that speaks to your heart. Explore a variety of
              stunning ring styles to match your unique taste and occasion
            </p>
            <div className="pt-3 Sfg">
              <button
                className={
                  selectedGender === "Women"
                    ? "ring_for_her active"
                    : "ring_for_him"
                }
                onClick={() => handleClick("Women")}
              >
                <img
                  loading="eager"
                  src={
                    selectedGender === "Women"
                      ? "/Images/her.png"
                      : "/Images/her-active.png"
                  }
                  alt="product"
                />
                <span className="ms-2">For Her</span>
              </button>
              <button
                className={
                  selectedGender === "Men"
                    ? "ring_for_her active"
                    : "ring_for_him"
                }
                onClick={() => handleClick("Men")}
              >
                <img
                  loading="eager"
                  src={
                    selectedGender === "Men"
                      ? "/Images/him-active.png"
                      : "/Images/him.png"
                  }
                  alt="product"
                />
                <span className="ms-2">For Him</span>
              </button>
            </div>
            <hr className="prod_hr mt-5 w-100" />
            <div className="d-flex justify-content-between w-100 mt-3 zsdc_555">
              <div className="d-flex gap-3 filter_pro">
                <button
                  className="flt_btn d-flex gap-3 align-items-center justify-content-center"
                  onClick={toggleFilter}
                >
                  <img
                    loading="eager"
                    src="/Images/filter.png"
                    alt="Filter Icon"
                  />{" "}
                  Filter
                </button>
              </div>
              <div className="d-flex gap-3 align-items-center filter_pro2">
                <span className="sho_ddd filter_pro1">Sort by:</span>
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    className="hi_to_low p-3 gap-2 align-items-center justify-content-center filter_pro3"
                    type="button"
                    id="sortDropdown"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    style={{ minWidth: "150px" }}
                  >
                    <span className="d-flex align-items-center gap-2 justify-content-between w-100">
                      {selectedOption === "low-to-high" ? (
                        <>
                          <span className="d-flex align-items-center gap-2">
                            <FaArrowUpWideShort /> (low-to-high)
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="d-flex align-items-center gap-2">
                            <FaArrowDownShortWide /> (high-to-low)
                          </span>
                        </>
                      )}
                      {isDropdownOpen ? (
                        <FaAngleUp style={{ fontSize: "0.9rem" }} />
                      ) : (
                        <FaAngleDown style={{ fontSize: "0.9rem" }} />
                      )}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <ul
                      className="dropdown-menu show Nkejd"
                      aria-labelledby="sortDropdown"
                      style={{
                        minWidth: "194px",
                        padding: "0.5rem 0",
                        border: "1px solid #e9ecef",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 djddd"
                          href="#"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setSelectedOption("low-to-high");
                          }}
                        >
                          <FaArrowUpWideShort /> Price (low-to-high)
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 djddd"
                          href="#"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setSelectedOption("high-to-low");
                          }}
                        >
                          <FaArrowDownShortWide /> Price (high-to-low)
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {isFilterVisible && (
              <div className="filter-overlay" onClick={toggleFilter}>
                <div
                  className="filter-sidebar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3">
                    <button className="close-button" onClick={toggleFilter}>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search Products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleApplyFilters();
                        }
                      }}
                    />
                    <span className="search-button" onClick={handleApplyFilters}>
                      <BiSearch size={25} />
                    </span>
                  </div>

                  <div className="filter-category">
                    <h5 onClick={() => toggleSection("categories")}>
                      Categories
                    </h5>
                    {category.map((cat) => (
                      <label key={cat._id} className={selectedCategories.includes(cat.categoryName) ? 'category-selected' : ''}>
                        <input
                          type="checkbox"
                          className="category-checkbox"
                          value={cat.categoryName}
                          checked={selectedCategories.includes(cat.categoryName)}
                          onChange={() => handleCategoryChange(cat.categoryName)}
                        />
                        {cat.categoryName}
                      </label>
                    ))}
                  </div>

                  <div
                    className="d-flex align-items-center gap-2 justify-content-end"
                    style={{ textAlign: "end" }}
                  >
                    <button className="Clen" onClick={handleApplyFilters}>
                      Apply
                    </button>
                    <button className="Clen" onClick={handleClearFilters}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="row pt-5">
              {displayProducts.length > 0 ? (
                displayProducts.map((product, index) => {
                  const bannerIndex = getBannerPosition(index);
                  const bannerLapIndex = getLaptopBannerPosition(index);
                  const bannerTabIndex = getTabBannerPosition(index);
                  const bannerMobIndex = getMobileBannerPosition(index);

                  return (
                    <React.Fragment key={product.id}>
                      {bannerIndex !== null && (
                        <div className="col-lg-6 col-12 mb-4 asxasx_card_banner round-8-a web-view d-none">
                          <img
                            src={productWithBanners[bannerIndex]}
                            alt={`Banner ${bannerIndex + 1}`}
                            className=" round-8-a w-100"
                          />
                        </div>
                      )}
                      {bannerLapIndex !== null && (
                        <div className="col-lg-6 col-12 mb-4 asxasx_card_banner round-8-a lap-view d-none d-lg-block">
                          <img
                            src={productWithBanners[bannerLapIndex]}
                            alt={`Banner ${bannerLapIndex + 1}`}
                            className=" round-8-a w-100"
                          />
                        </div>
                      )}
                      {bannerTabIndex !== null && (
                        <div className="col-md-8 col-12 mb-4 asxasx_card_banner round-8-a tab-view d-none d-md-block d-lg-none">
                          <img
                            src={productWithBanners[bannerTabIndex]}
                            alt={`Banner ${bannerTabIndex + 1}`}
                            className=" round-8-a w-100"
                          />
                        </div>
                      )}
                      {bannerMobIndex !== null && (
                        <div className="col-12 mb-4 asxasx_card_banner round-8-a mob-view d-block d-md-none">
                          <img
                            src={productWithBanners[bannerMobIndex]}
                            alt={`Banner ${bannerMobIndex + 1}`}
                            className=" round-8-a w-100"
                          />
                        </div>
                      )}
                      <div
                        className={`${isSearchActive
                          ? "masonry-item col-lg-3 col-md-4 col-6"
                          : "col-lg-3 col-md-4 col-6"
                          } mb-4 pt-2 asxasx_card`}
                      >
                        <div className="card prio_card scdscsed_sdss_pro">
                          <div className="card-image-wrapper position-relative">
                            <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0 trtrd">
                              SALE
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
                              {(() => {
                                const imagesOnly = product.image?.filter(
                                  (img) => !img.endsWith(".mp4")
                                );
                                const imageToShow =
                                  imagesOnly?.[imageIndexes[product.id] ?? 0];

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

                              <div className="hover-overlay">
                                <button
                                  className="left-btn"
                                  onClick={() =>
                                    handlePrevImage(product.id, product.image)
                                  }
                                >
                                  <FaChevronLeft />
                                </button>
                                <button
                                  className="right-btn"
                                  onClick={() =>
                                    handleNextImage(product.id, product.image)
                                  }
                                >
                                  <FaChevronRight />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column main_cdsss">
                          <span className="mikdec_try pt-1 text-truncate">
                            {product.productName}
                          </span>
                          <div className="d-flex align-items-center gap-3">
                            <span className="mikdec_asdxsx htryf">
                              ₹{product.salePrice?.$numberDecimal}
                            </span>
                            <span className="mikdec_axsx htryf">
                              ₹{product.regularPrice?.$numberDecimal}
                            </span>
                          </div>
                        </div>
                        <div className="jjcsindn_jcb">
                          <div className="d-flex align-items-center justify-content-between gap-2 mb-2 fvdvdf_Ththgf">
                            <button
                              className="more_btn_dsdd"
                              onClick={() => handleProductClick(product.id)}
                            >
                              More Info
                            </button>
                            <button
                              className="add-to-crd-dd1"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart <BiShoppingBag size={25} className="bag_clods" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : isSearchActive ? (
                <div className="text-center w-100 py-5">
                  <h4 className="no_plfrdrfd">
                    No products found matching "{searchQuery}"
                  </h4>
                  <button
                    className="btfdd mt-3"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchActive(false);
                      setFilteredProducts([]);
                    }}
                  >
                    Show All Products
                  </button>
                </div>
              ) : (
                <div className="text-center w-100 py-5">
                  <h4>No products available</h4>
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

export default Products;
