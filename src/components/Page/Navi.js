import React, { useState } from "react";
import { Image } from "antd";
import {
  Collapse,
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
const logo = require("../../helpers/greenStreamImg.jpeg");
export default function Navi() {
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
