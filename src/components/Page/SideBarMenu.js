import React from "react";
import { Layout, Menu, Image } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, Outlet } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;
const logo = require("../../helpers/greenStreamImg.jpeg");
export default function SideBarMenu() {
  let navigate = useNavigate();
  return (
    <div>
      <Sider width={200} className="site-layout-background">
        <Image width={50} alt="logo" src={String(logo)} />
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ borderRight: 0, height: "100%" }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Qeydiyyat">
            <Menu.Item
              // onClick={navigate("customers")}
              key="1"
            >
              <Link to="customers">Müştərilər</Link>
              <Outlet />
            </Menu.Item>
            <Menu.Item
              // onClick={navigate('/sellers')}
              key="2"
            >
              <Link to="sellers">Əməkdaşlar</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="categories">Kateqoriya</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="properties">Xüsusiyyət</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Əməliyyat">
            <Menu.Item key="5">
              <Link to="products">Məhsullar</Link>
            </Menu.Item>
            {/* <Menu.Item key="6">
    <Link to="/carts">Cart</Link>
  </Menu.Item>
  <Menu.Item key="7">
    <Link to="/editableCartTable">EditableCartTable</Link>
  </Menu.Item> */}
            <Menu.Item key="8">
              <Link to="storeHouse">Anbar</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Digər">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      
    </div>
    
  );
}
