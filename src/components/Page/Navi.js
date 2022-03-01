import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Image,Drawer, Affix } from "antd";

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
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu"
import "../Page/app.css"
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
      <Affix offsetTop={0}>
      <Navbar color="light" light expand="md">
        {/* <Image width={80} alt="logo" src={String(logo)} /> */}
        {
          {
            "/customers": <h3>Müştərilər</h3>,
            "/sellers": <h3>Əməkdaşlar</h3>,
            "/categories": <h3>Kateqoriya</h3>,
            "/properties": <h3>Xüsusiyyət</h3>,
            "/products": <h3>Məhsullar</h3>,
            "/storeHouse": <h3>Anbar</h3>,
            "/cartList": <h3>Satış</h3>,
            "/basket": <h3>Səbət</h3>
          }[props.location.pathname]
        }
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        {/* <NavbarToggler onClick={this.toggle} /> */}
       

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
            {props.location.pathname === "/cartList" ? (
          <Badge count={basketReducerData.length} >
            <Link to="/basket">
              {/* <Icon icon="emojione:shopping-cart" align="right" float="right" verticalAlign="right"/> */}
              <ShoppingCartOutlined
                style={{ fontSize: "50px", color: "#08c"}}
              />
            </Link>
          </Badge>
        ) : null}
          </Nav>
        </Collapse> 
        
      </Navbar>
      </Affix>
      
    </div>
  );
}
