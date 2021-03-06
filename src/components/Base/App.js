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
  RollbackOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import Sale from "../Cart/Sale";
import SaleBasket from "../Cart/SaleBasket";
import RestoreBasket from "../Cart/RestoreBasket";
import RetailBasket from "../Cart/RetailBasket";
import { useCookies } from "react-cookie";
import Invoice from "../Invoice/Invoice";
import Restore from "../Cart/Restore";
import Retail from "../Cart/Retail";
import CashBoxPage from "../CashBox/CashBoxPage";
import IncomePage from "../Income/IncomePage";
import CostPage from "../Cost/CostPage";
import IncomeAndCost from "../CashBox/IncomeAndCost";
const { SubMenu } = Menu;
const logo = require("../../helpers/greenStream.jpeg");
const { Footer, Content } = Layout;

export default function App() {
  const location = useLocation();
  let navigate = useNavigate();
  const loading = useSelector((state) => state.loaderReducers?.loading);
  const [cookies, setCookie, removeCookie] = useCookies(["customerCookieId"]);
  const basketSaleItems = useSelector(
    (state) => state.saleReducers?.addSaleBasketItems
  );
  const basketRestoreItems = useSelector(
    (state) => state.restoreReducers?.addRestoreBasketItems
  );

  const basketRetailItems = useSelector(
    (state) => state.retailReducers?.addRetailBasketItems
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
      text="??m??liyyat gedir, xahi?? edirik g??zl??yin..."
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
              <Menu.Item key="100" style={{ width: "220px", marginTop: "5px" }}>
                {
                  {
                    "/customers": <h3>M????t??ril??r</h3>,
                    "/sellers": <h3>??m??kda??lar</h3>,
                    "/categories": <h3>Kateqoriya</h3>,
                    "/properties": <h3>X??susiyy??t</h3>,
                    "/products": <h3>M??hsullar</h3>,
                    "/storeHouse": <h3>Anbar</h3>,
                    "/sale": <h3>Sat????</h3>,
                    "/saleBasket": <h3>Sat???? S??b??t</h3>,
                    "/restoreBasket": <h3>Qaytarma S??b??t</h3>,
                    "/retailBasket": <h3>P??rak??nd?? S??b??t</h3>,
                    "/home": <h3>??sas</h3>,
                    "/numerate": <h3>Say??m</h3>,
                    "/numerateResult": <h3>Say??m n??tic??si</h3>,
                    "/customerBlackList": <h3>Qara siyah??</h3>,
                    "/invoice": <h3>Qaim??</h3>,
                    "/restore": <h3>Qaytarma</h3>,
                    "/retail": <h3>P??rak??nd??</h3>,
                    "/cashbox": <h3>Kassa</h3>,
                    "/income": <h3>G??lirl??r</h3>,
                    "/cost": <h3>X??rcl??r</h3>,
                  }[location.pathname]
                }
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Qeydiyyat">
                <Menu.Item key="1">
                  <Link to="customers">M????t??ril??r</Link>
                  <Outlet />
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="sellers">??m??kda??lar</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="categories">Kateqoriya</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="properties">X??susiyy??t</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="income">G??lirl??r</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="cost">X??rcl??r</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="incomeAndCost">G??lir-X??rc</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/products">M??hsullar</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="??m??liyyat">
                <Menu.Item key="10">
                  <Link to="/sale">Sat????</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to="/storeHouse">Anbar</Link>
                </Menu.Item>
                <Menu.Item key="12">
                  <Link to="numerate">Say??m</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to="numerateResult">Say??m n??tic??si</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to="customerBlackList">Qara siyah??</Link>
                </Menu.Item>
                <Menu.Item key="15">
                  <Link to="invoice">Qaim??</Link>
                </Menu.Item>
                <Menu.Item key="16">
                  <Link to="restore">Qaytarma</Link>
                </Menu.Item>
                <Menu.Item key="17">
                  <Link to="retail">P??rak??nd??</Link>
                </Menu.Item>
                <Menu.Item key="18">
                  <Link to="cashbox">Kassa</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" icon={<UserOutlined />} title="??stifad????i">
                <Menu.Item key="20">
                  Profil
                  <Outlet />
                </Menu.Item>
                <Menu.Item onClick={logout} key="21">
                  ????x????
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="101">
                {location.pathname === "/sale" ? (
                  <Badge count={basketSaleItems?.length}>
                    <Link to="/saleBasket">
                      <ShoppingCartOutlined
                        style={{ fontSize: "30px", color: "#08c" }}
                      />
                    </Link>
                  </Badge>
                ) : null}
                {location.pathname === "/restore" ? (
                  <Badge count={basketRestoreItems?.length}>
                    <Link to="/restoreBasket">
                      <RollbackOutlined
                        style={{ fontSize: "30px", color: "#08c" }}
                      />
                    </Link>
                  </Badge>
                ) : null}
                {location.pathname === "/retail" ? (
                  <Badge count={basketRetailItems?.length}>
                    <Link to="/retailBasket">
                      <RadarChartOutlined
                        style={{ fontSize: "30px", color: "#08c" }}
                      />
                    </Link>
                  </Badge>
                ) : null}
              </Menu.Item>
            </Menu>
          </Affix>

          <Layout>
            <Content>
              {/* <Outlet/> */}
              <Routes>
                <Route exact path="home" element={<CustomerTable />} />
                <Route path="customers" element={<CustomerTable />} />
                <Route path="sellers" element={<ExpeditorTable />} />
                <Route path="products" element={<ProductTable />} />
                <Route path="categories" element={<CategoryTable />} />
                <Route path="properties" element={<PropertyTable />} />
                <Route path="storeHouse" element={<StoreHouseTable />} />
                <Route path="sale" element={<Sale />} />
                <Route path="restore" element={<Restore />} />
                <Route path="retail" element={<Retail />} />
                <Route path="saleBasket" element={<SaleBasket />} />
                <Route path="restoreBasket" element={<RestoreBasket />} />
                <Route path="retailBasket" element={<RetailBasket />} />
                <Route path="numerate" element={<Numerate />} />
                <Route path="numerateResult" element={<NumerateResult />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="cashbox" element={<CashBoxPage />} />
                <Route path="income" element={<IncomePage />} />
                <Route path="cost" element={<CostPage />} />
                <Route path="incomeAndCost" element={<IncomeAndCost />} />

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
