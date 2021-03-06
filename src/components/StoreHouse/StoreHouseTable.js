import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfStoreHouse,
  getStoreHouseById,
  listOfQuantities,
  getStoreHouseByQuantity,
  getStoreHouseByBarcode,
} from "../../redux/actions/storeHouseActions";
import { Space, Button, Table, Modal, Form, Input, Select } from "antd";
import StoreHouseAdd from "./StoreHouseAdd";
import StoreHouseEdit from "./StoreHouseEdit";
import StoreHouseDelete from "./StoreHouseDelete";
import "../../style.css";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
export default function StoreHouseTable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const [barcodeData, setBarcode] = useState("");
  const [quantityData, setQuantity] = useState("");
  const setfirstpage = () => {
    pagination.page = 1;
  };

  const storeHouseList = useSelector(
    (state) => state.storeHouseReducers?.storeHouseListData
  );

  const quantityList = useSelector(
    (state) => state.storeHouseReducers?.listOfQuantities
  );
  useEffect(() => {
    dispatch(listOfStoreHouse(pagination.page, pagination.pageSize));
  }, []);

  useEffect(() => {
    dispatch(listOfQuantities());
  }, []);
  useEffect(() => {}, [storeHouseList]);
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);

  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getStoreHouseById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showRemoveModal = (id) => {
    dispatch(getStoreHouseById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
  };

  const handleCancel = () => {
    // dispatch(listOfStoreHouse());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const columns = [
    {
      title: "Barkod",
      dataIndex: "barcode",
    },
    {
      title: "M??hsul",
      dataIndex: ["productDto", "name"],
    },
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Qiym??t",
      dataIndex: "price",
    },
    {
      title: "Sat???? qiym??ti",
      dataIndex: "sellPrice",
    },
    {
      title: "M????t??ri sat???? qiym??ti",
      dataIndex: "customerSellPrice",
    },
    {
      title: "Dig??r qiym??tl??r",
      dataIndex: "customerOfferedPrice",
    },
    {
      title: "??lav?? olunma tarixi",
      dataIndex: "addedDate",
    },
    {
      title: "??m??liyyat",
      dataIndex: "operation",
      width: "220px",
      render: (text, storeHouse) => {
        return (
          <Space size="middle">
            <Button
            style={{backgroundColor:"#0C9873",borderColor:"#0C9873"}}
              size="small"
              type="primary"
              onClick={() => showEditModal(storeHouse)}
            >
              Redakt?? et
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(storeHouse.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];
  const onChangeQuantity = (value) => {
    console.log(value);
    form.setFieldsValue({
      barcode: "",
    });
    setQuantity(value);
    setPagination({ page: 1, pageSize: 15 });
    dispatch(getStoreHouseByQuantity(value, 1, pagination.pageSize));
  };
  const onSearch = (e) => {
    form.setFieldsValue({
      quantity: "",
    });
    setBarcode(form.getFieldsValue().barcode);
    setPagination({ page: 1, pageSize: 15 });
    if (form.getFieldsValue().barcode !== "") {
      dispatch(
        getStoreHouseByBarcode(
          form.getFieldsValue().barcode,
          pagination.page,
          pagination.pageSize
        )
      );
    } else {
      dispatch(listOfStoreHouse(pagination.page, pagination.pageSize));
    }

    // dispatch(searchProduct(searchData, pagination));
    // setPagination({
    //   page: listOfProductDataByPage.currentPage + 1,
    //   pageSize: 15,
    // });
    // setDataSource(searchProductData.pages);
    // setTotal(searchProductData.totalItems);
  };

  const onClear = () => {
    form.setFieldsValue({
      barcode: "",
      quantity: "",
    });
  };

  const onRefresh = () => {
    onClear();
    dispatch(listOfStoreHouse(pagination.page, pagination.pageSize));
  };

  return (
    <div>
      <Button
        style={{ marginTop: "20px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
        type="primary"
        onClick={showAddModal}
      >
        ??lav?? et
      </Button>

      <Form
        form={form}
        name="basic"
        layout="inline"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ marginTop: "20px" }}
      >
        <Input.Group compact>
          <Form.Item label="Say" name="quantity">
            <Select
              onChange={onChangeQuantity}
              style={{ width: "100px" }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.props.value
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              }}
            >
              {quantityList.map((quantityData) => (
                <Option key={quantityData} value={quantityData}>
                  {quantityData}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>&nbsp;&nbsp;&nbsp;&nbsp;</Form.Item>
          <Form.Item label="Barkod:" name="barcode">
            <Input allowClear />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginLeft: "50px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
              icon={<SearchOutlined />}
              type="primary"
              htmlType="submit"
              onClick={onSearch}
            >
              Axtar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "70px" ,backgroundColor:"#ff7400",borderColor:"#ff7400"}}
              onClick={onClear}
            >
              T??mizl??
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "90px" }}
              onClick={onRefresh}
            >
              Yenil??
            </Button>
          </Form.Item>
        </Input.Group>
      </Form>

      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={storeHouseList?.pages}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: storeHouseList?.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
            if (barcodeData !== "") {
              dispatch(getStoreHouseByBarcode(barcodeData, page, pageSize));
            }
            if (quantityData !== "") {
              dispatch(getStoreHouseByQuantity(quantityData, page, pageSize));
            }
            if ((barcodeData === "") & (quantityData === "")) {
              dispatch(listOfStoreHouse(page, pageSize));
            }
          },
        }}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Anbar m??lumat??n??n ??lav?? edilm??si"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <StoreHouseAdd
          firstPage={setfirstpage}
          data={isElaveEtModalVisible}
          rowKey="id"
          handleCancel={handleCancel}
        ></StoreHouseAdd>
      </Modal>
      <Modal
        title="Anbar m??lumat??na d??z??li?? edilm??si"
        visible={isRedakteEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary" >
            Geri
          </Button>,
        ]}
      >
        <StoreHouseEdit
          rowKey="id"
          paginationData={pagination}
          handleCancel={handleCancel}
        ></StoreHouseEdit>
      </Modal>
      <Modal
        title="Anbar m??lumat??n??n silinm??si"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <StoreHouseDelete
          rowKey="id"
          paginationData={pagination}
          handleCancel={handleCancel}
        ></StoreHouseDelete>
      </Modal>
    </div>
  );
}
