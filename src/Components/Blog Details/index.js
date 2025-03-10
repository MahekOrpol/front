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

const BlogDetails = () => {
  return (
    <>
      <Header />
      <div>
        <img
          src={require("../../Images/Mask group11.png")}
          className="img_fluid1_banner"
        />
        <div className='banner_text_sss'>
          <h1 className='banner_exx'>Blog Detail</h1>
        </div>
      </div>
      <div className="container pt-5 ">
        <div className="d-flex gap-5">
          <div className="sdncsduchs h-100 position-sticky" style={{ top: '12px' }}>
            <div className="card p-3 shadow-sm border-0 ">
              <h4 className="fw-bold border-bottom pb-2">Popular Posts</h4>
              {posts.map((post, index) => (
                <div key={post.id} className="d-flex align-items-center my-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded"
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

            <div className="card p-3 shadow-sm border-0  mt-5">
              <h4 className="fw-bold border-bottom pb-2">Category</h4>
              <ul
                className="mt-3 d-flex flex-column gap-2 align-items-start ms-0"
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

            <div className="card p-3 shadow-sm border-0  mt-5">
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
            <div className="ssss_ssd11">
              <div className="blog_fade_ds1">
                <img src={require("../../Images/image (25).png")} className="deta_blg_dd" />
              </div>

              <div className="d-flex flex-column gap-2 pt-5">
                <span className="mainj_ss">
                  Jewellery Trends Inspired by Us
                </span>

                <p className="psps">
                  Jewellery has always been a significant part of human culture, transcending its role as mere adornment. From ancient civilizations to modern times, it has carried meanings that go beyond aesthetics, symbolizing identity, emotion, and history.
                </p>
                <p className="psps">
                  Jewellery has always been a significant part of human culture, transcending its role as mere adornment. From ancient civilizations to modern times, it has carried meanings that go beyond aesthetics, symbolizing identity, emotion, and history. A bold necklace or minimalist earrings can reflect an individual’s personality—confident, elegant, or understated. Custom pieces like name pendants or birthstone rings allow wearers to showcase their uniqueness. Every piece of jewellery has a story to tell.
                </p>

              </div>
            </div>

            <div className="pt-4 pb-2">

              <div className="ssjnsec_fd p-3">
                <span className="ens_ddd">Engagement rings, wedding bands, and anniversary gifts commemorate milestones, making the jewellery a lifelong symbol of love and commitment.</span>
              </div>
            </div>

            <div className="d-flex flex-column pt-5">
              <span>
                <img src={require('../../Images/Group 99.png')} />
              </span>
              <span className="ens_ddds pt-4">“Learn how to keep your jewelry shining bright! From cleaning techniques to storage solutions, our blog offers expert advice.  Each item is handcrafted with love and precision, using ethically sourced materials to ensure beauty that you feel good about. Learn how to keep your jewelry shining bright! From cleaning techniques to storage solutions, our blog offers expert advice.”</span>
              <span className="pt-3 d-flex justify-content-between">
                <span className="sedwd">- Jasmin Rosie</span>
                <img src={require('../../Images/Group 100.png')} />
              </span>
            </div>

            <div className="d-flex flex-column pt-5">
              <span className="sdjuue_rrf">Trends to Watch in the Jewelry World</span>
            </div>
            <div className="pt-4">
              <ul className="d-flex flex-row">
                <div className="row sdchhdu">
                  <li>Jewellery Care 101: Keeping Your Pieces Sparkling</li>
                  <li>How to Choose the Perfect Engagement Ring</li>
                  <li>Birthstone Guide: Meaning and Significance</li>
                  <li>Sustainable Jewelry: Making Eco-Friendly Choices</li>
                  <li>Celebrities and Their Iconic Jewelry Moment</li>
                </div>
                <div className="row sdchhdu">
                  <li>The Role of Jewelry in Different Cultures</li>
                  <li>The Intersection of Technology and Jewelry Design</li>
                  <li>Jewelry as an Investment: What to Know Before You Buy</li>
                  <li>Trends to Watch in the Jewelry World</li>
                  <li>Birthstone Guide: Meaning and Significance</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
