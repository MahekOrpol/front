import React from "react";
import "./index.css";
import logo from "../../Images/logo.png";
import { RiUserLine } from "react-icons/ri";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import homeBanner from "../../Images/banner.png";
import { FaArrowRight, FaChevronRight } from "react-icons/fa6";
import logobnddd from "../../Images/diamondring.png";
import vector from "../../Images/Vector.png";
import { PiHeartThin } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";


const Header = () => {
  return (
    <>
      <div className="header_main">
        <p className="header_text pt-2">Shop Gold and Diamond Jewellery</p>
      </div>

      <div className="heder_sec_main d-flex align-items-center">
        <div className="d-flex align-items-center w-25 gap-4" style={{paddingLeft:'9rem'}}>
          <div className="header_list_tcty">Rings</div>
          <div className="header_list_tcty">Earrings</div>
          <div className="header_list_tcty">Pendant</div>
          <div className="header_list_tcty">Bracelet</div>
          <div className="header_list_tcty">Custom Jewellery</div>
        </div>
        <div className="d-flex justify-content-center w-50">
          <img src={logo} /> 
        </div>
        <div className="w-25 d-flex align-items-center gap-5">
          <div className="user_icon gap-3 d-flex align-items-center">
            <img src={usericon} />
            <div className="d-flex flex-column align-items-center pt-2">
              <span className="sign_txt w-100">Sign In</span>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>

          <div>
            <CiSearch size={25} />
          </div>
          <div>
            <CiHeart size={25} />
          </div>
          <div>
            <IoBagHandleOutline size={25} />
          </div>
        </div>
      </div>

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
            <div className="arrow_bac p-2 d-flex justify-content-center align-items-center">
              <FaArrowRight className="right_arrow_dd" />
            </div>
          </div>
        </div>
      </div>

      <div className="heder_sec_main d-flex flex-column align-items-center pt-3">
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

      <div className="hdr_csd position-relative">
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

      <div className="hdr_csd">
        {/* <div className="sale_offer p-2"> */}
        {/* <div>
            <img src={vector} />̌
          </div>
          <div>
            <span className="scroll_heder">
              Shop Gold and Diamond Jewellery
            </span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">Friendly Sale 30% Off</span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">
              Shop Gold and Diamond Jewellery
            </span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">Friendly Sale 30% Off</span>
          </div>
          <div>
            <img src={vector} />
          </div> */}
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
          </div>
        </div>
        {/* <div className="sale_offer p-2">
          <div>
            <img src={vector} />̌
          </div>
          <div>
            <span className="scroll_heder">
              Shop Gold and Diamond Jewellery
            </span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">Friendly Sale 30% Off</span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">
              Shop Gold and Diamond Jewellery
            </span>
          </div>
          <div>
            <img src={vector} />
          </div>
          <div>
            <span className="scroll_heder">Friendly Sale 30% Off</span>
          </div>
          <div>
            <img src={vector} />
          </div>
        </div> */}
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
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">₹30,000  <span className="word_txtxt2">₹35,000</span> </span>
             <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
              <button className="more_btn_dsdd w-50">More Info</button>
              <button className="d-flex align-items-centyert add-to-crd-dd w-75 p-1 justify-content-center gap-3">Add to Cart <BiShoppingBag size={25} /></button>
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
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">₹30,000  <span className="word_txtxt2">₹35,000</span> </span>
             <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
              <button className="more_btn_dsdd w-50">More Info</button>
              <button className="d-flex align-items-centyert add-to-crd-dd w-75 p-1 justify-content-center gap-3">Add to Cart <BiShoppingBag size={25} /></button>
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
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">₹30,000  <span className="word_txtxt2">₹35,000</span> </span>
             <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
              <button className="more_btn_dsdd w-50">More Info</button>
              <button className="d-flex align-items-centyert add-to-crd-dd w-75 p-1 justify-content-center gap-3">Add to Cart <BiShoppingBag size={25} /></button>
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
              <span className="word_txtxt1 d-flex align-items-center gap-3 pt-1">₹30,000  <span className="word_txtxt2">₹35,000</span> </span>
             <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
              <button className="more_btn_dsdd w-50">More Info</button>
              <button className="d-flex align-items-centyert add-to-crd-dd w-75 p-1 justify-content-center gap-3">Add to Cart <BiShoppingBag size={25} /></button>
             </div>
            </div>
          </div>
        </div>
      </div>


      <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
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


      {/* <div className="heder_sec_main d-flex flex-column align-items-center hdr_csd">
        <span className="category_name">Discover Styles</span>
        <p className="category_txt">New Designs, Same Timeless Elegance</p>
        <img src={require("../../Images/Groupimg.png")} />

        <div className="pt-5 d-flex position-relative w-100 justify-content-center gap-3 cascade-slider_container" id="cascade-slider">
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
            <img
                src={require("../../Images/disco_img.png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
 
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
            <img
               src={require("../../Images/disco_img.png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
                               
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
              src={require("../../Images/disco_img.png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
            
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/disco_img.png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
                                 
          </div>
          <div className="grp_img position-relative box-trens-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <img
                src={require("../../Images/disco_img.png")}
                alt="Dainty Earrings"
                className="img-fluid"
              />
            </div>
                                 
          </div>
        </div>
        <div className="d-flex align-items-center gap-5">
          <FaAngleLeft  size={25}/>
          <span className="
          soli_txt_sccs">Solitare Rings</span>
          <FaAngleRight size={25} />
        </div>
      </div> */}
    </>
  );
};

export default Header;
