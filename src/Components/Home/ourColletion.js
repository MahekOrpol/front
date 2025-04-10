import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OueColletion = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static image imports (keep as before)
  const productImages = [
    { img: require("../../Images/our.png"), label: "Diamond Bracelet",path:'Bracelet' },
    { img: require("../../Images/our2.png"), label: "Diamond Earrings" ,path:'Earrings'},
    { img: require("../../Images/our3.png"), label: "Couple Rings" ,path:'Rings'},
  ];

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://crystova.cloudbusiness.cloud/api/v1/product/get"
  //       );
  //       console.log(response);
  //       setProducts(response.data.slice(0, 3)); // Get first 3 products
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?categoryName=${category}`);
  };

  return (
    <div className="our_colles">
      <div className="banner-img-op">
        <div className="d-flex align-items-center gap-3 dfvdfvfv">
          <div className="d-flex flex-column gap-3 dfscdfsc_tyhdc_defrvfv">
            <span className="our_collection_text">Our Collection</span>
            <p className="our_text_ddddd">
              Lorem ipsum dolor sit amet consectetur. Eget sed consectetur magna
              id sus consectetur. Eget sed consectetur magna id sus
            </p>
            <button
              className="see_more d-block"
              onClick={() => navigate("/products")}
            >
              See More
            </button>
          </div>
          <div className="d-flex justify-content-between gap-4 w-100 defV_ybsxc">
            {productImages.map((product, index) => {
              // let price = "0.00";
              // if (product.salePrice) {
              //   if (
              //     typeof product.salePrice === "object" &&
              //     "$numberDecimal" in product.salePrice
              //   ) {
              //     price = parseFloat(product.salePrice.$numberDecimal).toFixed(
              //       2
              //     );
              //   } else {
              //     price = parseFloat(product.salePrice).toFixed(2);
              //   }
              // }

              return (
                <div
                  key={product._id}
                  className="d-flex flex-column gap-2 banner_tezxt"
                  onClick={() => handleCategoryClick(product.path)}
                >
                  <img
                  src={product.img}
                    className="our_colle_iumg_ssss"
                    alt={product.label}
                  />
                  <span className="our_coll_head">
                  {product.label.length > 20 ? product.label.substring(0, 20) + "..." : product.label}
                  </span>
                  {/* <span className="our_coll_head_tl">₹ {price}</span> */}
                </div>
              );
            })}
          </div>
          <button
            className="see_more_mobile d-none"
            onClick={() => navigate("/products")}
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OueColletion;
