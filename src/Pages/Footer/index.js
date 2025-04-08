import React from "react";
import "./index.css";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <div className="footer_mdjj hdr_csdssdrcsdc pt-5">
     
        <div className="justify-content-around d-flex w-100 fccc_asxs_footer">
          <div className=" footer_cont text-white sdc_sdds1">
            <img
              src={require("../../Images/crystovalogowhite (1) 2.png")}
              width={400}
            />
            <p className="sdcdscsdss_ss ms-3 mt-3 ">
              At Crystova Jewellery, we believe that every piece tells a story.
              Inspired by timeless elegance and modern trends, our collections
              are designed to celebrate life’s precious moments.
            </p>
          </div>
          <div className=" footer_cont1 ps-5 text-white sm-ms-0 lg-ms-5 mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds">
            <h2 className="use_sdc">Useful Links</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li>
                <a href="/" className="footr_lnk">
                  Home
                </a>
              </li>
              <li>
                <a href="/about-us" className="footr_lnk">
                  About
                </a>
              </li>
              <li>
                <a href="/products" className="footr_lnk">
                  Shop
                </a>
              </li>
              <li>
                <a href="/blog" className="footr_lnk">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact-us" className="footr_lnk">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className=" footer_cont1 text-white mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds">
            <h2 className="use_sdc">Customer Service</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li>
                <a className="footr_lnk">Shipping</a>
              </li>
              <li>
                <a className="footr_lnk">Order Status</a>
              </li>

              <li>
                <a className="footr_lnk">Exchange</a>
              </li>
            </ul>
          </div>
          <div className=" footer_cont1 text-white mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds1 sdcdsc_fvgtfgv">
            <h2 className="use_sdc">Support</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li>
                <a className="footr_lnk">Privacy Policy</a>
              </li>
              <li>
                <a className="footr_lnk">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div className=" footer_cont pe-3 text-white mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds1 sdcdsc_fvgtfgv">
            <h2 className="use_sdc" style={{whiteSpace:'nowrap'}}>Subscribe our Newsletter</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
             <p className="footer_emi">Join our newsletter for exclusive updates, special offers, and the latest news delivered straight to your inbox!</p>
            <div className="d-flex flex-column w-100 gap-2">
              <input name='email' className="email" placeholder="Enter your Email"/>
              <button className="sub_ss">Subscribe Now</button>
            </div>
            </ul>
          </div>
        </div>

        <div style={{ position: "relative", textAlign: "center" }}>
          <hr className="hr_tg_dd" />
          <div className="d-flex align-items-center gap-4 foote_ic_sddc">
            <div className="footer_icon_kk">
              <FaInstagram color="#fff" size={20} />
            </div>
            <div className="footer_icon_kk">
              <FaFacebookF color="#fff" size={20} />
            </div>
            <div className="footer_icon_kk">
              <RiTwitterXFill color="#fff" size={20} />
            </div>
            <div className="footer_icon_kk">
              <FaYoutube color="#fff" size={20} />
            </div>
            <div className="footer_icon_kk">
              <FaPinterest color="#fff" size={20} />
            </div>
          </div>
        </div>

        <div className="d-flex mb-0 justify-content-center text-white ajreug align-items-center">
          <p className="mb-0 enter_policy_text pt-1">100% Payment protection, Easy return policy</p>
        </div>
        <div className="d-flex justify-content-center mb-0  text-white zsdds_sss55">
          <img
            src={require("../../Images/Group 104.svg").default}
            className=""
          />
        
        </div>

        <hr className="hr_bootom" />
        <div className="pb-2 d-flex justify-content-between sdxc_988_sss">
          <p className="foot_ofcd text-white COPY_RIGHT_LINE w-100">
            Copyright © 2024 <b> Crystova Jewels</b> All rights reserved.<br/>
            Design & Developed by: ORPOL Infotech{" "}
          </p>
          {/* <p className="foot_ofcd text-white">Privacy Policy | Terms of Use </p> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
