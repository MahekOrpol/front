import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
  FaAngleDown,
  FaAngleUp,
  FaArrowDownShortWide,
  FaArrowRight,
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
import CartPopup from "../Add to Cart";
import axios from "axios";
import Wishlist from "./../wishlist/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const Products = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
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
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const urlSearchQuery = queryParams.get("search");
  const [wishlistCount, setWishlistCount] = useState(0);
  // const [cartCount, setCartCount] = useState(() => {
  //   const savedCount = localStorage.getItem('cartCount');
  //   return savedCount ? parseInt(savedCount) : 0;
  // });

  // useEffect(() => {
  //   const fetchCartCount = async () => {
  //     const userId = localStorage.getItem("user_Id");
  //     if (!userId) return;

  //     try {
  //       const response = await axios.get(
  //         `http://147.93.104.196:3000/api/v1/order-details/get/${userId}`
  //       );
  //       const count = response.data.data.length || 0;
  //       setCartCount(count);
  //       localStorage.setItem('cartCount', count);
  //     } catch (error) {
  //       console.error("Error fetching cart count:", error);
  //     }
  //   };

  //   fetchCartCount();
  // }, []);

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

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        let url = `http://147.93.104.196:3000/api/v1/product/get?`;
        if (categoryName) url += `categoryName=${categoryName}&`;
        if (gender) url += `gender=${gender}&`;
        if (price) url += `salePrice=${price}&`;
        if (selectedCategories.length > 0) {
          url += `categoryName=${selectedCategories.join(",")}&`;
        }
        // Remove trailing '&' if present
        url = url.replace(/&$/, "");
        const response = await axios.get(url);
        const sortedProducts = sortProducts(response.data, selectedOption);
        setProductList(sortedProducts);
        // Index for carousel
        const initialIndexes = {};
        sortedProducts.forEach((product) => {
          initialIndexes[product.id] = 0;
        });
        setImageIndexes(initialIndexes);
        // Search logic here
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
    price,
    selectedCategories,
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

  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [imageIndexes, setImageIndexes] = useState({});

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

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     let url = `http://147.93.104.196:3000/api/v1/product/get?`;
  //     if (categoryName) url += `categoryName=${categoryName}&`;
  //     if (gender) url += `gender=${gender}`;
  //     if (price) url += `salePrice=${price}`;

  //     const response = await axios.get(url);
  //     const sortedProducts = sortProducts(response.data, selectedOption);
  //     setProductList(sortedProducts);

  //     const initialIndexes = {};
  //     sortedProducts.forEach((product) => {
  //       initialIndexes[product.id] = 0;
  //     });
  //     setImageIndexes(initialIndexes);

  //     console.log('price :>> ', price);
  //   };

  //   fetchProducts();
  // }, [categoryName, gender, selectedOption,price]); // Add selectedOption to dependencies

  const handleNextImage = (productId, images) => {
    setImageIndexes((prevIndex) => ({
      ...prevIndex,
      [productId]: (prevIndex[productId] + 1) % images.length,
    }));
  };

  const handlePrevImage = (productId, images) => {
    setImageIndexes((prevIndex) => ({
      ...prevIndex,
      [productId]: (prevIndex[productId] - 1 + images.length) % images.length,
    }));
  };

  const handlePriceChange = (event, index) => {
    const newValue = Number(event.target.value);
    setPriceRange((prev) => {
      const updatedRange = [...prev];
      updatedRange[index] = newValue;
      return updatedRange;
    });
  };

  const handleClearFilters = () => {
    // Reset all checkboxes
    document.querySelectorAll(".category-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document
      .querySelectorAll('.filter-category input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    const checkboxes = document.querySelectorAll(".category-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    // Reset price range only if not coming from home page price filter
    if (!price) {
      setPriceRange([1000, 15000]);
    }
    // If price filter exists, fetch products with only that filter
    if (price) {
      fetchProductsWithPriceFilter();
    } else {
      fetchAllProducts();
    }
    // Reset price range
    setPriceRange([1000, 15000]);
    setSearchQuery("");
    setIsSearchActive(false);
    setFilteredProducts([]);
    setSelectedCategories([]);
    fetchAllProducts();
  };
  const fetchProductsWithPriceFilter = async () => {
    try {
      const response = await axios.get(
        `http://147.93.104.196:3000/api/v1/product/get?salePrice=${price}`
      );
      setSelectedGender(gender);
      const sortedProducts = sortProducts(response.data, selectedOption);
      setProductList(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };
  const handleApplyFilters = async () => {
    let url = `http://147.93.104.196:3000/api/v1/product/get?`;
    let products = [];
    // Build base URL with price range
    if (price) {
      url += `salePrice=${price}&`;
    } else {
      // Otherwise use the price range from the filter
      url += `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&`;
    }
    try {
      if (selectedCategories.length > 0) {
        // Fetch products for each selected category
        const fetchPromises = selectedCategories.map(async (category) => {
          const categoryUrl = `${url}&categoryName=${category}`;
          const response = await axios.get(categoryUrl);
          return response.data;
        });
        // Wait for all promises to resolve and flatten results
        const results = await Promise.all(fetchPromises);
        products = results.flat();
      } else {
        // If no categories selected, fetch all products
        const response = await axios.get(url);
        products = response.data;
      }
      // Sort products
      const sortedProducts = sortProducts(products, selectedOption);
      // Apply search filter if search query exists
      if (searchQuery.trim() !== "") {
        const searchTerm = searchQuery.toLowerCase().trim();
        const filtered = sortedProducts.filter(
          (product) =>
            product.productName.toLowerCase().includes(searchTerm) ||
            product.categoryName?.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(sortedProducts);
      }
      // Update states
      setProductList(sortedProducts);
      setIsFilterVisible(false);
      setIsSearchActive(searchQuery.trim() !== "");
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const toggleFavorite = async (productId) => {
    // if (!userId) return toast.error("Please log in to add items to wishlist");
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
        setWishlistCount((prev) => prev - 1);
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

        const newWishlistItemId = response.data.data.id;
        setWishlistItems((prev) => ({
          ...prev,
          [productId]: newWishlistItemId, // Store wishlist ID properly
        }));
        setWishlistCount((prev) => prev + 1);
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

  const getCategory = async () => {
    const res = await axios.get(
      "http://147.93.104.196:3000/api/v1/category/get"
    );
    setCategory(res.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove category if already selected
          : [...prev, category] // Add category if not selected
    );
  };
  // Add this function to handle sorting
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

  const displayProducts = isSearchActive ? filteredProducts : productList;

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://147.93.104.196:3000/api/v1/product/get"
      );
      const sortedProducts = sortProducts(response.data, selectedOption);
      setProductList(sortedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
  const handleClick = (gender) => {
    setSelectedGender(gender);
    navigate(`/products?categoryName=Rings&gender=${gender}`);
  };

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
          <img
            src={require("../../Images/productt_sss.png")}
            className="img_fluid1_banner"
          />
        </div>
        <div className="container pb-5">
          <div className="hdr_csdg align-items-center produ_sss">
            <span className="produ_shsu">
              Choose Perfect Ring Style for You
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
                  src={
                    selectedGender === "Women"
                      ? require("../../Images/her.png")
                      : require("../../Images/her-active.png")
                  }
                />
                <span className="ms-2">Rings for Her</span>
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
                  src={
                    selectedGender === "Men"
                      ? require("../../Images/him-active.png")
                      : require("../../Images/him.png")
                  }
                />
                <span className="ms-2">Rings for Him</span>
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
                    src={require("../../Images/filter.png")}
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
                    />
                    <span className="search-button">
                      <BiSearch size={25} />
                    </span>
                  </div>
                  <div className="filter-category">
                    <h5 onClick={() => toggleSection("categories")}>
                      Categories{" "}
                      {openSections.categories ? (
                        <FaChevronUp size={20} className="mr3" />
                      ) : (
                        <FaChevronDown size={20} className="mr3" />
                      )}
                    </h5>
                    {category.map((category) => (
                      <label key={category._id}>
                        <input
                          type="checkbox"
                          className="category-checkbox"
                          value={category.categoryName}
                          checked={selectedCategories.includes(
                            category.categoryName
                          )}
                          onChange={() =>
                            handleCategoryChange(category.categoryName)
                          }
                        />{" "}
                        {category.categoryName}
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
                displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`${
                      isSearchActive
                        ? "masonry-item col-lg-3 col-md-4 col-6"
                        : "col-lg-3 col-md-4 col-6"
                    } mb-4 asxasx_card`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
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
                            <GoHeartFill className="heart-icon_ss" size={18} />
                          ) : (
                            <GoHeart className="heart-icon_ss" size={18} />
                          )}
                        </div>
                        <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                          {product.image[imageIndexes[product.id]]?.endsWith(
                            ".mp4"
                          ) ? (
                            <video
                              src={`http://147.93.104.196:3000${
                                product.image[imageIndexes[product.id]]
                              }`}
                              className="p-1_proi img-fluid"
                              autoPlay
                              loop
                              muted
                              onClick={() => handleProductClick(product.id)}
                            />
                          ) : (
                            <img
                              src={`http://147.93.104.196:3000${
                                product.image[imageIndexes[product.id]]
                              }`}
                              onClick={() => handleProductClick(product.id)}
                              className="p-1_proi img-fluid"
                              alt="Product"
                            />
                          )}
                          {hoveredProduct === product.id && (
                            <div className="hover-overlay w-100 d-none d-sm-flex">
                              <button
                                className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3"
                                onClick={() =>
                                  handlePrevImage(product.id, product.image)
                                }
                              >
                                <FaChevronLeft />
                              </button>
                              <button
                                className="btn btn-light right-btn"
                                onClick={() =>
                                  handleNextImage(product.id, product.image)
                                }
                              >
                                <FaChevronRight />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column main_cdsss">
                      <span className="mikdec_try pt-3 text-truncate ">
                        {product.productName}
                      </span>
                      <div className="d-flex align-items-center gap-3 pt-1">
                        <span className="mikdec_asdxsx htryf">
                          ₹{product.salePrice?.$numberDecimal}
                        </span>
                        <span className="mikdec_axsx htryf">
                          ₹{product.regularPrice?.$numberDecimal}
                        </span>
                      </div>
                      <div className="jjcsindn_jcb">
                        {hoveredProduct === product.id && (
                          <div className="d-flex align-items-center justify-content-between gap-2 pt-2 fvdvdf_Ththgf">
                            <button
                              className="more_btn_dsdd w-50"
                              // onClick={() => navigate("/product-details")}
                              onClick={() => handleProductClick(product.id)}
                            >
                              More Info
                            </button>
                            <button
                              className="d-flex align-items-center add-to-crd-dd1 gfbfgbvgfcbfb w-75 p-1 justify-content-center gap-3"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart <BiShoppingBag size={25} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d-flex jjcsindn_jcb_ccs flex-column mt-2">
                        <button
                          className="d-flex align-items-center add-to-crd-dd1 p-1 justify-content-center gap-3"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart <BiShoppingBag size={25} />
                        </button>
                        {/* <a
                          onClick={() => handleProductClick(product.id)}
                          className="mt-2 text-body szdc_za d-flex gap-2 align-items-left justify-content-left w-100"
                        >
                          Read more about the Product <FaArrowRight />
                        </a> */}
                      </div>
                    </div>
                  </div>
                ))
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
