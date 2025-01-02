import React from "react";
import { TbMilk } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span><TbMilk /></span>
            <span className="ml-2">Everyday fresh products</span>
          </div>
          <div className="col d-flex align-items-center">
            <span><TbTruckDelivery /></span>
            <span className="ml-2">Free delivery for order over $70</span>
          </div><div className="col d-flex align-items-center">
            <span><RiDiscountPercentLine /></span>
            <span className="ml-2">Daily Mega Discounts</span>
          </div><div className="col d-flex align-items-center">
            <span><AiOutlineDollarCircle /></span>
            <span className="ml-2">Best price on the market</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
