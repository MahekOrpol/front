import React, { useEffect, useRef, useState } from "react";
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

  const [openIndex, setOpenIndex] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const videoRef = useRef(null);
  const openCart = () => {
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [selectedSize, setSelectedSize] = useState("Select size");

  const handleSelect = (size) => {
    setSelectedSize(size);
  };

  const toggleFavorite = (id) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite state for the specific card
    }));
  };

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

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);

  return (
    <div>
      <CartPopup isOpen={isCartOpen} closeCart={closeCart} />
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className={isCartOpen ? "blurred" : ""}>
        <Header openCart={openCart} />
        <div className="container">
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
                <div class="BreadcrumbItem flex ">
                  <div class="flex items-center flex-nowrap gap-1.5">
                    <a
                      class="font-semibold text-1.25xs leading-tight underline capitalize bread_crumnbss"
                      data-discover="true"
                      href="/products"
                    >
                      Ring
                    </a>
                  </div>
                </div>
                <FaChevronRight />
                <div class="BreadcrumbItem flex max-w-1/3">
                  <span class="font-light text-1.25xs leading-tight line-clamp-1 whitespace-normal mt-0.5 bread_crumnbs">
                    Halo Diamond Ring
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="d-flex gap-5 pro_sss_gubs ">
            <div className="w-100 sdcsd_saxza">
              <div className="pt-5 d-flex flex-column gap-4 position-sticky top-0 dscsd_insdsss">
                <div className="d-flex gap-4 pro_dddd66">
                  <div className="det_min_cd2">
                    <video
                      src={ringVideo}
                      className="detr_img bg-white"
                      autoPlay
                      loop
                      muted
                    />
                    {/* <img
                    className="detr_img"
                    src={require("../../Images/productdetails.png")}
                  /> */}
                    {/* <div className="sdss_degree">360° Degree View</div> */}
                  </div>
                  <div className="det_min_cds p-5 w-100">
                    <img
                      className="detr_img"
                      src={require("../../Images/pd-2.png")}
                    />
                  </div>
                </div>
                <div className="d-flex gap-4 pro_dddd66">
                  <div className="det_min_cd ">
                    <img
                      className="detr_img_d"
                      src={require("../../Images/15 Model white.png")}
                    />
                  </div>
                  <div className="det_min_cds p-5 w-100">
                    <img
                      className="detr_img_d"
                      src={require("../../Images/1 (8).png")}
                    />
                  </div>
                </div>
                <div className="d-flex gap-4 pro_dddd66">
                  <div className="det_min_cds p-5 xsddcsd">
                    <img
                      className="detr_img_d"
                      src={require("../../Images/1 (6).png")}
                    />
                  </div>
                  <div className="det_min_cd_1">
                    <img
                      className="detr_img_s_s"
                      src={require("../../Images/lastttt.png")}
                    />
                  </div>
                </div>
              </div>
              <div className="mobile-slider">
               
                <Swiper
                  spaceBetween={0}
                  loop={false}
                  speed={1000}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1, // Mobile - 1 item
                    },
                    601: {
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
                  <SwiperSlide className="swiper-slide_sssss">
                    <img
                      className="detr_img slider_ring_sss"
                      src={require("../../Images/pd-2.png")}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide_sssss">
                    <img
                      className="detr_img_d slider_ring_sss"
                      src={require("../../Images/15 Model white.png")}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide_sssss">
                    <img
                      className="detr_img_d slider_ring_sss"
                      src={require("../../Images/1 (8).png")}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide_sssss">
                    <img
                      className="detr_img_d slider_ring_sss"
                      src={require("../../Images/1 (6).png")}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide_sssss">
                    <img
                      className="detr_img_s_s slider_ring_sss"
                      src={require("../../Images/lastttt.png")}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="w-100 pt-5 sdcsd_saxza dscd_54_Dscds">
              <div className="sticky-top" style={{top:'50px'}}>

              <div className="d-flex justify-content-between align-items-center">
                <span className="secrt_1">2 CTW Halo Engagement Ring</span>
                <div>
                  <button className="sav_btn p-2 pe-3 ps-3 dcs_dddd_8888">
                    Save 20%
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
                    <span className="rv_ssss">24 Reviews</span>
                  </div>
                </div>
                <div className="gap-3 d-flex align-items-center df_rrrrr">
                  <span className="sku_dsd">SKU : KD-566498</span>
                  <button className="stk_btn p-2 pe-3 ps-3">IN STOCK</button>
                </div>
              </div>
              <div className="pt-3 pt-sm-4">
                <div className="d-flex gap-3 align-items-center">
                  <span className="main_txt_pb">₹40,000</span>
                  <span className="cut_txt_sc">₹48,000</span>
                </div>
              </div>
              <div className="pt-sm-3 pt-md-3 pt-lg-5">
                <p className="seb_p_g">
                  A halo diamond ring is a classic and sophisticated choice,
                  renowned for its dazzling design and ability to elevate the
                  brilliance of the center stone. This style has become a
                  favorite for engagement rings and statement jewelry due to its
                  captivating charm and versatility.
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
                  {selectedSize}
                </button>
                <ul className="dropdown-menu product_det_menu w-50 mt-1">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("6")}
                    >
                      6
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("7")}
                    >
                      7
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("8")}
                    >
                      8
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("9")}
                    >
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("10")}
                    >
                      10
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("11")}
                    >
                      11
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("12")}
                    >
                      12
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("13")}
                    >
                      13
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("14")}
                    >
                      14
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("15")}
                    >
                      15
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("16")}
                    >
                      16
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("17")}
                    >
                      17
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("18")}
                    >
                      18
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("19")}
                    >
                      19
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("20")}
                    >
                      20
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("21")}
                    >
                      21
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("22")}
                    >
                      22
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("23")}
                    >
                      23
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("24")}
                    >
                      24
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("25")}
                    >
                      25
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("26")}
                    >
                      26
                    </button>
                  </li>
                </ul>
              </div>

              <div className="">
                <hr className="hr_pb_dtl" />
              </div>

              <div className="d-flex justify-content-between align-items-center gap-4">
                <button
                  className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3"
                  onClick={openCart}
                >
                  Add to Cart <BiShoppingBag size={25} />
                </button>
                <div className="d-flex gap-4 align-items-center sdcs_axssx_aswxs">
                  <div
                    className="gohrt_bod p-2"
                    onClick={() => setLiked(!liked)}
                    style={{ cursor: "pointer" }}
                  >
                    {liked ? (
                      <GoHeartFill size={25} className="hert_fffs" />
                    ) : (
                      <GoHeart size={25} className="hert_fff" />
                    )}
                  </div>
                  <div className="gohrt_bod p-2">
                    <GoShareAndroid size={25} className="hert_fff" />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-4 pt-5 fdcvd_life_ttt">
                <div className="icon-box">
                  <img
                    src={require("../../Images/lifetime.png")}
                    alt="Lifetime Exchange"
                  />
                </div>
                <div className="divider"></div>
                <div className="icon-box">
                  <img
                    src={require("../../Images/cirti.png")}
                    alt="Certified Jewellery"
                  />
                </div>
                <div className="divider szcxds_fix"></div>
                <div className="icon-box">
                  <img
                    src={require("../../Images/sev.png")}
                    alt="Secure Payment"
                  />
                </div>
                <div className="divider"></div>
                <div className="icon-box">
                  <img
                    src={require("../../Images/day.png")}
                    alt="30 Days Return"
                  />
                </div>
              </div>

              <div className="pt-5">
                <div className="card det_cddd p-3">
                  <div className="d-flex gap-3 align-items-center align-content-center">
                    <img
                      src={require("../../Images/Ellipse 1687.png")}
                      className="position-relative"
                    />
                    <div className="position-absolute dvtfrvfr">
                      <img src={require("../../Images/Vector (4).png")} />
                    </div>
                    <span className="knoe_www">Know your Setting</span>
                  </div>

                  <div className="d-flex align-items-center gap-3 pt-4 sdsc_knoww">
                    <div className="card det_cd_sec dfc_vardss p-3 w-100">
                      <div className="d-flex align-items-center gap-3">
                        <img src={require("../../Images/Group (1).png")} />
                        <span className="knoe_www_rng">RING DIAMETER</span>
                      </div>
                      <div className="pt-3">
                        <span className="sdjuij">1.62 cm</span>
                      </div>
                      <div className="pt-5">
                        <span className="mes_ddd">
                          Measured at the base of the ring.
                        </span>
                      </div>
                    </div>
                    <div className="card det_cd_sec dfc_vardss p-3 w-100">
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
                          certificate of 925 Silver with <br /> lifetime
                          exchange gaurantee.
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

          <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd mt-md-5 szdcd_99909">
            <span className="category_name">Related Products</span>
            <p className="category_txt">A Touch of Grace for Every Gesture</p>
            <img src={require("../../Images/Groupimg.png")} />
          </div>
          <div className="heder_sec_main d-flex flex-column">
            <div className="row">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-6 col-xl-3 col-sm-6 mb-4 pt-5 asxasx_cards tsrd_didhd_sdcs"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="card prio_card scdscsed_sdss">
                    <div className="card-image-wrapper position-relative">
                      <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                        NEW
                      </button>
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

                      <div
                        className="card-body p-0 d-flex justify-content-center"
                        style={{ height: "100%" }}
                      >
                        <img
                          src={product.imgSrc}
                          className="p-1_proi img-fluid"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column main_cdsss">
                    <span className="mikdec_asdaa pt-3">{product.name}</span>
                    <div className="d-flex align-items-center gap-3 pt-1">
                      <span className="mikdec_asdxsx">{product.price}</span>
                      <span className="mikdec_axsx">{product.cutPrice}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                      <button className="more_btn_dsdd w-50">More Info</button>
                      <button
                        className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3"
                        onClick={openCart}
                      >
                        Add to Cart <BiShoppingBag size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="slider_ssss_fdcdf ">
                <Swiper
                  spaceBetween={0}
                  breakpoints={{
                    1200: { slidesPerView: 4 }, // Large screen - 4 cards
                    992: { slidesPerView: 3 }, // Below 1200px - 3 cards
                    768: { slidesPerView: 3 }, // Below 992px - 2 cards
                    500: { slidesPerView: 2 }, // Below 992px - 2 cards
                    0: { slidesPerView: 1 }, // Mobile - 1 card
                  }}
                  loop={true}
                  // autoplay={{
                  //   delay: 3000, // Change delay as needed (3000ms = 3s)
                  //   disableOnInteraction: false,
                  // }}
                  // modules={[Autoplay]}
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div
                        className="card prio_card scdscsed_sdss"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="card-image-wrapper position-relative">
                          <button className="new_btnddx sle_home_ddd p-1 ms-3 mt-3 position-absolute top-0 start-0">
                            NEW
                          </button>
                          <div
                            className="snuf_dfv text-overlay position-absolute top-0 end-0 p-2 text-white text-center d-flex flex-column mt-2 me-2"
                            onClick={() => toggleFavorite(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {isFavorite[product.id] ? (
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
                            <img
                              src={product.imgSrc}
                              className="p-1_proi img-fluid border-0"
                              alt="Product"
                              style={{ height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-column main_cdsss">
                        <span className="mikdec_asdaa pt-3">
                          {product.name}
                        </span>
                        <div className="d-flex align-items-center gap-3 pt-1">
                          <span className="mikdec_asdxsx">{product.price}</span>
                          <span className="mikdec_axsx">
                            {product.cutPrice}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                          <button className="more_btn_dsdd w-50">
                            More Info
                          </button>
                          <button
                            className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3"
                            onClick={openCart}
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
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailss;
