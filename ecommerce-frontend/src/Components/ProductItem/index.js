import React from "react";
import Button from "@mui/material/Button";
import { SlSizeFullscreen } from "react-icons/sl";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
const ProductItem = () => {
  return (
    <div>
      <div className="item productItem">
        <div className="imgWrapper">
          <img
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-3-346x310.jpg"
            alt="Product 1"
            className="w-100 "
          />
          <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button>
              <SlSizeFullscreen />
            </Button>
            <Button>
              <FaRegHeart  style={{fontSize:'20px'}}/>
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>Werther's Orginal Caramel Hard Candies</h4>
          <span className="text-success d-block">In Stock</span>
          <Rating
            className="mt-2 mb-2"
            name="read-only"
            value={5}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            <span className="oldPrice">$20.00</span>
            <span className="netPrice text-danger ml-2">$20.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
