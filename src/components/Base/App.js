import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Spin } from "antd";
import { Route, Routes, Outlet } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import ExpeditorTable from "../Expeditor/ExpeditorTable";
import ProductTable from "../Product/ProductTable";
import CategoryTable from "../Category/CategoryTable";
import PropertyTable from "../Property/PropertyTable";
import CartAdd from "../Cart/CartAdd";
import Navi from "../Page/Navi";
import AddDeleteTableRows from "../Cart/AddDeleteTableRows";
import StoreHouseTable from "../StoreHouse/StoreHouseTable";
import SideBarMenu from "../Page/SideBarMenu";
import LoadingOverlay from "react-loading-overlay";
const { Footer, Content } = Layout;

export default function App() {
  const loading = useSelector((state) => state.loaderReducers?.loading);
  return (
    <LoadingOverlay active={loading} spinner text="Məhsullar əlavə olunur, gözləyin...">
      <div>
        <Layout style={{ height: "100%" }}>
          <SideBarMenu />
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
                <Route path="carts" element={<CartAdd />} />
                <Route
                  path="editableCartTable"
                  element={<AddDeleteTableRows />}
                />
                <Route path="storeHouse" element={<StoreHouseTable />} />
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
