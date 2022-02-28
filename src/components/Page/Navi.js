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
export default function Navi(props) {
 
 
 const basketReducerData = useSelector(
  (state) => state.cartReducers?.basketData
);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [btnDropleft, setBtnDropleft] = useState(false);
  
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
     {props.location.pathname==='/cartList' ?  <Badge count={basketReducerData.length}>
            <Link to="/sebet">
              {/* <Icon icon="emojione:shopping-cart" align="right" float="right" verticalAlign="right"/> */}
              <ShoppingCartOutlined
                style={{ fontSize: "50px", color: "#08c" }}
              />
            </Link>
          </Badge> :null}
       
         
      
      
        
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
