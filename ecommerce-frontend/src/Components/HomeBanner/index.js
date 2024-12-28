import React from "react";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import Slider from "react-slick";

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
      <div className="homeBannerSection mb-4">
        <Slider {...settings}>
          <div className="item">
            <img src={slider1} alt="" className="w-100" />
          </div>
          <div className="item">
            <img src={slider2} alt="" className="w-100" />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
