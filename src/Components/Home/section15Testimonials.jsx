import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Emily Carol",
    text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
  },
  {
    name: "John Doe",
    text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
  },
  {
    name: "Jane Smith",
    text: "I wanted a custom bracelet to honor my daughter's birth, and the designers exceeded my expectations. They listened to every detail I envisioned and brought it to life. It's a masterpiece I'll cherish forever.",
  },
];
export default function Section15Testimonials() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const swiperRef = useRef(null); // Store Swiper instance

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      let newSlidesPerView;

      if (screenWidth <= 427) {
        newSlidesPerView = 1;
      } else if (screenWidth <= 599) {
        newSlidesPerView = 2;
      } else if (screenWidth <= 768) {
        newSlidesPerView = 2;
      } else if (screenWidth <= 1024) {
        newSlidesPerView = 3;
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
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     swiperRef.current?.update();
  //   });
  // }, []);

  return (
    <div className="testimonial-container d-flex align-items-center client_test cline_ytsdhcsd">
      <div
        className="heder_sec_main d-flex flex-column align-items-center mt-md-4 Client_xcTestimonial"
        style={{ width: "100vw" }}
      >
        <span className="category_name ">Client Testimonial</span>
        <p className="category_txt">What our Client's say about us</p>
        <img
          loading="eager"
          fetchpriority="high"
          src="/Images/Groupimg.png"
          alt="Decorative"
          className="home_tag_img"
        />

        <Swiper
          grabCursor={true}
          loop={true}
          slidesPerView={slidesPerView}
          slidesPerGroup={1}
          loopedSlides={testimonials.length}
          modules={[Pagination]}
          // autoplay={{ delay: 3000, disableOnInteraction: false }}
          observer={true} // Observe changes
          observeParents={true} // Observe parent element changes
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="swiper_testimonial container"
          preloadImages={false}
          lazy={true}
        >
          {[...testimonials, ...testimonials, ...testimonials].map(
            (item, index) => (
              <SwiperSlide className="slide_ssssss_sss" key={index}>
                <div
                  className={`card testimonial-card${
                    index % 3 === 0 ? "" : index % 3 === 1 ? "1" : "2"
                  } mt-5`}
                >
                  <div className="card-body pt-4">
                    <h5 className="card-title text-center emi_ffcc">
                      Emily Carol
                    </h5>
                    <p className="card-text sdcdscsd text-center">
                      I wanted a custom bracelet to honor my daughter's birth,
                      and the designers exceeded my expectations.
                    </p>
                    <p className="text-center sdcdscsd pb-0 mb-1">Client</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                      <FaStar color="#DBB439" />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
