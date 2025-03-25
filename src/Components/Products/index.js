import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
  FaAngleDown,
  FaArrowRight,
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
  const gender = queryParams.get("gender");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://crystova.cloudbusiness.cloud/api/v1/product/get?`;
      if (categoryName) url += `categoryName=${categoryName}&`;
      if (gender) url += `gender=${gender}`;

      const response = await axios.get(url);
      setProductList(response.data);
    };

    fetchProducts();
  }, [categoryName, gender]);

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

    // Reset price range
    setPriceRange([1000, 15000]);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const toggleFavorite = (id) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite state for the specific card
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);


  return (
    <>
      <CartPopup isOpen={isCartOpen} closeCart={closeCart} />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <Header openCart={openCart} />
        <div>
          <img
            src={require("../../Images/productt_sss.png")}
            className="img_fluid1_banner"
          />
          {/* <div className='banner_text_sss'>
          <h1 className='banner_exx'>Shop</h1>
        </div> */}
        </div>
        <div className="container">
          <div className="hdr_csdg d-flex flex-column align-items-center produ_sss">
            <span className="produ_shsu">Choose Perfect Ring Style for You</span>
            <p className="pro_p">
              Find the design that speaks to your heart. Explore a variety of
              stunning ring styles to match your unique taste and occasion
            </p>
            <div className="pt-3 Sfg">
              {/* <button className="ring_for_her">
              <img src={require("../../Images/her.png")} /> Rings for Her
            </button>
            <button className="ring_for_him">
              <img src={require("../../Images/him.png")} /> Rings for Him
            </button> */}
              <button
                className="ring_for_her"
                onClick={() =>
                  navigate("/products?categoryName=Rings&gender=Women")
                }
              >
                <img src={require("../../Images/her.png")} /> Rings for Her
              </button>
              <button
                className="ring_for_him"
                onClick={() =>
                  navigate("/products?categoryName=Rings&gender=Men")
                }
              >
                <img src={require("../../Images/him.png")} /> Rings for Him
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
                {/* <button className="hi_to_low p-3 d-flex gap-3 align-items-center justify-content-center filter_pro3">
                Select Carat Weight <FaAngleDown />
              </button> */}
              </div>
              <div className="d-flex gap-3 align-items-center filter_pro2">
                <span className="sho_ddd filter_pro1">Sort by:</span>
                <button className="hi_to_low p-3 d-flex gap-3 align-items-center justify-content-center filter_pro3">
                  High to Low <FaAngleDown />
                </button>
              </div>
            </div>

            {/* Filter Sidebar Overlay */}
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
                    {openSections.categories && (
                      <>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Women's Ring
                        </label>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Men's Ring
                        </label>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Pendant
                        </label>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Women's Bracelet
                        </label>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Men's Bracelet
                        </label>
                        <label>
                          <input type="checkbox" className="category-checkbox" />{" "}
                          Earrings
                        </label>
                      </>
                    )}
                  </div>
                  <div className="filter-category">
                    <h5 onClick={() => toggleSection("priceFilter")}>
                      Price Filter{" "}
                      {openSections.priceFilter ? (
                        <FaChevronUp size={20} className="mr3" />
                      ) : (
                        <FaChevronDown size={20} className="mr3" />
                      )}
                    </h5>
                    {openSections.priceFilter && (
                      <div>
                        <input
                          type="range"
                          min="1000"
                          max="15000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="price-slider"
                        />
                        <div className="price-labels">
                          <span>{`₹${priceRange[0]} - ₹${priceRange[1]}`}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className="filter-category">
                  <h5 onClick={() => toggleSection('weight')}>
                    Weight {openSections.weight ? <FaChevronUp size={20} className="mr3" /> : <FaChevronDown size={20} className="mr3" />}
                  </h5>
                  {openSections.weight && (
                    <>
                      <label><input type="checkbox" /> 2 to 5 g</label>
                      <label><input type="checkbox" /> 5 to 10 g</label>
                      <label><input type="checkbox" /> 10 to 15 g</label>
                      <label><input type="checkbox" /> &gt; 15 g</label>
                    </>
                  )}
                </div> */}
                  <div style={{ textAlign: "end" }}>
                    <button className="Clen" onClick={handleClearFilters}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="row pt-5">
              {productList.length > 0 ? (
                productList.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4 asxasx_card"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Each column adapts based on screen size */}
                    {/* <div className="card prio_card">
                  <div className="card-title">
                    <div>
                      <button className="new_btnddx p-1 ms-3 mt-3">NEW</button>
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
                    <div className="card-body">
                      <img
                        src={`https://crystova.cloudbusiness.cloud${product.image[0]}`}
                        className="p-1_proi w-100"
                        alt="Product"
                      />
                      {hoveredProduct === product.id && (
                        <div className="hover-overlay w-100 d-flex">
                          <button className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3">
                            <FaChevronLeft />
                          </button>
                          <button className="btn btn-light right-btn">
                            <FaChevronRight />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}

                    <div className="card prio_card scdscsed_sdss_pro">
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
                            className="p-1_proi img-fluid"
                            alt="Product"
                          />
                          {hoveredProduct === product.id && (
                            <div className="hover-overlay w-100 d-flex">
                              <button className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3">
                                <FaChevronLeft />
                              </button>
                              <button className="btn btn-light right-btn">
                                <FaChevronRight />
                              </button>
                            </div>
                          )}

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

                      {hoveredProduct === product.id && (
                        <div className="hover-overlay DFC_NHJ w-100 d-flex">
                          <button className="d-flex align-items-center add-to-crd-dd p-1 mt-2 justify-content-center gap-3" onClick={openCart}>
                            Add to Cart <BiShoppingBag size={25} />
                          </button>
                          {/* <p className="mt-1"> */}
                          <a
                            href="/product-details"
                            className="mt-2 text-body szdc_zasxl d-flex gap-2 align-items-center justify-content-left w-100 ms-4"
                          >
                            Read more about the Product <FaArrowRight />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100">
                  <h3>No products found</h3>
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
