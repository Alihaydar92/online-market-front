import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

// import { useSelector, useDispatch } from "react-redux";

// import { listOfExpeditors } from "../redux/actions/expeditorActions";
// import { listOfCustomers } from "../redux/actions/customerAction";
import CustomerTable from "../components/Customer/CustomerTable";
import ExpeditorTable from "../components/Expeditor/ExpeditorTable";
import ProductTable from "./Product/ProductTable";
const { Footer, Content, Sider, Header } = Layout;
const { SubMenu } = Menu;
export default function App() {
  // const dispatch = useDispatch();
  // const [name, setName] = useState();
  // const listOfCustomerData = useSelector((state) => state.customerReducer.customerListData);
  // const listOfExpeditorData = useSelector((state) => state.expeditorReducer?.expeditorListData);
  // useEffect(() => {
  //   dispatch(listOfCustomers());
  //   dispatch(listOfExpeditors());
  // }, []);
  // useEffect(() => {
  //   console.log(listOfCustomerData);
  //   setName(listOfCustomerData[0]?.name);
  // }, [listOfCustomerData]);

  // useEffect(() => {
  //   console.log(listOfExpeditorData);
  //   setName(listOfExpeditorData[0]?.name);
  // }, [listOfExpeditorData]);
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Qeydiyyat">
            <Menu.Item key="1">Müştərilər</Menu.Item>
            <Menu.Item key="2">Kateqoriya</Menu.Item>
            <Menu.Item key="3">Əməkdaşlar</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      &nbsp;
      &nbsp;
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <CustomerTable></CustomerTable>
          <ExpeditorTable></ExpeditorTable>
          <ProductTable></ProductTable>
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}
