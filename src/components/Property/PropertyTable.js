import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Modal, Space } from "antd";
import {listOfProperties,getPropertyById} from "../../redux/actions/propertyActions"
import PropertyAdd from "./PropertyAdd";
import PropertyDelete from "./PropertyDelete";
import PropertyEdit from "./PropertyEdit";
export default function PropertyTable() {
    const dispatch = useDispatch();
    const listOfPropertyData= useSelector(
        (state) => state.propertyReducers.propertyListData
    );
    const propertyDataById = useSelector(
        (state) => state.propertyReducers.propertyDataById
      );
    const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
    const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
    const [isSilModalVisible, setIsSilModalVisible] = useState(false);
    const columns = [
      {
        title: "Xüsusiyyət adı",
        dataIndex: "name",
      },
      {
        title: "Düzəliş",
        dataIndex: "edit",
        render: (text, categoryData) => {
          return (
            <Space size="middle">
              <Button
                size="small"
                type="primary"
                onClick={() => showEditModal(categoryData)}
              >
                Redaktə et
              </Button>
            </Space>
          );
        },
      },
      {
        title: "Sil",
        dataIndex: "delete",
        render: (text, propertyData) => {
          return (
            <Space size="middle">
              <Button
                size="small"
                type="danger"
                onClick={() => showRemoveModal(propertyData.id)}
              >
                Sil
              </Button>
            </Space>
          );
        },
      },
    ];
    useEffect(() => {
      dispatch(listOfProperties());
    }, []);
    useEffect(() => {
      console.log("listOfPropertyData", listOfPropertyData);
    }, []);
    const showAddModal = () => {
      setIsElaveEtModalVisible(true);
      setIsRedakteModalVisible(false);
      setIsSilModalVisible(false);
    };
    const showEditModal = (data) => {
      dispatch(getPropertyById(data.id));
      setIsRedakteModalVisible(true);
      setIsElaveEtModalVisible(false);
      setIsSilModalVisible(false);
    };
    const showRemoveModal = (id) => {
      dispatch(getPropertyById(id));
      setIsRedakteModalVisible(false);
      setIsElaveEtModalVisible(false);
      setIsSilModalVisible(true);
    };
  
    const handleCancel = () => {
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
          style={{ marginTop: "20px" }}
          //   rowSelection={rowSelection}
          dataSource={listOfPropertyData}
          columns={columns}
          rowKey="id"
        ></Table>
        <Modal
          title="Xüsusiyyət məlumatına düzəliş edilməsi"
          visible={isRedakteEtModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button danger onClick={handleCancel}>
              Geri
            </Button>,
          ]}
        >
          <PropertyEdit rowKey="id" handleCancel={handleCancel}></PropertyEdit>
        </Modal>
  
        <Modal
          title="Xüsusiyyət məlumatının əlavə edilməsi"
          visible={isElaveEtModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button danger onClick={handleCancel}>
              Geri
            </Button>,
          ]}
        >
          <PropertyAdd rowKey="id" handleCancel={handleCancel}/>
        </Modal>
        <Modal
          title="Xüsusiyyət məlumatının silinməsi"
          visible={isSilModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button danger onClick={handleCancel}>
              Geri
            </Button>,
          ]}
        >
          <PropertyDelete
            rowKey="id"
            handleCancel={handleCancel}
          />
        </Modal>
      </div>
    );
}
