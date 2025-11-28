import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ImageCarousel.css";

const ImageCarousel = () => {
  const images = [
    "https://jayabharath.com/wp-content/uploads/2025/04/Beige_Moody_Collage_Instagram_Post__1_-removebg-preview-1-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/depositphotos_54694491-stock-illustration-iso-9001-certified-icon-removebg-preview-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/123-1236029_rera-approved-rubber-stamp-logo-png-download-psd-removebg-preview-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/Beige_Moody_Collage_Instagram_Post__2_-removebg-preview-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/Beige_Moody_Collage_Instagram_Post__1_-removebg-preview-1-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/depositphotos_54694491-stock-illustration-iso-9001-certified-icon-removebg-preview-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/123-1236029_rera-approved-rubber-stamp-logo-png-download-psd-removebg-preview-150x150.png",
    "https://jayabharath.com/wp-content/uploads/2025/04/Beige_Moody_Collage_Instagram_Post__2_-removebg-preview-150x150.png"
  ];

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">🏡 Certifications & Approvals</h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={4}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1000: { slidesPerView: 4 },
        }}
        className="custom-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <img src={src} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
