import React from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, Image } from "antd";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import ExpeditorTable from "../Expeditor/ExpeditorTable";
import ProductTable from "../Product/ProductTable";
import CategoryTable from "../Category/CategoryTable";
import PropertyTable from "../Property/PropertyTable";
import DynamicList from "../Cart/DynamicList"
import Navi from "../Page/Navi";
import StoreHouseTable from "../StoreHouse/StoreHouseTable";
import SideBarMenu from "../Page/SideBarMenu";
import LoadingOverlay from "react-loading-overlay";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import CartList from "../Cart/CartList";
import FormList from "../Cart/FormList";

const { Sider } = Layout;
const { SubMenu } = Menu;
const logo = require("../../helpers/greenStreamImg.jpeg");
const { Footer, Content } = Layout;

export default function App() {
  const loading = useSelector((state) => state.loaderReducers?.loading);
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Əməliyyat gedir, xahiş edirik gözləyin..."
    >
      <div>
        <Layout style={{ height: "100%" }}>
          {/* <SideBarMenu /> */}
          <Sider width={200} className="site-layout-background">
            <Image width={50} alt="logo" src={String(logo)} />
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0, height: "100%" }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Qeydiyyat">
                {/* <Menu.Item
                  key="users"
                  onClick={(e) => <CustomerTable />}
                >
                  İstifadəçilər
                </Menu.Item> */}

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
                  <Link to="/dynamic">Satis</Link>
                </Menu.Item> */}
                <Menu.Item key="7">
                  <Link to="/cartList">CartList</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="storeHouse">Anbar</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Digər">
                <Menu.Item key="9"><Link to="/formList">formList</Link></Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          &nbsp;&nbsp;
          <Layout>
            <Navi />
            <Content>
              <Routes>
                <Route exact path="home" element={<CustomerTable />} />
                <Route path="customers" element={<CustomerTable />} />
                <Route path="sellers" element={<ExpeditorTable />} />
                <Route path="products" element={<ProductTable />} />
                <Route path="categories" element={<CategoryTable />} />
                <Route path="properties" element={<PropertyTable />} />
                {/* <Route path="dynamic" element={<DynamicList />} /> */}
                <Route path="cartList" element={<CartList />} />
                <Route path="storeHouse" element={<StoreHouseTable />} />
                <Route path="formList" element={<FormList />} />
              </Routes>
            </Content>

            <Footer>Footer</Footer>
          </Layout>
        </Layout>
        <Outlet />
      </div>
    </LoadingOverlay>
  );
}
