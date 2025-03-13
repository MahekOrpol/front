import React from "react";
import "./index.css";
import Header from "../../Pages/Header";
import { FaArrowRight } from "react-icons/fa6";
import Footer from "../../Pages/Footer";

const posts = [
  {
    id: 1,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (14).png"),
  },
  {
    id: 2,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (15).png"),
  },
  {
    id: 3,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (16).png"),
  },
  {
    id: 4,
    title: "The North Earings Bronze",
    date: "Mar 09 2024",
    image: require("../../Images/image (17).png"),
  },
];

const Blog = () => {
  return (
    <>
      <Header />
      <div>
        <img
          src={require("../../Images/Group 1597884577.png")}
          className="img_fluid1_banner"
        />
        {/* <div className='banner_text_sss'>
          <h1 className='banner_exx'>Blogs</h1>
        </div> */}
      </div>
      <div className="container pt-5 ">
        <div className="d-flex gap-5 blog_main_dddd">
          <div className="sdncsduchs h-100 position-sticky blog_sins_ssss" style={{top:'12px'}}>
            <div className="card p-3 shadow-sm border-0 ">
              <h4 className="fw-bold border-bottom pb-2">Popular Posts</h4>
              {posts.map((post, index) => (
                <div key={post.id} className="d-flex align-items-center my-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded blog_dim_dd"
                    width="100"
                    height="100"
                  />
                  <div className="ms-3">
                    <h6 className="mb-2 fw-bold sdiuuhjus">{post.title}</h6>
                    <span className="sxdexes mt-5">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-3 shadow-sm border-0  mt-5 blog_det_crdsss">
              <h4 className="fw-bold border-bottom pb-2">Category</h4>
              <ul
                className="mt-3 d-flex flex-column gap-2 align-items-start ms-0 dfc_newssss"
                style={{ listStyle: "none", fontWeight: 400, fontSize: "24px" }}
              >
                <li>News</li>
                <li>Accessories</li>
                <li>Collection</li>
                <li>Fashion</li>
                <li>Jewellery</li>
                <li>Trends</li>
              </ul>
            </div>

            <div className="card p-3 shadow-sm border-0  mt-5 blog_det_crdsss">
              <h4 className="fw-bold border-bottom pb-2">Tags</h4>
              <div className="d-flex flex-wrap gap-3 pt-4 pb-2">
                <div className="hjvbxy">Accessories</div>
                <div className="hjvbxy">Jewellery Collection</div>
                <div className="hjvbxy">Trends</div>
                <div className="hjvbxy">Fashion</div>
                <div className="hjvbxy">Collection</div>
              </div>
            </div>
          </div>

          <div className="sdncsduch row">
            <div className="ssss_dddd10">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (20).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (20).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (21).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (22).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (23).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
            <div className="ssss_dddd10 mt-5">
              <div className="blog_fade_ds">
                <img src={require("../../Images/image (24).png")} className="blog_ss_tysn_mg" width={554} />
              </div>

              <div className="d-flex flex-column gap-2 pt-4">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button className="esyh_btn">Design</button>
                  <button className="esyh_btn">Research</button>
                  <button className="esyh_btn">Jewellery</button>
                </div>
                <p className="psps">
                  Suspendisse posuere, diam in bibendum lobortis, turpis ipsum
                  aliquam risus, sit amet dictum ligula lorem non nisl Urna
                  pretium elit mauris cursus Curabitur
                </p>
                <a href="/blog-details" className="red_ddd d-flex gap-2 align-items-center">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
