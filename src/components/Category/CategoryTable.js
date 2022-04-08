import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Modal, Space } from "antd";
import {
  listOfCategories,
  getCategoryById,
} from "../../redux/actions/categoryActions";
import CategoryDelete from "./CategoryDelete";
import CategoryEdit from "./CategoryEdit";
import CategoryAdd from "./CategoryAdd";
export default function CategoryTable() {
  const dispatch = useDispatch();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  const columns = [
    {
      title: "Kateqoriya adı",
      dataIndex: "name",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, categoryData) => {
        return (
          <Space size="middle">
            <Button
            style={{backgroundColor:"#0C9873",borderColor:"#0C9873"}}
              size="small"
              type="primary"
              onClick={() => showEditModal(categoryData)}
            >
              Redaktə et
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(categoryData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getCategoryById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showRemoveModal = (id) => {
    dispatch(getCategoryById(id));
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
        style={{ marginTop: "20px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>
      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        //   rowSelection={rowSelection}
        dataSource={listOfCategoryData}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Kateqoriya məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CategoryEdit rowKey="id" handleCancel={handleCancel}></CategoryEdit>
      </Modal>

      <Modal
        title="Kateqoriya məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CategoryAdd rowKey="id" handleCancel={handleCancel}></CategoryAdd>
      </Modal>
      <Modal
        title="Kateqoriya məlumatının silinməsi"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CategoryDelete
          rowKey="id"
          handleCancel={handleCancel}
        ></CategoryDelete>
      </Modal>
    </div>
  );
}
