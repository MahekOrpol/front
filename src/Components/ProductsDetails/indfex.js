import React from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { FaChevronRight } from "react-icons/fa6";
import "./index.css";

const ProductDetails = () => {
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

        <div className="pt-5 d-flex flex-column gap-4">
          <div className="d-flex gap-4">
            <div className="det_min_cd p-5">
              <img
                className="detr_img"
                src={require("../../Images/productdetails.png")}
              />
            </div>
            <div className="det_min_cds p-5">
              <img
                className="detr_img"
                src={require("../../Images/pd-2.png")}
              />
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="det_min_cd">
              <img
                className="detr_img_d"
                src={require("../../Images/15 Model white.png")}
              />
            </div>
            <div className="det_min_cds p-5">
              <img
                className="detr_img_d"
                src={require("../../Images/1 (8).png")}
              />
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="det_min_cds p-5">
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
      <Footer />
    </div>
  );
};

export default ProductDetails;
