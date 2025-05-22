import { TabContext } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiShoppingBag, BiSolidOffer } from "react-icons/bi";
import { FaArrowRight, FaAward, FaMedal } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Section5TrendingCollections({
  toggleFavorite,
  wishlistItems,
  addToCart,
}) {
  const [value, setValue] = useState("1");
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const disableRightClick = (e) => e.preventDefault();

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const scrollRef = useRef(null);
  const BASE_API = "https://dev.crystovajewels.com/api/v1";

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
  const handleProductClick = React.useCallback(
    (productId, productData) => {
      navigate(`/product-details/${productId}`, {
        state: { product: productData },
      });
    },
    [navigate]
  );

  useEffect(() => {
    const cameFromCheckout = sessionStorage.getItem("cameFromCheckout");
    if (cameFromCheckout) {
      sessionStorage.removeItem("cameFromCheckout");
    }

    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setShowArrow(isAtEnd);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [topRated, bestSelling, onSale] = await Promise.all([
          axios.get(`${BASE_API}/product/getTopRated`),
          axios.get(`${BASE_API}/product/getBestSelling`),
          axios.get(`${BASE_API}/product/getOnSale`),
        ]);
        setTopRated(topRated.data);
        setBestSelling(bestSelling.data);
        setOnSale(onSale.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAll();
  }, []);
  return (
    <div className="paddingdn d-flex flex-column align-items-center hnbgygjhh pt-md-4">
      <span className="category_name ">Trending Collection</span>
      <p className="category_txt">The Latest looks, Crafted to Perfection</p>
      <img
        onContextMenu={disableRightClick}
        draggable="false"
        loading="lazy"
        // fetchPriority="high"
        src="/Images/Groupimg.png"
        className="home_tag_img"
        alt="home"
      />
      <div className="w-auto mt-1">
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
              <Tab
                className="xjc_dbv flex-row align-items-center "
                icon={
                  <BiSolidOffer color="#611D2B" className="pt-1" size={30} />
                }
                label="On Sale"
                value="1"
              />
              <Tab
                className="xjc_dbv flex-row align-items-center "
                icon={<FaAward color="#611D2B" className="pt-1" size={30} />}
                label="Best Seller"
                value="2"
              />
              <Tab
                className="xjc_dbv flex-row align-items-center "
                icon={<FaMedal color="#611D2B" className="pt-1" size={30} />}
                label="Top Rated"
                value="3"
              />
            </Tabs>
          </Box>
        </TabContext>
      </div>
      {value === "1" && (
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
                          <GoHeartFill className="heart-icon_ss" size={18} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={18} />
                        )}
                      </div>
                      <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                        {(() => {
                          const imageToShow = product.image?.find(
                            (img) => !img.endsWith(".mp4")
                          );
                          return imageToShow ? (
                            <img
                              onContextMenu={disableRightClick}
                              draggable="false"
                              src={`https://dev.crystovajewels.com${imageToShow}`}
                              alt={product?.productName}
                              className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                              onClick={() => handleProductClick(product.id)}
                            />
                          ) : (
                            <div className="text-center text-muted py-4">
                              No image available
                            </div>
                          );
                        })()}
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
      {value === "2" && (
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
                          <GoHeartFill className="heart-icon_ss" size={18} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={18} />
                        )}
                      </div>
                      <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                        {(() => {
                          const imageToShow = product.image?.find(
                            (img) => !img.endsWith(".mp4")
                          );
                          return imageToShow ? (
                            <img
                              onContextMenu={disableRightClick}
                              draggable="false"
                              src={`https://dev.crystovajewels.com${imageToShow}`}
                              alt={product?.productName}
                              className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                              onClick={() => handleProductClick(product.id)}
                            />
                          ) : (
                            <div className="text-center text-muted py-4">
                              No image available
                            </div>
                          );
                        })()}
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
      {value === "3" && (
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
                          <GoHeartFill className="heart-icon_ss" size={18} />
                        ) : (
                          <GoHeart className="heart-icon_ss" size={18} />
                        )}
                      </div>
                      {/* Product Image */}
                      <div className="card-body p-0 d-flex justify-content-center top_fff_trosnd">
                        {(() => {
                          const imageToShow = product.image?.find(
                            (img) => !img.endsWith(".mp4")
                          );
                          return imageToShow ? (
                            <img
                              onContextMenu={disableRightClick}
                              draggable="false"
                              src={`https://dev.crystovajewels.com${imageToShow}`}
                              alt={product?.productName}
                              className="p-1_proi img-fluid sdcijdic_ass_sssssswx_ring"
                              onClick={() => handleProductClick(product.id)}
                            />
                          ) : (
                            <div className="text-center text-muted py-4">
                              No image available
                            </div>
                          );
                        })()}
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
  );
}
