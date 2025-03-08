import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import $ from "jquery";
import homeBanner from "../../Images/banner.png";
import { FaArrowRight, FaChevronRight, FaStar } from "react-icons/fa6";
import logobnddd from "../../Images/diamondring.png";
import vector from "../../Images/Vector.png";
import { PiHeartThin } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Header from "../../Pages/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CiStar } from "react-icons/ci";
import Footer from "../../Pages/Footer";

const images = [
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
  require("../../Images/ring222.png"),
];

const Home = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); // Store Swiper instance

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <div>
      <Header />
      <div>
        <img src={homeBanner} className="img_fluid1_banner" />
        <div className="text_dsfcd ">
          <span className="banner_text w-50 justify-content-center d-flex">
            Where Elegance Finds <br /> Extraordinary Artistry
          </span>
          <span className="banner_text1 w-50 justify-content-center d-flex">
            From selecting the perfect gemstone to finalizing every intricate
            detail, we’ll work with you to create a one-of-a-
            <br />
            kind masterpiece. Discover exquisite designs, from classic to
            contemporary, tailored for every occasion.
          </span>

          <div className="banner_text2 w-50 justify-content-start d-flex gap-3">
            <button className="get-strt_btn ">Let’s Get Started</button>
            <div className="arrow_bac p-2 d-flex justify-content-center align-items-center ">
              <FaArrowRight className="right_arrow_dd" />
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Categories</span>
        <p className="category_txt">Radiance Fits for Everyone</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative">
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image.png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Dainty Earrings</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image (1).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Radiant Rings</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/image (2).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Festive Pendants</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/Mask group.png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Diamond Bracelet</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
          <div className="grp_img position-relative">
            <img
              src={require("../../Images/Mask group (1).png")}
              alt="Dainty Earrings"
              className="img-fluid"
            />
            <div
              className="text-overlay position-absolute top-50 translate-middle1 text-white text-center d-flex flex-column"
              style={{ left: "121px" }}
            >
              <span className="dai_txt">Men’s Ring</span>
              <a href="#" className="shop_now_lnk">
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hdr_csd1 position-relative">
        <div className="position-relative">
          <img
            src={require("../../Images/Rectangle 105464.png")}
            className="ractangle_box pt-5"
          />
          <div className="bn_sdc w-25 container">
            <span className="banner_txxts_hom">
              Buy the Ring of <br />
              your Choice
            </span>
            <hr className="hr_bnr w-25" />
            <span className="hszhh">
              Spark your imagination with recently <br /> purchased engagement
              rings.
            </span>
            <button className="text-white explore_btn d-flex align-items-center gap-3 mt-3">
              Explore Rings <FaArrowRight />
            </button>

            <div className=" bn_sdc1">
              <img src={logobnddd} />
            </div>

            <div className="class-txt-sss">CLASSIC SILVER</div>
            <div className="class-txt-sss1">PIECES</div>
          </div>
        </div>
      </div>

      <div className="hdr_csd1">
        <div className="scrolling-wrapper">
          <div className="scroll-content">
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="d-flex ">
          <div className="position-relative">
            <img
              src={require("../../Images/image (3).png")}
              className="img-fluid"
              alt="Main Image"
            />

            <div className="overlay-img11">
              <img
                src={require("../../Images/Rectangle 105457.png")}
                className="img-fluid"
                alt="Overlay"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center gap-5 ps-5 ms-5">
            <span className="fest_fff">FESTIVAL SALE OFFERS</span>
            <div className="txt_frss d-flex flex-column gap-3">
              <span>Upto 25% Off on All Jewelry Favorites</span>
              <span>Limited Time!</span>
            </div>
            <span className="txt_par">
              Diamonds come in a variety of shapes, each offering unique beauty
              and appeal.
              <br /> Here’s a guide to different shapes of diamond rings
            </span>
            <button className="w-25 spg_nb_sle">
            Shop Now
            </button>
          </div>
        </div>

        <div className="scrolling-wrapper">
          <div className="scroll-content">
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">
                Shop Gold and Diamond Jewellery
              </span>
            </div>
            <div className="scroll-item">
              <img src={vector} alt="icon" />
              <span className="scroll_heder">Friendly Sale 30% Off</span>
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Trending Collection</span>
        <p className="category_txt">The Latest looks, Crafted to Perfection</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div className="grp_img position-relative box-trens-1">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image 98.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>

            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-1">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/tre-2.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-1">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image 100.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>

          <div className="grp_img position-relative box-trens-1">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/trending-5.png")}
                alt="Dainty Earrings"
                className="img-fluid1"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle2 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd">NEW</button>
            </div>
            <div className="snuf_dfv text-overlay position-absolute top-0 translate-middle3 p-1 text-white text-center d-flex flex-column">
              <PiHeartThin className="heart-icon_ss" />
            </div>
            <div className="pt-3">
              <span className="word_txtxt">Two Stone Diamond Ring</span>
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">
                ₹30,000 <span className="word_txtxt2">₹35,000</span>{" "}
              </span>
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                <button className="more_btn_dsdd w-50">More Info</button>
                <button className="d-flex align-items-center add-to-crd-dd w-75 p-1 justify-content-center gap-3">
                  Add to Cart <BiShoppingBag size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd1 mt-5">
        <span className="category_name">New Arrivals</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image (4).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>

            <div
              className="text-overlay position-absolute top-0 translate-middle4 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd_arvl">Dazzling Earrings</button>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image (5).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle4 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd_arvl">Elegant Bracelets</button>
            </div>
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/Mask group (2).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle4 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd_arvl">Chic Necklaces</button>
            </div>
          </div>

          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/image (6).png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
            <div
              className="text-overlay position-absolute top-0 translate-middle4 text-white text-center d-flex flex-column"
              style={{ left: "146px" }}
            >
              <button className="new_btndd_arvl">Exquisite Rings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Discover Styles</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="carousel-container pt-5">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            // pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <img src={img} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="carousel-controls d-flex justify-content-center gap-5"
            style={{ cursor: "pointer" }}
          >
            <div ref={prevRef}>
              <FaAngleLeft size={25} />
            </div>
            <span className="soli_txt_sccs">Solitare Rings</span>
            <div ref={nextRef}>
              <FaAngleRight size={25} />
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Gifting Guide</span>
        <p className="category_txt">Jewelry makes the perfect gift</p>
        {/* <img src={require("../../Images/Groupimg.png")} /> */}
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative w-100 justify-content-center">
          <div className=" position-relative box-trens-2 w-25 ">
            <div className="d-flex justify-content-center align-items-center h-100 first_bnnrrr">
              <img
                // src={require("../../Images/image (7).png")}
                src={require("../../Images/earings.png")}
                alt="Dainty Earrings"
                className="img-fluid fir_bnr_rd"
              />
            </div>

            <div className="text-overlay position-absolute top-50 translate-middle_frst text-white text-center d-flex flex-column gap-1">
              <span className="bird_ddc">Birthday Gifts</span>
              <a href="#" className="shop_now_lnk" style={{color:'#fff'}}>
                SHOP NOW <FaChevronRight />
              </a>
            </div>
          </div>

          <div className="w-25">
            <div className=" position-relative box-trens-2 sec_bbbb">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/birth.png")}
                  // src={require("../../Images/image 155.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec1 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk " style={{color:'#fff'}}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
            <div className=" position-relative box-trens-2 sec_bbbb1">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/bar.png")}
                  // src={require("../../Images/image 157.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec2 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk" style={{color:'#fff'}}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
          </div>

          <div className="w-25">
            <div className=" position-relative box-trens-2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/chn.png")}
                  // src={require("../../Images/image 156.png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec3 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk_lst " style={{color:'#fff'}}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
            <div className=" position-relative box-trens-2 sec_bbbb2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={require("../../Images/ring.png")}
                  // src={require("../../Images/image (8).png")}
                  alt="Dainty Earrings"
                  className="img-fluid fir_bnr_rd"
                />
              </div>
              <div className="text-overlay position-absolute top-50 translate-middle_sec3 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk_lst " style={{color:'#fff'}}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
            </div>
          </div>

          <div className=" position-relative box-trens-2 w-25">
            <div className="d-flex justify-content-center align-items-center last_bnnn">
              <img
                src={require("../../Images/diam.png")}
                // src={require("../../Images/image 159.png")}
                alt="Dainty Earrings"
                className="img-fluid fir_bnr_rd"
              />
            </div>
            <div className="text-overlay position-absolute top-50 translate-middle_sec4 text-white text-center d-flex flex-column gap-1">
                <span className="bird_ddc">Birthday Gifts</span>
                <a href="#" className="shop_now_lnk_lst " style={{color:'#fff'}}>
                  SHOP NOW <FaChevronRight />
                </a>
              </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Client Testimonial</span>
        <p className="category_txt">What our Client’s say about us</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div className="card w-25 testimonial-card mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              {/* Star Ratings */}
              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
          <div className="card w-25 testimonial-card1 mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              {/* Star Ratings */}
              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
          <div className="card w-25 testimonial-card2 mt-5">
            <div className="card-body pt-5">
              <h5 className="card-title text-center emi_ffcc">Emily Carol</h5>
              <p className="card-text sdcdscsd text-center">
                I wanted a custom bracelet to honor my daughter’s birth, and the
                designers exceeded my expectations. They listened to every
                detail I envisioned and brought it to life. It’s a masterpiece
                I’ll cherish forever.
              </p>
              <p className="text-center sdcdscsd">Client</p>

              {/* Star Ratings */}
              <div className="d-flex justify-content-center align-items-center">
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <FaStar color="#DBB439" />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3">
          <div class="card w-25 dfrderf_mhk">
            <div class="card-body pt-5">
              <h5 class="card-title scerff_sdcds d-flex justify-content-center">Emily Carol</h5>
              <p class="card-text szdcsdz_txtx">
              I wanted a custom bracelet to honor my daughter’s birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought 
              it to life. It’s a masterpiece I’ll cherish forever.
              </p>
              
              <p className="cl_sdcsd">Client</p>
             <div className="d-flex justify-content-center align-items-center">
             <FaStar color="#DBB439"/>
             <FaStar color="#DBB439"/>
             <FaStar color="#DBB439"/>
             <CiStar />
             <CiStar />
             </div>
            </div>
          </div>
          
          
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
