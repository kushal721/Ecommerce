import Button from "@mui/material/Button";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
const Navigation = () => {
  const [isOpenSidebarVal, setisopenSidebarVal] = useState(false)
  
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <div className="catWrapper">
              <Button className="allCatTab align-items-center " onClick={()=>setisopenSidebarVal(!isOpenSidebarVal)}>
                <span className="icon1 mr-2">
                  <IoIosMenu />
                </span>
                <span class="text">ALL CATEGORIES</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>
              <div className={`sidebarNav ${isOpenSidebarVal === true ? 'open': ''}`}>
                <ul>
                  <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Men
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Women
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Beauty
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;watches
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Beauty
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;watches
                  </Button>
                </Link></li>
                <li> <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Kids
                  </Button>
                </Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul class="list list-inline ml-auto">
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Home
                  </Button>
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp;Men
                  </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Clothing
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Footwear
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Watches
                    </Button>
                  </Link>
                </div>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Women
                  </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Clothing
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Footwear
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Watches
                    </Button>
                  </Link>
                </div>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Watches
                  </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Clothing
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Footwear
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      <IoHomeOutline />
                      &nbsp;Watches
                    </Button>
                  </Link>
                </div>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Kids
                  </Button>
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Blog
                  </Button>
                </Link>
              </li>
              <li class="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoHomeOutline />
                    &nbsp; Contact
                  </Button>
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
