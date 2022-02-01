import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfCustomers,
  getCustomerById,
} from "../../redux/actions/customerAction";
import { Button, Table, Modal, Space } from "antd";
import CustomerAdd from "./CustomerAdd";
import CustomerEdit from "./CustomerEdit";
import CustomerDelete from "./CustomerDelete";
export default function CustomerTable() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(listOfCustomers());
  }, []);

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
    // dispatch(emptyOneData());
    dispatch(listOfCustomers());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
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
      <Table
        style={{ marginTop: "20px" ,wordBreak:'break-word'}}
        
        //   rowSelection={rowSelection}
        dataSource={listOfCustomerData}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Müştəri məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button>Düzəlişləri yadda saxla</Button>,
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
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button>Düzəlişləri yadda saxla</Button>,
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <CustomerAdd rowKey="id" handleCancel={handleCancel}></CustomerAdd>
      </Modal>
      <Modal
        title="Müştəri məlumatının silinməsi"
        visible={isSilModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button>Düzəlişləri yadda saxla</Button>,
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
