import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";

import Dialog from "@mui/material/Dialog";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  return (
    <>
      <Button className="countryDrop" onClick={() => setisOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">India</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        className="locationModal"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0">Choose your Delivery Location</h4>
        <p>Enter you address and we will specify the offer for your area.</p>
        <Button className="close_" onClick={() => setisOpenModal(false)}>
          <IoMdClose />
        </Button>
        <div className="headerSearch w-100">
          <input type="text" placeholder="Search for area" />

          <Button>
            <IoIosSearch />
          </Button>
        </div>
        <ul className="countryList mt-3">
          <li>
            <Button onClick={() => setisOpenModal(false)}>Nepal</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>India</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Sri Lanka</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bangladesh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Nepal</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>India</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Sri Lanka</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bangladesh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Nepal</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>India</Button>
          </li>
          <li>
            <Button>Sri Lanka</Button>
          </li>
          <li>
            <Button>Bangladesh</Button>
          </li>
          <li>
            <Button>Nepal</Button>
          </li>
          <li>
            <Button>India</Button>
          </li>
          <li>
            <Button>Sri Lanka</Button>
          </li>
          <li>
            <Button>Bangladesh</Button>
          </li>
          <li>
            <Button>Nepal</Button>
          </li>
          <li>
            <Button>India</Button>
          </li>
          <li>
            <Button>Sri Lanka</Button>
          </li>
          <li>
            <Button>Bangladesh</Button>
          </li>
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
