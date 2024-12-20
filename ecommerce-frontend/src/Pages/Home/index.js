import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";

const Home = () => {
  // Slider configuration
  const productSliderOptions = {
    dots: true,
    infinite: false, // Set to true for seamless looping
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows (optional)
  };

  return (
    <>
      <HomeBanner />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img
                  src="https://cmsimages.shoppersstop.com/Brand_Carousel_Web_Timex_f8f4981cf4/Brand_Carousel_Web_Timex_f8f4981cf4.png"
                  alt="Best Sellers Banner"
                  className="cursor w-100"
                />
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of December.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All &nbsp;
                  <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="imgWrapper">
                        <img
                          src="https://cmsimages.shoppersstop.com/Boss_Luxe_Card_web_9d2dbbe599/Boss_Luxe_Card_web_9d2dbbe599.png"
                          alt="Product 1"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
