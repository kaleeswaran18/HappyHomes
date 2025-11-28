import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HomeCarousel.css";

const HomeCarousel = () => {
  const [slides, setSlides] = useState([]);
  const videoRefs = useRef({});
  const timerRef = useRef(null);
  const swiperRef = useRef(null);

  /* ---------------- FETCH SLIDER DATA ---------------- */
  useEffect(() => {
    axios
      .get("https://samplebuildapi-1.onrender.com/product/slidersget")
      .then((res) => {
        setSlides(res?.data?.data?.[0]?.images || []);
      })
      .catch((err) => console.error(err));
  }, []);

  /* ---------------- POWER-SAVE AUTOPLAY UNLOCK ---------------- */
  useEffect(() => {
    const unlock = () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.play().catch(() => {});
          video.pause();
        }
      });
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  /* ---------------- CLEAR TIMER ---------------- */
  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  /* ---------------- SLIDE CHANGE HANDLER ---------------- */
  const handleSlideChange = (swiper) => {
    clearTimer();

    const index = swiper.realIndex;
    const item = slides[index];
    if (!item) return;

    /* ---------- IMAGE: Auto-next after 10 seconds ---------- */
    if (item.type === "image") {
      timerRef.current = setTimeout(() => {
        swiper.slideNext();
      }, 10000);
    }

    /* ---------- VIDEO: Play + wait until duration ---------- */
    if (item.type === "video") {
      const video = videoRefs.current[index];
      if (!video) return;

      video.currentTime = 0;

      // Safe autoplay
      video.play().catch(() => {
        setTimeout(() => video.play().catch(() => {}), 500);
      });

      // Next slide timing
      const duration = video.duration ? video.duration * 1000 : 10000;

      timerRef.current = setTimeout(() => {
        swiper.slideNext();
      }, duration);
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

              {/* ---------- IMAGE SLIDE ---------- */}
              {item.type === "image" && (
                <img src={item.url} alt={`slide-${index}`} />
              )}

              {/* ---------- VIDEO SLIDE (fixed autoplay) ---------- */}
              {item.type === "video" && (
                <video
                  src={item.url}
                  muted
                  playsInline
                  preload="metadata"
                  ref={(el) => (videoRefs.current[index] = el)}
                  onLoadedMetadata={() => {
                    const video = videoRefs.current[index];
                    if (!video) return;

                    video.currentTime = 0;

                    video.play().catch(() => {
                      setTimeout(() => video.play().catch(() => {}), 300);
                    });
                  }}
                />
              )}

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeCarousel;
