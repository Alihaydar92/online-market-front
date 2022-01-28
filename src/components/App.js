import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import { Route, Routes ,Link} from "react-router-dom";
import CustomerTable from "../components/Customer/CustomerTable";
import ExpeditorTable from "../components/Expeditor/ExpeditorTable";
import ProductTable from "./Product/ProductTable";
import  NotFound  from "../components/NotFound";
import CategoryTable from "./Category/CategoryTable";
import PropertyTable from "./Property/PropertyTable";
import CartAdd from "./Cart/CartAdd";
import EditableCartTable from "./Cart/EditableCartTable";
import DinamycTable from "./Cart/DinamycTable";
import AddDeleteTableRows from "./Cart/AddDeleteTableRows"
import StoreHouseTable from "./StoreHouse/StoreHouseTable";

const { Footer, Content, Sider, Header } = Layout;
const { SubMenu } = Menu;
export default function App() {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Qeydiyyat">
            <Menu.Item key="1"><Link to="/customers">Müştərilər</Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/sellers">Əməkdaşlar</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/categories">Kateqoriya</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/properties">Xüsusiyyət</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Əməliyyat">
            <Menu.Item key="5"><Link to="/products">Məhsullar</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/carts">Cart</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/editableCartTable">EditableCartTable</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/storeHouse">Anbar</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Digər">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      &nbsp; &nbsp;
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
          <Routes>
            <Route exact path="/" element={<CustomerTable/>}></Route>
            <Route  path="/customers" element={<CustomerTable/>}></Route>
            <Route  path="/sellers" element={<ExpeditorTable/>}></Route>
            <Route  path="/products" element={<ProductTable/>}></Route>
            <Route  path="/categories" element={<CategoryTable/>}></Route>
            <Route  path="/properties" element={<PropertyTable/>}></Route>
            <Route  path="/carts" element={<CartAdd/>}></Route>
            <Route  path="/editableCartTable" element={<AddDeleteTableRows/>}></Route>
            <Route  path="/storeHouse" element={<StoreHouseTable/>}></Route>
          </Routes>

          {/* <CustomerTable></CustomerTable>
          <ExpeditorTable></ExpeditorTable>
          <ProductTable></ProductTable> */}
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}
