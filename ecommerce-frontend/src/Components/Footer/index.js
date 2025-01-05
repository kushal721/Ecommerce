import React from "react";
import { TbMilk } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span>
              <TbMilk />
            </span>
            <span className="ml-2">Everyday fresh products</span>
          </div>
          <div className="col d-flex align-items-center">
            <span>
              <TbTruckDelivery />
            </span>
            <span className="ml-2">Free delivery for order over $70</span>
          </div>
          <div className="col d-flex align-items-center">
            <span>
              <RiDiscountPercentLine />
            </span>
            <span className="ml-2">Daily Mega Discounts</span>
          </div>
          <div className="col d-flex align-items-center">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <span className="ml-2">Best price on the market</span>
          </div>
        </div>

        <div className="row mt-5 linksWrap">
          <div className="col">
            <h5>Furut and Vegetables</h5>
            <ul>
              <li>
                <Link to="#">Fresh Vegetables</Link>
              </li>
              <li>
                <Link to="#">Herbs & Seasonings</Link>
              </li>
              <li>
                <Link to="#">Fresh Fruits</Link>
              </li>
              <li>
                <Link to="#">Custs and Sprouts</Link>
              </li>
              <li>
                <Link to="#">Exotic fruits & Veggies</Link>
              </li>
              <li>
                <Link to="#">Packaged Produce</Link>
              </li>
              <li>
                <Link to="#">Party Trays</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>BREAKFAST & DAIRY</h5>
            <ul>
              <li>
                <Link to="#">Fresh Vegetables</Link>
              </li>
              <li>
                <Link to="#">Herbs & Seasonings</Link>
              </li>
              <li>
                <Link to="#">Fresh Fruits</Link>
              </li>
              <li>
                <Link to="#">Custs and Sprouts</Link>
              </li>
              <li>
                <Link to="#">Exotic fruits & Veggies</Link>
              </li>
              <li>
                <Link to="#">Packaged Produce</Link>
              </li>
              <li>
                <Link to="#">Party Trays</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>MEAT & SEAFOOD</h5>
            <ul>
              <li>
                <Link to="#">Fresh Vegetables</Link>
              </li>
              <li>
                <Link to="#">Herbs & Seasonings</Link>
              </li>
              <li>
                <Link to="#">Fresh Fruits</Link>
              </li>
              <li>
                <Link to="#">Custs and Sprouts</Link>
              </li>
              <li>
                <Link to="#">Exotic fruits & Veggies</Link>
              </li>
              <li>
                <Link to="#">Packaged Produce</Link>
              </li>
              <li>
                <Link to="#">Party Trays</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>BEVERAGES</h5>
            <ul>
              <li>
                <Link to="#">Fresh Vegetables</Link>
              </li>
              <li>
                <Link to="#">Herbs & Seasonings</Link>
              </li>
              <li>
                <Link to="#">Fresh Fruits</Link>
              </li>
              <li>
                <Link to="#">Custs and Sprouts</Link>
              </li>
              <li>
                <Link to="#">Exotic fruits & Veggies</Link>
              </li>
              <li>
                <Link to="#">Packaged Produce</Link>
              </li>
              <li>
                <Link to="#">Party Trays</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>BREADS AND BAKERY</h5>
            <ul>
              <li>
                <Link to="#">Fresh Vegetables</Link>
              </li>
              <li>
                <Link to="#">Herbs & Seasonings</Link>
              </li>
              <li>
                <Link to="#">Fresh Fruits</Link>
              </li>
              <li>
                <Link to="#">Custs and Sprouts</Link>
              </li>
              <li>
                <Link to="#">Exotic fruits & Veggies</Link>
              </li>
              <li>
                <Link to="#">Packaged Produce</Link>
              </li>
              <li>
                <Link to="#">Party Trays</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright mt-3 pt-3 pb-3 d-flex">
          <p className="mb-0">Copyright 2024. All rights reserved.</p>

          <ul class=" list list-inline ml-auto mb-0">
            <li class="list-inline-item">
              <Link to="#">
                <FaFacebookF />
              </Link>
            </li>
            <li class="list-inline-item">
              <Link to="#">
                <CiTwitter />
              </Link>
            </li>
            <li class="list-inline-item">
              <Link to="#">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
