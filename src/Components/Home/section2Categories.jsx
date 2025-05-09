import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import './index.css';

const Section2Categories = () => {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = React.useCallback(async () => {
    const res = await axios.get(
      "https://dev.crystovajewels.com/api/v1/category/get"
    );
    setCategories(res.data);
  }, []);
  const handleCategoryClick = React.useCallback(
    (category) => {
      navigate(`/products?categoryName=${category}`);
    },
    [navigate]
  );

  return (
    <div className="d-flex flex-column align-items-center hdr_csd p-0 sdcds_cate">
      <span className="category_name mt-md-4">Categories</span>
      <p className="category_txt">Radiance Fits for Everyone</p>
      <img
        loading="lazy"
        src="/Images/Groupimg.png"
        className="home_tag_img"
        alt="home"
      />
      <div className="categories-slider">
        <Swiper
          spaceBetween={20}
          loop={true}
          preloadImages={true}
          updateOnImagesReady={true}
          watchSlidesProgress={true}
          preventInteractionOnTransition={true}
          breakpoints={{
            0: { slidesPerView: 4 },
            640: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1200: { slidesPerView: 6 },
          }}
          className="mySwiper"
        >
          {categories?.map((category) => (
            <SwiperSlide
              key={category.id}
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <div className="category-image-wrapper">
                <img
                  decoding="async"
                  loading="lazy"
                  src={`https://dev.crystovajewels.com${category.categoryImage}`}
                  alt={category.categoryName}
                  onLoad={(e) => {
                    e.currentTarget.classList.add("lazy-img-active");
                    e.currentTarget.style.opacity = "1";
                  }}
                  style={{
                    opacity: 0,
                    transition: "opacity 0.1s ease-in",
                  }}
                />
              </div>
              <span className="category-label">{category.categoryName}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default React.memo(Section2Categories);
