import Button from "@mui/material/Button";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <Button className="allCatTab align-items-center ">
              <span className="icon1 mr-2">
                <IoIosMenu />
              </span>
              <span class="text">ALL CATEGORIES</span>
              <span className="icon2 ml-2">
                <FaAngleDown />
              </span>
            </Button>
          </div>
          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul class="list list-inline ml-auto">
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Home
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp;Fashion
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Electronics
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Bakery
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Grocery
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Blog
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <IoHomeOutline />
                  &nbsp; Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
