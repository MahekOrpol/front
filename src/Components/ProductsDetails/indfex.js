import React from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import { FaChevronRight, FaStar } from "react-icons/fa6";
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

        <section className="d-flex gap-5">
          <div className="w-100">
            <div className="pt-5 d-flex flex-column gap-4">
              <div className="d-flex gap-4">
                <div className="det_min_cd p-5 w-100">
                  <img
                    className="detr_img"
                    src={require("../../Images/productdetails.png")}
                  />
                  <div className="sdss_degree">360° Degree View</div>
                </div>
                <div className="det_min_cds p-5 w-100">
                  <img
                    className="detr_img"
                    src={require("../../Images/pd-2.png")}
                  />
                </div>
              </div>
              <div className="d-flex gap-4">
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
              <div className="d-flex gap-4">
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

          <div className="w-100 pt-5">
            <div className="d-flex justify-content-between align-items-center">
              <span className="secrt_1">2 CTW Halo Engagement Ring</span>
              <div>
                <button className="sav_btn p-2 pe-3 ps-3">Save 20%</button>
              </div>
            </div>
            <div className="pt-3 d-flex gap-5 align-items-center">
              <div className="d-flex justify-content-left align-items-center gap-3">
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
              <div>
                <span className="sku_dsd">SKU : KD-566498</span>
              </div>
              <div>
                <button className="stk_btn p-2 pe-3 ps-3">IN STOCK</button>
              </div>
            </div>
            <div className="pt-3">
              <div className="d-flex gap-3 align-items-center">
                <span className="main_txt_pb">₹40,000</span>
                <span className="cut_txt_sc">₹48,000</span>
              </div>
            </div>
            <div className="pt-5">
              <p className="seb_p_g">
                A halo diamond ring is a classic and sophisticated choice,
                renowned for its dazzling design and ability to elevate the
                brilliance of the center stone. This style has become a favorite
                for engagement rings and statement jewelry due to its
                captivating charm and versatility.
              </p>
            </div>
            <div className="p-3 sec_pb w-50">
              <div className="d-flex align-items-center justify-content-between pt-2">
                <span className="your_pncd">Your pincode</span>
                <div>
                  <input type="text" name="pincode" className="oib_inout p-1" />
                  <button className="pncd_btn p-1 pe-3 ps-3">Check</button>
                </div>
              </div>
              <p className="pv_txtsss pt-3">
                Provide pincode for delivery date and nearby stores!
              </p>
            </div>
            <div className="pt-2">
              <hr className="hr_pb_dtl" />
            </div>

            <div class="dropdown ">
              <button
                class="btn btn-secondary dropdown-toggle size_drp_dpwn d-flex align-items-center w-50 justify-content-between p-2 ps-4 pe-4"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select size
              </button>
              <ul class="dropdown-menu product_det_menu w-50 mt-1 ">
                <li>
                  <a class="dropdown-item" href="#">
                    6
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    7
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    8
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    9
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    10
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    11
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    12
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    13
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    14
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    15
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    16
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    17
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    18
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    19
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    20
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    21
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    22
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    23
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    24
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    25
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    26
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <hr className="hr_pb_dtl" />
            </div>

            <div>
              <span className="dim_txt_sjs">Diamond Purity:</span>
            </div>

            <div className="d-flex align-items-center gap-3 pt-3">
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

            <div className="d-flex align-items-center gap-3 pt-3">
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/Round-New 1.png")} />
                </div>
                <span className="pt-2">Round</span>
              </div>
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/princess-cut-diamond.png")} />
                </div>
                <span className="pt-2">Princess</span>
              </div>
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/pear-shape-diamond.png")} />
                </div>
                <span className="pt-2">Pear</span>
              </div>
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/oval-single-84e219e56d-500x500.png")} />
                </div>
                <span className="pt-2">Oval</span>
              </div>
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/gia-certified-real-cushion-cut-diamond (1).png")} />
                </div>
                <span className="pt-2">Cushion</span>
              </div>
              <div className="d-flex align-items-center flex-column ">
                <div className="diamond_shape">
                  <img src={require("../../Images/emerald-cut-loose-diamond.png")} />
                </div>
                <span className="pt-2">Emerald</span>
              </div>
            </div>
            <div className="pt-2">
              <hr className="hr_pb_dtl" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
