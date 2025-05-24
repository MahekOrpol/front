import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Section8SignatureCollections({
  wishlistItems,
  toggleFavorite,
  addToCart,
}) {
  const [currentCategory, setCurrentCategory] = useState("");
  const [filteredBestSellers, setFilteredBestSellers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bestSelling, setBestSelling] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const disableRightClick = (e) => e.preventDefault();

  const navigate = useNavigate();

  const fetchBestSellersByCategory = async (category) => {
    try {
      const url = `https://dev.crystovajewels.com/api/v1/product/get?categoryName=${category}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      return [];
    }
  };
  const handleTooltipClick = async (category) => {
    setCurrentCategory(category);
    const products = await fetchBestSellersByCategory(category);
    setFilteredBestSellers(products);
    setCurrentIndex(0);
    console.log("products :>> ", products);
  };
  const productsToDisplay = useMemo(
    () => (filteredBestSellers.length > 0 ? filteredBestSellers : bestSelling),
    [filteredBestSellers, bestSelling]
  );
  const handleProductClick = (productId, productData) => {
    navigate(`/product-details/${productId}`, {
      state: { product: productData },
    });
  };

  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const bestSelling = await axios.get(
          "https://dev.crystovajewels.com/api/v1/product/getBestSelling"
        );
        setBestSelling(bestSelling.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchBestSelling();
  }, []);

  return (
    <div className="sign_collection">

    <div className="container d-flex flex-column align-items-center asdxdsx_bases_sell pt-md-4">
      <span className="category_name">Signature Collections</span>
      <p className="category_txt">Elevate the Everyday in Diamond Elegance</p>
      <img
        onContextMenu={disableRightClick}
        draggable="false"
        loading="lazy"
        // fetchPriority="high"
        src="/Images/green123.png"
        className="home_tag_img"
        alt="home"
      />
      <div className="row d-flex align-items-stretch mt-3 w-100">
        {/* Left Image Section */}
        <div className="col-lg-6 ring_banner_szcdvc position-relative">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <img
              onContextMenu={disableRightClick}
              draggable="false"
              loading="eager"
              src="/Images/Frame 14.png"
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
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
                      currentIndex,
                      currentIndex + productsToDisplay?.length
                    )
                    .map((product) => (
                      <SwiperSlide key={product.id}>
                        <div
                          className="card prio_card scdscsed_sdss_jdfn fgfdddds_hvb"
                          onMouseEnter={() => setHoveredProduct(product.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <div className="card-image-wrapper position-relative">
                            <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                              {filteredBestSellers.length > 0
                                ? currentCategory.toUpperCase()
                                : "Top"}
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
                              {(() => {
                                const imageToShow = product.image?.find(
                                  (img) => !img.endsWith(".mp4")
                                );
                                return imageToShow ? (
                                  <img
                                    onContextMenu={disableRightClick}
                                    draggable="false"
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
                              loading="eager"
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
  onContextMenu={disableRightClick}
   draggable="false"
                              loading="eager"
                              src={`https://dev.crystovajewels.com${product.image[0]}`}
                              className="p-1_proi img-fluid border-0"
                              alt="Product"
                              onClick={() =>
                                handleProductClick(product.id)
                              }
                              style={{ height: "100%" }}
                            />
                          )} */}
                              {/*<img   
  onContextMenu={disableRightClick}
   draggable="false"
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
    </div>
  );
}
