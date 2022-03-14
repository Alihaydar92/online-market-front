import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, Image, Button } from "antd";
import { Route, Routes, Outlet, Link, useLocation } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import ExpeditorTable from "../Expeditor/ExpeditorTable";
import ProductTable from "../Product/ProductTable";
import CategoryTable from "../Category/CategoryTable";
import PropertyTable from "../Property/PropertyTable";
import Navi from "../Page/Navi";
import InfiniteScrool from "../Cart/InfiniteScrool";
import StoreHouseTable from "../StoreHouse/StoreHouseTable";
import SideBarMenu from "../Page/SideBarMenu";
import LoadingOverlay from "react-loading-overlay";

import {
  UserOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import CartList from "../Cart/CartList";
import Basket from "../Cart/Basket";

const { Sider } = Layout;
const { SubMenu } = Menu;
const logo = require("../../helpers/greenStreamImg.jpeg");
const { Footer, Content } = Layout;

export default function AppHeader() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const loading = useSelector((state) => state.loaderReducers?.loading);
  const toggleCollapsed = () => {
    console.log(collapsed)
    console.log('fdfd')
    setCollapsed(!collapsed);
  };
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Əməliyyat gedir, xahiş edirik gözləyin..."
    >
      <div>
        <Layout 
        // style={{ height: "100%" }}
        >
          {/* <SideBarMenu /> */}
          <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
          {/* <Sider   width={200}   className="site-layout-background"> */}
            {/* <Image width={200} alt="logo" src={String(logo)} /> */}
            
           
            <Menu 
              mode="inline"
              // defaultSelectedKeys={["1"]}
              defaultSelectedKeys={['1']}
    
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0, height: "100%" }}
              inlineCollapsed={collapsed}
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
                <Menu.Item key="6">
                  <Link to="/cartList">Satış</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/storeHouse">Anbar</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="infiniteScrool">infiniteScrool</Link>
                </Menu.Item>
              </SubMenu>
              {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="Digər">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu> */}
            </Menu>
          {/* </Sider> */}
          &nbsp;&nbsp;
          <Layout>
       
            <Navi location={location} />

            <Content>
              <Routes>
                <Route exact path="home" element={<CustomerTable />} />
                <Route path="customers" element={<CustomerTable />} />
                <Route path="sellers" element={<ExpeditorTable />} />
                <Route path="products" element={<ProductTable />} />
                <Route path="categories" element={<CategoryTable />} />
                <Route path="properties" element={<PropertyTable />} />
                <Route path="cartList" element={<CartList />} />
                <Route path="storeHouse" element={<StoreHouseTable />} />
                <Route path="basket" element={<Basket />} />
                <Route path="infiniteScrool" element={<InfiniteScrool />} />
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
