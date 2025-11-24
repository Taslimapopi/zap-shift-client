import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  console.log(reviews);

  return (
    <div>
      <div>
        <h2 className="text-center">Reviews</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ea
          quasi eveniet veniam doloribus dignissimos, inventore quas provident
          aperiam, soluta minus. Quibusdam, accusantium culpa! Corrupti
          perspiciatis eveniet doloremque sunt consequatur!
        </p>
        <Swiper
            loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            scale: .75,
            slideShadows: true,
            
          }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
          pagination={true}
          modules={[EffectCoverflow, Pagination,Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard
              review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
