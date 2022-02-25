import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Image } from "antd";

import {
  Collapse,
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
const logo = require("../../helpers/greenStreamImg.jpeg");
export default function Navi() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [btnDropleft, setBtnDropleft] = useState(false);
  const bastketReducerData = useSelector(
    (state) => state.cartReducers?.basketData
  );
  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Image width={80} alt="logo" src={String(logo)} />

        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        {/* <NavbarToggler onClick={this.toggle} /> */}
        <Badge count={bastketReducerData.length}>
        <Link to="/sebet">  <ShoppingCartOutlined
            style={{ fontSize: "50px", color: "#08c", float: "right" }}
          ></ShoppingCartOutlined> </Link>
        </Badge>
        
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <Dropdown
              direction="left"
              isOpen={btnDropleft}
              toggle={() => {
                setBtnDropleft(!btnDropleft);
              }}
            >
              <DropdownToggle caret>İstifadəçi</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Profil</DropdownItem>
                <DropdownItem onClick={logout}>Çıxış</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
