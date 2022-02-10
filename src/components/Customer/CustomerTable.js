import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  // listOfCustomers,
  getCustomerById,
  searchCustomers,
} from "../../redux/actions/customerAction";
import { Button, Table, Modal, Space, Form, Input } from "antd";
import CustomerAdd from "./CustomerAdd";
import CustomerEdit from "./CustomerEdit";
import CustomerDelete from "./CustomerDelete";
import { SearchOutlined } from "@ant-design/icons";
export default function CustomerTable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const [searchCustomerData, setSearchCustomerData] = useState("");
  const [current,setCurrent] =useState(1);
  const setfirstpage = () => {
    pagination.page = 1;
  };

  const columns = [
    {
      title: "Müştərinin adı",
      dataIndex: "name",
    },
    {
      title: "Müştərinin soyadı",
      dataIndex: "surname",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, customerData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              onClick={() => showEditModal(customerData)}
            >
              Redaktə et
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(customerData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];

  const listOfCustomerData = useSelector(
    (state) => state.customerReducer?.customerListData
  );
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  // useEffect(() => {
  //   dispatch(listOfCustomers(pagination.page,pagination.pageSize));
  // }, []);
  useEffect(() => {
    dispatch(
      searchCustomers(searchCustomerData, pagination.page, pagination.pageSize)
    );
  }, []);
  useEffect(() => {}, [listOfCustomerData]);
  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getCustomerById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showRemoveModal = (id) => {
    dispatch(getCustomerById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
  };

  const handleCancel = () => {
    dispatch(
      searchCustomers(searchCustomerData, pagination.page, pagination.pageSize)
    );
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const onSearch = (e) => {
    setSearchCustomerData(form.getFieldsValue().name);
    console.log(pagination.page)
    setfirstpage();
    console.log(pagination.page)
   
    dispatch(
      searchCustomers(searchCustomerData, pagination.page, pagination.pageSize)
    );
    setPagination({
      page: listOfCustomerData.currentPage + 1,
      pageSize: 15,
    });
    // setDataSource(searchProductData.pages);
    // setTotal(searchProductData.totalItems);
  };
  const onCustomerNameBlur = () => {
    setSearchCustomerData(form.getFieldsValue().name);
    console.log(searchCustomerData);
  };
  const onClear = () => {
    form.setFieldsValue({
      name: "",
    }); 
    setSearchCustomerData("");
    console.log(form.getFieldsValue().name);
  };

  const onRefresh = (e) => {
    console.log(form.getFieldsValue().name);
    onClear();
    console.log(form.getFieldsValue().name);
    setSearchCustomerData(form.getFieldsValue().name);
    console.log(searchCustomerData);
    dispatch(
      searchCustomers(
        form.getFieldsValue().name,
        1,
        pagination.pageSize
      )
    );
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
          <Form.Item label="Müştəri adı:" name="name">
            <Input allowClear onChange={onCustomerNameBlur} />
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
      </Form>
      <Table
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        scroll={{ y: 530 }}
        dataSource={listOfCustomerData.pages}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultCurrent:1,
          current: listOfCustomerData.currentPage+1,
          pageSize: pagination.pageSize,
          total: listOfCustomerData.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
            setSearchCustomerData(form.getFieldsValue().name);
            dispatch(searchCustomers(searchCustomerData, page, pageSize));
          },
        }}
      ></Table>
      <Modal
        title="Müştəri məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <CustomerEdit rowKey="id" handleCancel={handleCancel}></CustomerEdit>
      </Modal>
      <Modal
        title="Müştəri məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <CustomerAdd
          firstPage={setfirstpage}
          key="add"
          rowKey="id"
          handleCancel={handleCancel}
        ></CustomerAdd>
      </Modal>
      <Modal
        title="Müştəri məlumatının silinməsi"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <CustomerDelete
          rowKey="id"
          handleCancel={handleCancel}
        ></CustomerDelete>
      </Modal>
    </div>
  );
}
