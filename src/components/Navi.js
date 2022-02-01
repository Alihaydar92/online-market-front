import React from "react";
import { Layout, Menu, Image } from "antd";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const logo = require("../helpers/greenStreamImg.jpeg");
export default class Navi extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        
        <Navbar color="light" light expand="md" left>
        <Image width={80} alt="logo" src={String(logo)} />
          {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
          {/* <NavbarToggler onClick={this.toggle} /> */}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ms-auto" navbar left>
              

              <Dropdown
                direction="left"
                isOpen={this.state.btnDropleft}
                toggle={() => {
                  this.setState({ btnDropleft: !this.state.btnDropleft });
                }}
              >
                <DropdownToggle caret>İstifadəçi</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Profil</DropdownItem>
                  <DropdownItem>Çıxış</DropdownItem>
                </DropdownMenu>
              </Dropdown>

             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
