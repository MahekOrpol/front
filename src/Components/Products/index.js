import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
  FaAngleDown,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { PiHeartThin } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";

const products = [
  {
    id: 1,
    imgSrc: require("../../Images/2 (4) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 2,
    imgSrc: require("../../Images/1 (9) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 3,
    imgSrc: require("../../Images/17 (1) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 4,
    imgSrc: require("../../Images/583 (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 5,
    imgSrc: require("../../Images/2 (4) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 6,
    imgSrc: require("../../Images/1 (9) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 7,
    imgSrc: require("../../Images/15 (2) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 8,
    imgSrc: require("../../Images/17 (1) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 9,
    imgSrc: require("../../Images/2 (4) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 10,
    imgSrc: require("../../Images/1 (9) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 11,
    imgSrc: require("../../Images/17 (1) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 12,
    imgSrc: require("../../Images/583 (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 13,
    imgSrc: require("../../Images/2 (4) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 14,
    imgSrc: require("../../Images/1 (9) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 15,
    imgSrc: require("../../Images/15 (2) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 16,
    imgSrc: require("../../Images/17 (1) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 17,
    imgSrc: require("../../Images/583 (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 18,
    imgSrc: require("../../Images/2 (4) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 19,
    imgSrc: require("../../Images/1 (9) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 20,
    imgSrc: require("../../Images/15 (2) (1).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
  {
    id: 21,
    imgSrc: require("../../Images/17 (1) (2).png"),
    name: "Two Stone Diamond Ring",
    price: "₹30,000",
    cutPrice: "35000",
  },
];

const Products = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

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
      <Header />
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
        <div className="hdr_csd d-flex flex-column align-items-center produ_sss">
          <span className="produ_shsu">Choose Perfect Ring Style for You</span>
          <p className="pro_p">
            Find the design that speaks to your heart. Explore a variety of
            stunning ring styles to match your unique taste and occasion
          </p>
          <div className="pt-3">
            <button className="ring_for_her">
              <img src={require("../../Images/her.png")} /> Rings for Her
            </button>
            <button className="ring_for_him">
              <img src={require("../../Images/him.png")} /> Rings for Him
            </button>
          </div>
          <hr className="prod_hr mt-5 w-100" />
          <div className="d-flex justify-content-between w-100 mt-3 zsdc_555">
            <div className="d-flex gap-3 filter_pro">
              <button className="flt_btn d-flex gap-3 align-items-center justify-content-center filter_pro">
                <img src={require("../../Images/filter.png")} /> Filter
              </button>
              <button className="hi_to_low p-3 d-flex gap-3 align-items-center justify-content-center filter_pro">
                Select Carat Weight <FaAngleDown />
              </button>
            </div>
            <div className="d-flex gap-3 align-items-center filter_pro2">
              <span className="sho_ddd filter_pro1">Sort by:</span>
              <button className="hi_to_low p-3 d-flex gap-3 align-items-center justify-content-center filter_pro">
                High to Low <FaAngleDown />
              </button>
            </div>
          </div>

          <div className="row pt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-4 asxasx_card"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Each column adapts based on screen size */}
                <div className="card prio_card">
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
                        src={product.imgSrc}
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
                </div>
                <div className="d-flex flex-column main_cdsss">
                  <span className="mikdec_asdaa pt-3">{product.name}</span>
                  <div className="d-flex align-items-center gap-3 pt-1">
                    <span className="mikdec_asdxsx">{product.price}</span>
                    <span className="mikdec_axsx">{product.cutPrice}</span>
                  </div>

                  {hoveredProduct === product.id && (
                    <div className="hover-overlay DFC_NHJ w-100 d-flex">
                      <button className="d-flex align-items-center add-to-crd-dd p-1 mt-2 justify-content-center gap-3">
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
                  {/* </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
