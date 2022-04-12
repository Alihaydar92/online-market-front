import React from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, Affix, Badge, Image } from "antd";
import {
  Route,
  Routes,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import ExpeditorTable from "../Expeditor/ExpeditorTable";
import ProductTable from "../Product/ProductTable";
import CategoryTable from "../Category/CategoryTable";
import PropertyTable from "../Property/PropertyTable";
import StoreHouseTable from "../StoreHouse/StoreHouseTable";
import Numerate from "../Numerate/Numerate";
import NumerateResult from "../Numerate/NumerateResult";
import CustomerBlakcList from "../BlackList/CustomerBlakcList";
import LoadingOverlay from "react-loading-overlay";

import {
  UserOutlined,
  LaptopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import CartList from "../Cart/CartList";
import Basket from "../Cart/Basket";
import { useCookies } from "react-cookie";
import Invoice from "../Invoice/Invoice";
const { SubMenu } = Menu;
const logo = require("../../helpers/greenStream.jpeg");
const { Footer, Content } = Layout;

export default function App() {
  const location = useLocation();
  let navigate = useNavigate();
  const loading = useSelector((state) => state.loaderReducers?.loading);
  const [cookies, setCookie, removeCookie] = useCookies(["customerCookieId"]);
  const basketItems = useSelector(
    (state) => state.cartReducers?.addBasketItems
  );
  const logout = () => {
    window.localStorage.clear();
    navigate("/");
    removeCookie("customerCookieId");
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
          <Affix offsetTop={5}>
            <Menu
              mode="horizontal"
              // defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0, height: "100%" }}
            >
              <Menu.Item>
                <Image
                  width={150}
                  height={45}
                  alt="logo"
                  src={String(logo)}
                  preview={false}
                />
              </Menu.Item>
              <Menu.Item key="101">
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
                    "/home": <h3>Əsas</h3>,
                    "/numerate": <h3>Sayım</h3>,
                    "/numerateResult": <h3>Sayım nəticəsi</h3>,
                    "/customerBlackList": <h3>Qara siyahı</h3>,
                    "/invoice": <h3>Qaimə</h3>,
                  }[location.pathname]
                }
              </Menu.Item>
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
                <Menu.Item key="10">
                  <Link to="/products">Məhsullar</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to="/cartList">Satış</Link>
                </Menu.Item>
                <Menu.Item key="12">
                  <Link to="/storeHouse">Anbar</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to="numerate">Sayım</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to="numerateResult">Sayım nəticəsi</Link>
                </Menu.Item>
                <Menu.Item key="15">
                  <Link to="customerBlackList">Qara siyahı</Link>
                </Menu.Item>
                <Menu.Item key="16">
                  <Link to="invoice">Qaimə</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" icon={<UserOutlined />} title="İstifadəçi">
                <Menu.Item
                  // onClick={navigate("customers")}
                  key="20"
                >
                  Profil
                  <Outlet />
                </Menu.Item>
                <Menu.Item onClick={logout} key="21">
                  Çıxış
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="100">
                {location.pathname === "/cartList" ? (
                  <Badge count={basketItems?.length}>
                    <Link to="/basket">
                      {/* <Icon icon="emojione:shopping-cart" align="right" float="right" verticalAlign="right"/> */}
                      <ShoppingCartOutlined
                        style={{ fontSize: "30px", color: "#08c" }}
                      />
                    </Link>
                  </Badge>
                ) : null}
              </Menu.Item>
            </Menu>
          </Affix>

          <Layout>
            {/* <Navi location={location} /> */}

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
                <Route path="numerate" element={<Numerate />} />
                <Route path="numerateResult" element={<NumerateResult />} />
                <Route path="invoice" element={<Invoice />} />
                <Route
                  path="customerBlackList"
                  element={<CustomerBlakcList />}
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <Outlet />
      </div>
    </LoadingOverlay>
  );
}
