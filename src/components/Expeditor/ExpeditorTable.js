import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfExpeditors,
  getExpeditorById,
} from "../../redux/actions/expeditorActions";
import { Button, Table, Modal, Space, Input } from "antd";
import ExpeditorAdd from "./ExpeditorAdd";
import ExpeditorEdit from "./ExpeditorEdit";
import ExpeditorDelete from "./ExpeditorDelete";
export default function ExpeditorTable() {
  const dispatch = useDispatch();

  const listOfExpeditorData = useSelector(
    (state) => state.expeditorReducers?.expeditorListData
  );

  const [dataSource, setDataSource] = useState();
  const [value, setValue] = useState("");
  const FilterByBarcodeInput = (
    <Input
      placeholder="Ad ilə axtar"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = listOfExpeditorData.filter((entry) =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    {
      label:"emekdas",
      title:FilterByBarcodeInput,
      dataIndex: "name",
    },
    {
      title: "Əməkdaşın soyadı",
      dataIndex: "surname",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, expeditorData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              onClick={() => showEditModal(expeditorData)}
            >
              Redaktə et
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(expeditorData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  useEffect(() => {
    dispatch(listOfExpeditors());
  }, []);
  
  useEffect(() => {
    setDataSource(listOfExpeditorData);
  }, [listOfExpeditorData]);

  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getExpeditorById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showRemoveModal = (id) => {
    dispatch(getExpeditorById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
  };

  const handleCancel = () => {
    dispatch(listOfExpeditors());
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
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
      ></Table>

      <Modal
        title="Əməkdaş məlumatının əlavə edilməsi"
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
        <ExpeditorAdd rowKey="id" handleCancel={handleCancel}></ExpeditorAdd>
      </Modal>
      <Modal
        title="Əməkdaş məlumatına düzəliş edilməsi"
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
        <ExpeditorEdit rowKey="id" handleCancel={handleCancel}></ExpeditorEdit>
      </Modal>
      <Modal
        title="Əməkdaş məlumatının silinməsi"
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
        <ExpeditorDelete
          rowKey="id"
          handleCancel={handleCancel}
        ></ExpeditorDelete>
      </Modal>
    </div>
  );
}
