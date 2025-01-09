import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
const ProductModal = (props) => {

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();
  return (
    <>
      <Dialog
        open={true}
        className="productModal"
        onClose={() => props.closeProductModal()}
      >
        <Button className="close_" onClick={() => props.closeProductModal()}>
          <IoMdClose />
        </Button>
        <h4 className="mb-1 font-weight-bold">
          {" "}
          All Natural Italian-Syle Chicken Meatballs
        </h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brands:</span>
            <span className="ml-2">
              <b>Welch's</b>
            </span>
          </div>

          <Rating
            name="read-only"
            value={5}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>
        <hr />
        <div className="row mt-2 productDetailsModel">
          <div className="col-md-5">
            <div className="productZoom">
              <Slider {...settings2} class="zoomSliderBig" ref={zoomSliderBig}>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                  />
                </div>
              </Slider>
            </div>

            {/* <Slider {...settings2} class ='zoomSlider' ref={zoomSlider} > */}
            <Slider {...settings2} class="zoomSlider" ref={zoomSlider}>
              <div className="item">
                <img
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                  alt=""
                  className="w-100"
                />
              </div>
            </Slider>
          </div>

          <div className="col-md-7"></div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;
