import React, { useEffect, useState } from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import "./index.css";
import { BiShoppingBag } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import ringVideo from "../../Videos/ring.mp4";

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
const ProductDetails = () => {
  const [liked, setLiked] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState({});

  const [openIndex, setOpenIndex] = useState(null);

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
      <Header />
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
            <div className="pt-5 d-flex flex-column gap-4 position-sticky top-0">
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
          </div>

          <div className="w-100 pt-5 sdcsd_saxza dscd_54_Dscds">
            <div className="d-flex justify-content-between align-items-center">
              <span className="secrt_1">2 CTW Halo Engagement Ring</span>
              <div>
                <button className="sav_btn p-2 pe-3 ps-3 dcs_dddd_8888">Save 20%</button>
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
                brilliance of the center stone. This style has become a favorite
                for engagement rings and statement jewelry due to its
                captivating charm and versatility.
              </p>
            </div>
            {/* <div className="p-3 sec_pb w-75">
              <div className="d-flex align-items-center justify-content-between pt-2 sdcdc align-items-sm-start align-items-md-start align-items-lg-center produ_detl_sss">
                <span className="your_pncd">Your pincode</span>
                <div>
                  <input type="text" name="pincode" className="oib_inout p-1" />
                  <button className="pncd_btn p-1 pe-3 ps-3">Check</button>
                </div>
              </div>
              <p className="pv_txtsss pt-3">
                Provide pincode for delivery date and nearby stores!
              </p>
            </div> */}
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

            {/* <div>
              <span className="dim_txt_sjs">Diamond Purity:</span>
            </div>

            <div className="d-flex align-items-center gap-3 pt-3 flex-wrap">
              <div className="round_ddd p-3">
                <span className="a_sssss">1ctw</span>
              </div>
              <div className="round_ddd p-3">
                <span className="a_sssss">2ctw</span>
              </div>
              <div className="round_ddd p-3">
                <span className="a_sssss">3ctw</span>
              </div>
              <div className="round_ddd p-3">
                <span className="a_sssss">4ctw</span>
              </div>
              <div className="round_ddd p-3">
                <span className="a_sssss">5ctw</span>
              </div>
            </div>

            <div className="pt-2">
              <hr className="hr_pb_dtl" />
            </div>

            <div>
              <span className="dim_txt_sjs">Diamond Shape:</span>
            </div>

            <div className="d-flex align-items-center gap-3 pt-3 flex-wrap">
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img src={require("../../Images/Round-New 1.png")} />
                </div>
                <span className="pt-2">Round</span>
              </div>
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img src={require("../../Images/princess-cut-diamond.png")} />
                </div>
                <span className="pt-2">Princess</span>
              </div>
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img src={require("../../Images/pear-shape-diamond.png")} />
                </div>
                <span className="pt-2">Pear</span>
              </div>
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img
                    src={require("../../Images/oval-single-84e219e56d-500x500.png")}
                  />
                </div>
                <span className="pt-2">Oval</span>
              </div>
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img
                    src={require("../../Images/gia-certified-real-cushion-cut-diamond (1).png")}
                  />
                </div>
                <span className="pt-2">Cushion</span>
              </div>
              <div className="d-flex align-items-center flex-column  diamon_sss ">
                <div className="diamond_shape">
                  <img
                    src={require("../../Images/emerald-cut-loose-diamond.png")}
                  />
                </div>
                <span className="pt-2">Emerald</span>
              </div>
            </div> */}
            {/* <div className="pt-2">
              <hr className="hr_pb_dtl" />
            </div> */}

            <div className="d-flex justify-content-between align-items-center gap-4">
              <button className="d-flex align-items-center add-to-crd-dd_dd w-100 p-2 justify-content-center gap-3">
                Add to Cart <BiShoppingBag size={25} />
              </button>
              <div className="d-flex gap-4 align-items-center">
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
                        It comes with the authenticity and gaurantee certificate
                        of 925 Silver with <br /> lifetime exchange gaurantee.
                      </span>
                    </div>
                  </div>
                </div>
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
                  <span className="knoe_www">Know your Stone</span>
                </div>

                <div className="d-flex align-items-center gap-3 pt-4 sdsc_knoww">
                  <div className="card det_cd_sec_ddd p-3 w-100">
                    <div className="d-flex align-items-center gap-3">
                      <span className="knoe_www_rng">DIAMOND SHAPE</span>
                    </div>
                    <div className="pt-2">
                      <span className="sdjuij1 diam_dd_fin">Circle</span>
                    </div>
                  </div>
                  <div className="card det_cd_sec_ddd p-3 w-100">
                    <div className="d-flex align-items-center gap-3">
                      <span className="knoe_www_rng">DIAMOND SIZE</span>
                    </div>
                    <div className="pt-2">
                      <span className="sdjuij1 w-25 diam_dd_fin">
                        Moissanite Diamond <br /> 0.18 ctw
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 pt-3">
                  <div className="card det_cd_sec_ddd p-3 w-100 ins_ssuxj_55">
                    <div className="d-flex align-items-center gap-3">
                      <span className="knoe_www_rng">DIAMOND WEIGHT</span>
                    </div>
                    <div className="pt-2">
                      <span className="sdjuij1 diam_dd_fin">0.18 Ct Approx</span>
                    </div>
                  </div>
                  <div className="card det_cd_sec_ddd p-3 w-100 ins_ssuxj_55">
                    <div className="d-flex align-items-center gap-3">
                      <span className="knoe_www_rng">DIAMOND PURITY</span>
                    </div>
                    <div className="pt-2">
                      <span className="sdjuij1 diam_dd_fin">4 ctw</span>
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
                      <div className="accordion-body srfferc">{faq.answer}</div>
                    </div>
                  </div>
                ))}
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
          <div className="row pt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-6 col-xl-3 col-sm-6 mb-4 asxasx_cards"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Each column adapts based on screen size */}
                <div className="card prio_card scdscsed_sdss">
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
                    <div className="card-body d-flex justify-content-center ">
                      <img
                        src={product.imgSrc}
                        className="p-1_proi"
                        alt="Product"
                      />
                      {/* {hoveredProduct === product.id && (
                        <div className="hover-overlay w-100 d-flex">
                          <button className="d-flex align-items-center add-to-crd-dss p-2 mt-2 justify-content-center gap-3">
                            Add to Cart <BiShoppingBag size={25} />
                          </button>
                        </div>
                      )} */}
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
                    <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                      Add to Cart <BiShoppingBag size={25} />
                    </button>
                  </div>
                  {/* </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
