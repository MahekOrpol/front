import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import { CiStar } from "react-icons/ci";

export default function Section15Testimonials() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [reviews, setReviews] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://dev.crystovajewels.com/api/v1/review/get/all"
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      let newSlidesPerView;

      if (screenWidth <= 427) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 599) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 768) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 1024) {
        newSlidesPerView = 2;
      } else {
        newSlidesPerView = 3;
      }
      if (newSlidesPerView !== slidesPerView) {
        setSlidesPerView(newSlidesPerView);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [slidesPerView]);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const scaleSlides = () => {
      swiperInstance.slides.forEach((slide) => {
        slide.style.transform = "scale(0.8)";
        slide.style.opacity = "1";
      });

      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      if (activeSlide) {
        activeSlide.style.transform = "scale(1)";
        activeSlide.style.opacity = "1";
      }
    };

    scaleSlides();
    swiperInstance.on("slideChangeTransitionStart", scaleSlides);

    return () => {
      swiperInstance.off("slideChangeTransitionStart", scaleSlides);
    };
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} color="#DBB439" />);
      } else {
        stars.push(<CiStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="testimonial-container d-flex align-items-center client_test cline_ytsdhcsd">
      <div
        className="heder_sec_main d-flex flex-column align-items-center mt-md-4 Client_xcTestimonial"
        style={{ width: "100vw" }}
      >
        <span className="category_name ">Client Testimonial</span>
        <p className="category_txt">What our Client's say about us</p>
        <img
          loading="lazy"
          //   fetchPriority="high"
          src="/Images/Groupimg.png"
          alt="Decorative"
          className="home_tag_img"
        />
        {Array.isArray(reviews) && reviews.length > 0 && (
          <Swiper
            grabCursor={true}
            loop={true}
            slidesPerView={slidesPerView}
            slidesPerGroup={1}
            loopedSlides={reviews.length}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            observer={true} // Observe changes
            observeParents={true} // Observe parent element changes
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="swiper_testimonial container"
            preloadImages={false}
            lazy={true}
          >
            {reviews.map((review, index) => (
              <SwiperSlide className="slide_ssssss_sss mt-1 mt-sm-0" key={review.id}>
                <div
                        className="card testimonial-card mt-5 mt-sm-2"
                >
                  {(() => {
                    const rawImage = review?.image?.[0];
                    const imageUrl = rawImage?.startsWith("http")
                      ? rawImage
                      : `https://dev.crystovajewels.com${rawImage || ""}`;
                    return (
                      <img
                        src={imageUrl}
                        alt="Client avatar"
                        className="testimonial-card-avatar"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          transform: "translateY(-60px)",
                          border:'1px solid white',
                          padding:'5px'
                        }}
                      />
                    );
                  })()}

                  <div className="card-body pt-0">
                    <h5 className="card-title text-center emi_ffcc">
                      {review.userId?.name || "Anonymous"}
                    </h5>
                    <p className="card-text sdcdscsd text-center testimonial-message">
                      {review.msg}
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                      {renderStars(parseInt(review.rating))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx>{`
        .testimonial-message {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
          max-height: 3em;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
