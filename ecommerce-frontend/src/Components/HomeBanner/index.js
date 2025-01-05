import React from "react";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const HomeBanner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <>
      <div className="container mt-3">
        <div className="homeBannerSection ">
          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            navigation={true}
            loop={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="item">
                <img src={slider1} alt="" className="w-100" />
              </div>
             
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <img src={slider2} alt="" className="w-100" />
              </div>
             
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <img src={slider1} alt="" className="w-100" />
              </div>
             
            </SwiperSlide>
          </Swiper>
          {/* <Slider {...settings}>
          <div className="item">
            <img src={slider1} alt="" className="w-100" />
          </div>
          <div className="item">
            <img src={slider2} alt="" className="w-100" />
          </div>
        </Slider> */}
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
