import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfStoreHouse,
  getStoreHouseById,
} from "../../redux/actions/storeHouseActions";
import { Space, Button, Table, Modal, Form, Input } from "antd";
import StoreHouseAdd from "./StoreHouseAdd";
import StoreHouseEdit from "./StoreHouseEdit";
import StoreHouseDelete from "./StoreHouseDelete";
import "../../style.css";
import { SearchOutlined } from "@ant-design/icons";
export default function StoreHouseTable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const storeHouseList = useSelector(
    (state) => state.storeHouseReducers.storeHouseListData
  );

  
  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const setfirstpage = () => {
    pagination.page = 1;
  };
  useEffect(() => {
    dispatch(listOfStoreHouse(pagination.page,pagination.pageSize));
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
      title: "Satış qiyməti",
      dataIndex: "sellPrice",
    },
    {
      title: "Barkod",
      dataIndex: "barcode",
    },
    {
      title: "Qiymət",
      dataIndex: "price",
    },
    {
      title: "Müştəri satış qiyməti",
      dataIndex: "customerSellPrice",
    },
    {
      title: "Digər qiymətlər",
      dataIndex: "customerOfferedPrice",
    },
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Məhsul",
      dataIndex: ["productDtos", "name"],
    },

    {
      title: "Əlavə olunma tarixi",
      dataIndex: "addedDate",
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, storeHouse) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              onClick={() => showEditModal(storeHouse)}
            >
              Redaktə et
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

  const onSearch = (e) => {
    var searchData = {
      name: form.getFieldsValue().productName.trim(),
      barcode: form.getFieldsValue().barcode.trim(),
    };
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
      name: "",
      barcode: "",
      note: "",
    });
  };

  const onRefresh = () => {
    onClear();
    // dispatch(listOfProductsByPage(pagination.page, pagination.pageSize));
  };

  return (
    <div>
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>

      {/* <Form
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
          <Form.Item label="Məhsul adı:" name="productName">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Barkod:" name="barcode">
            <Input allowClear />
          </Form.Item>

          <Form.Item>
            <Button
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
              style={{ left: "20px" }}
              onClick={onClear}
            >
              Təmizlə
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ left: "40px" }}
              onClick={onRefresh}
            >
              Yenilə
            </Button>
          </Form.Item>
        </Input.Group>
      </Form> */}

      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={storeHouseList.pages}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: storeHouseList.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
            dispatch(listOfStoreHouse(page, pageSize));
          },
        }}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Anbar məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
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
        title="Anbar məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <StoreHouseEdit
          rowKey="id"
          handleCancel={handleCancel}
        ></StoreHouseEdit>
      </Modal>
      <Modal
        title="Anbar məlumatının silinməsi"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <StoreHouseDelete
          rowKey="id"
          handleCancel={handleCancel}
        ></StoreHouseDelete>
      </Modal>
    </div>
  );
}
