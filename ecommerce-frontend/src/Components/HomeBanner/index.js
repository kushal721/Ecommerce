import React from "react";

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
      <div className="homeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Ecom_Serve_01_7e2a156ff0/Ecom_Serve_01_7e2a156ff0.jpg"
              alt=""
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61.jpg"
              alt=""
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61.jpg"
              alt=""
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61/Jimmy_Choo_19th_Dec_24_Web_bb92ee5e61.jpg"
              alt=""
              className="w-100"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
