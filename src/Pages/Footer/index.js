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
      <div className="footer_mdjj hdr_csds pt-5">

        <div className="gbhuji8usdjikijd d-flex justify-content-between p-3 pe-5 ps-5">
            <div>
            <span className="main-dxbd">Subscribe to get Updated</span>
            <p className="mt-2 sdcdscsd" style={{width:'85%'}}>
            Be the first to know about exclusive offers, new arrivals, and expert jewelry tips.
            </p>
            </div>
            <div>

            <div className="d-flex align-items-center gap-2" style={{whiteSpace:'noWrap'}}>
            <input type="text" name="pincode" className="oizb_inout p-2" />
            <butto className='suv_butn p-2'>
            Subscribe Now
            </butto>
            </div>
            </div>
        </div>

        <div className="d-flex justify-content-around pt-5">
          <div className="col-3 text-white">
            <img
              src={require("../../Images/crystovalogowhite (1) 2.png")}
              width={400}
            />
            <p className="sdcdscsd ms-3 mt-3" style={{ width: "442px" }}>
              At Crystova Jewellery, we believe that every piece tells a story.
              Inspired by timeless elegance and modern trends, our collections
              are designed to celebrate life’s precious moments.
            </p>
          </div>
          <div className="col-2 text-white">
            <h2 className="use_sdc">Useful Links</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li>
                <a className="footr_lnk">Home</a>
              </li>
              <li>
                <a className="footr_lnk">About</a>
              </li>
              <li>
                <a className="footr_lnk">Shop</a>
              </li>
              <li>
                <a href="/blog" className="footr_lnk">Blog</a>
              </li>
              <li>
                <a className="footr_lnk">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-2 text-white">
            <h2 className="use_sdc">Customer Service</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li>
                <a className="footr_lnk">Refund</a>
              </li>
              <li>
                <a className="footr_lnk">Shipping</a>
              </li>
              <li>
                <a className="footr_lnk">Order Status</a>
              </li>
              <li>
                <a className="footr_lnk">FAQ</a>
              </li>
              <li>
                <a className="footr_lnk">Exchange</a>
              </li>
            </ul>
          </div>
          <div className="col-2 text-white">
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
              <li>
                <a className="footr_lnk">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>

        {/* <hr className="hr_tg_dd "/>
        <div className="d-flex align-items-center gap-4 foote_ic_sddc ">
            <div className="footer_icon_kk">
            <FaInstagram color="#fff" size={20}/>
            </div>
            <div className="footer_icon_kk">
            <FaFacebookF color="#fff" size={20}/>
            </div>
            <div className="footer_icon_kk">
            <RiTwitterXFill color="#fff" size={20}/>
            </div>
            <div className="footer_icon_kk">
            <FaYoutube color="#fff" size={20}/>
            </div>
            <div className="footer_icon_kk">
            <FaPinterest color="#fff" size={20}/>
            </div>
        </div> */}

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

        <div className="d-flex mb-0 justify-content-center text-white ajreug">
          <p>100% Payment protection, Easy return policy</p>
        </div>
        <div className="d-flex mb-0 justify-content-center text-white gap-4 pt-2">
          <img
            src={require("../../Images/images.png")}
            className="pay_ic_sdcxsd"
          />
          <img
            src={require("../../Images/sdcesdc.png")} 
           className="pay_ic_sdcxsd"

          />
          <img
            src={require("../../Images/phonepay.jpg")}
            className="pay_ic_sdcxsd"
          />
          <img
            src={require("../../Images/1200px-Rupay-Logo (1).png")}
            className="pay_ic_sdcxsd"
          />
          <img
            src={require("../../Images/marstcd.png")}
            className="pay_ic_sdcxsd"
          />
          <img
            src={require("../../Images/Mobikwik.png")}
            className="pay_ic_sdcxsd1"
          />
          <img
            src={require("../../Images/visa-logo-800x450.png")}
            className="pay_ic_sdcxsd"
          />
        </div>

        <hr className="hr_bootom" />
        <div className="pb-2 d-flex justify-content-between">
            <p className="foot_ofcd text-white">Copyrighted© 2024 Developed by Orpol Infotech </p>
            <p className="foot_ofcd text-white">Privacy Policy | Terms of Use </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
