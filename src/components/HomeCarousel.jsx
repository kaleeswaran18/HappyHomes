import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HomeCarousel.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const videoRefs = useRef({}); 
  const swiperRef = useRef(null);
  const timerRef = useRef(null);

  // Fetch slider data
  useEffect(() => {
    axios.get("https://samplebuildapi-1.onrender.com/product/slidersget")
      .then((res) => {
        setSlides(res.data?.data?.[0]?.images || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Clear timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Slide change handler
  const handleSlideChange = (swiper) => {
    clearTimer();

    const index = swiper.realIndex;
    const item = slides[index];

    if (!item) return;

    // Image Slide → 40 seconds delay
    if (item.type === "image") {
      timerRef.current = setTimeout(() => {
        swiper.slideNext();
      }, 10000); // 40 seconds
    }

    // Video Slide → play full video then next
    if (item.type === "video") {
      const video = videoRefs.current[index];
      if (!video) return;

      video.currentTime = 0;

      video.onloadedmetadata = () => {
        const duration = video.duration * 1000;
        video.play();

        timerRef.current = setTimeout(() => {
          swiper.slideNext();
        }, duration);
      };
    }
  };

  return (
    <section className="hero-carousel-section">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              
              {/* IMAGE */}
              {item.type === "image" && (
                <img src={item.url} alt={`slide-${index}`} />
              )}

              {/* VIDEO */}
              {item.type === "video" && (
                <video
                  src={item.url}
                  muted
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="video-slide"
                  playsInline
                />
              )}

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Home;
