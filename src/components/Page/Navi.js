import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Image, Drawer, Affix } from "antd";
import Cookies from "universal-cookie";
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
import {showAddedBasketItems} from "../../redux/actions/cartActions"
const logo = require("../../helpers/greenStreamImg.jpeg");
export default function Navi(props) {
  const basketItems = useSelector(
    (state) => state.cartReducers?.addBasketItems
  );

  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [btnDropleft, setBtnDropleft] = useState(false);
  // const [basketItemsCount, setBasketItemsCount] = useState(0);

  //   React.useEffect(() => {
  //     const timeoutID = window.setTimeout(() => {
  //       console.log(cookies.get("basketArray"))
  //     }, 1000);

  //     return () => window.clearTimeout(timeoutID );
  // }, []);

  // useEffect(() => {
  //   setBasketItemsCount(basketItems.length);
  // }, [basketItems]);
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
              "/basket": <h3>Səbət</h3>,
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
                <Badge count={basketItems.length}>
                  <Link to="/basket">
                    {/* <Icon icon="emojione:shopping-cart" align="right" float="right" verticalAlign="right"/> */}
                    <ShoppingCartOutlined
                      style={{ fontSize: "50px", color: "#08c" }}
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
