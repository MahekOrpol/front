import React from "react";
import "./index.css";
import Accordion from "@mui/material/Accordion";
import { IoLogoWhatsapp } from "react-icons/io";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const disableRightClick = (e) => e.preventDefault();
  const phoneNumber = "919081139039";
  const message = `Hello! 👋 I hope you're doing well.
 I'm interested in your jewellery collection and would like to know more about your designs and customization options. Please share the details.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  const handleWhatsappClick = () => {
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="footer_mdjj hdr_csdssdrcsdc pt-5 d-none d-md-block">
        <div className="justify-content-around d-flex w-100 fccc_asxs_footer">
          <div className=" footer_cont text-white sdc_sdds1">
            <img
              onContextMenu={disableRightClick}
              //  draggable="false"
              loading="eager"
              src="/Images/crystovalogowhite (1) 2.png"
              width={400}
              alt="footer"
              onClick={() => navigate("/")}
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
              <li className="bcdhb_jcb">
                <a href="/" className="footr_lnk">
                  Home
                </a>
              </li>
              <li className="bcdhb_jcb">
                <a href="/about-us" className="footr_lnk">
                  About
                </a>
              </li>
              <li className="bcdhb_jcb">
                <a href="/products" className="footr_lnk">
                  Shop
                </a>
              </li>
              <li className="bcdhb_jcb">
                <a href="/blog" className="footr_lnk">
                  Blog
                </a>
              </li>
              <li className="bcdhb_jcb">
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
              <li className="bcdhb_jcb">
                <a className="footr_lnk">Shipping</a>
              </li>
              <li className="bcdhb_jcb">
                <a className="footr_lnk" href="/Order">
                  Order Status
                </a>
              </li>

              {/* <li className="bcdhb_jcb">
                <a className="footr_lnk">Exchange</a>
              </li> */}
            </ul>
          </div>
          <div className=" footer_cont1 text-white mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds1 sdcdsc_fvgtfgv">
            <h2 className="use_sdc">Support</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <li className="bcdhb_jcb">
                <a className="footr_lnk" href="/privacy-policy">
                  Privacy Policy
                </a>
              </li>
              <li className="bcdhb_jcb">
                <a className="footr_lnk" href="/terms-and-conditions">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className=" footer_cont pe-3 text-white mt-md-3 mt-sm-3 mt-lg-0 sdc_sdds1 sdcdsc_fvgtfgv">
            <h2 className="use_sdc">Connect With Us</h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <p className="footer_emi ">
                Stay connected and stay inspired - reach out to us for updates,
                support, or collaborations. We're here to listen and help you
                thrive.
              </p>
              <div className="d-flex flex-column w-100 gap-2">
                {/* <input
                  name="email"
                  className="email"
                  placeholder="Enter your Email"
                /> */}
                <button
                  className="sub_ss d-flex align-items-center gap-3"
                  onClick={handleWhatsappClick}
                >
                  <span className="whatsapp-icon">
                    <IoLogoWhatsapp size={30} />
                  </span>
                  <span className="d-flex align-items-center">
                    Get in Touch
                  </span>
                </button>
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
          <p className="mb-0 enter_policy_text pt-1">
            100% Payment protection, Easy return policy
          </p>
        </div>
        <div className="d-flex justify-content-center mb-0  text-white zsdds_sss55">
          <img
            onContextMenu={disableRightClick}
            //  draggable="false"
            loading="eager"
            src="/Images/Group 104.svg"
            className=""
            alt="footer"
          />
        </div>

        <hr className="hr_bootom" />
        <div className="pb-2 d-flex justify-content-between sdxc_988_sss">
          <p className="foot_ofcd text-white COPY_RIGHT_LINE w-100">
            Copyright © 2024 <b> Crystova Jewels</b> All rights reserved.
            <br />
            Design & Developed by: ORPOL Infotech{" "}
          </p>
          {/* <p className="foot_ofcd text-white">Privacy Policy | Terms of Use </p> */}
        </div>
      </div>
      <div className="footer_mdjj_1 hdr_csdssdrcsdc pt-4 d-md-none">
        <div className="justify-content-center align-items-center d-flex flex-column w-100 fccc_asxs_footer">
          <div className=" footer_cont_1 text-white sdc_sdds1">
            <img
              onContextMenu={disableRightClick}
              //  draggable="false"
              loading="eager"
              src="/Images/crystovalogowhite (1) 2.png"
              width={400}
              alt="footer"
              onClick={() => navigate("/")}
            />
          </div>
          <p className="sdcdscsdss_ss_1 mt-3 " style={{ width: "88%" }}>
            At Crystova Jewellery, we believe that every piece tells a story.
            Inspired by timeless elegance and modern trends, our collections are
            designed to celebrate life’s precious moments.
          </p>

          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown style={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" className="use_sdc_2">
                Useful Links
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul
                className="my-0 pb-4"
                style={{ listStyle: "none", paddingLeft: "0rem" }}
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
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown style={{ color: "white" }} />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" className="use_sdc_2">
                Customer Service
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul
                className="my-0 pb-4"
                style={{ listStyle: "none", paddingLeft: "0rem" }}
              >
                <li>
                  <a className="footr_lnk">Shipping</a>
                </li>
                <li>
                  <a className="footr_lnk">Order Status</a>
                </li>
                {/* <li>
                  <a className="footr_lnk">Exchange</a>
                </li> */}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion className="support_acc">
            <AccordionSummary
              expandIcon={<FaChevronDown style={{ color: "white" }} />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span" className="use_sdc_2">
                Support
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul
                className="my-0 pb-4"
                style={{ listStyle: "none", paddingLeft: "0rem" }}
              >
                <li>
                  <a className="footr_lnk" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="footr_lnk" href="/terms-and-conditions">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <div className="d-flex flex-column align-items-center mbdjc_jsc text-white mt-3 justify-content-center">
            <h2 className="use_sdc_1 d-flex justify-content-center">
              Connect With Us
            </h2>
            <ul
              style={{ listStyle: "none", paddingLeft: "0rem" }}
              className="doof_dd pt-2"
            >
              <p className="footer_emi_1">
                Stay connected and stay inspired - reach out to us for updates,
                support, or collaborations. We're here to listen and help you
                thrive.
              </p>
              <button
                className="sub_ss d-flex align-items-center gap-3"
                onClick={handleWhatsappClick}
              >
                <span className="whatsapp-icon">
                  <IoLogoWhatsapp size={30} />
                </span>
                <span className="d-flex align-items-center">Get in Touch</span>
              </button>
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
          <p className="mb-0 enter_policy_text pt-1">
            100% Payment protection, Easy return policy
          </p>
        </div>
        <div className="d-flex justify-content-center mb-0  text-white zsdds_sss55">
          <img
            onContextMenu={disableRightClick}
            //  draggable="false"
            loading="eager"
            src="/Images/Group 104.svg"
            className=""
            alt="footer"
          />
        </div>

        <hr className="hr_bootom" />
        <div className="pb-2 d-flex flex-column justify-content-between sdxc_988_sss">
          <p className="foot_ofcd_1 text-white COPY_RIGHT_LINE w-100">
            Copyright © 2025 <b> Crystova Jewels</b> All rights reserved.
          </p>
          <p className="foot_ofcd_1 text-white COPY_RIGHT_LINE w-100">
            Design & Developed by: ORPOL Infotech{" "}
          </p>
          {/* <p className="foot_ofcd text-white">Privacy Policy | Terms of Use </p> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
