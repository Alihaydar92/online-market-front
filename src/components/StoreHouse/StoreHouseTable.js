import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfStoreHouse,
  getStoreHouseById,
} from "../../redux/actions/storeHouseActions";
import { Space, Button, Table, Modal } from "antd";
import StoreHouseAdd from "./StoreHouseAdd";
import StoreHouseEdit from "./StoreHouseEdit";
import StoreHouseDelete from "./StoreHouseDelete";
import "../../style.css";

export default function StoreHouseTable() {
  const dispatch = useDispatch();
  const storeHouseList = useSelector(
    (state) => state.storeHouseReducers.storeHouseListData
  );

  useEffect(() => {
    dispatch(listOfStoreHouse());
  }, []);

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
    dispatch(listOfStoreHouse());
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
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={storeHouseList}
        pagination={false}
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
