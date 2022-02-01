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
    (state) => state.categoryReducers.categoryListData
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
    }
  ];
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  useEffect(() => {
    console.log("listOfCategoryData", listOfCategoryData);
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
    // dispatch(emptyOneData());
    // dispatch(listOfCustomers());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };

  return (
    <div>
      <Button
        style={{ marginTop: "20px"}}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>
      <Table
        style={{ marginTop: "20px",wordBreak:'break-word' }}
        //   rowSelection={rowSelection}
        dataSource={listOfCategoryData}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Kateqoriya məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>
        ]}
      >
        <CategoryEdit rowKey="id" handleCancel={handleCancel}></CategoryEdit>
      </Modal>

      <Modal
        title="Kateqoriya məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
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
          <Button danger onClick={handleCancel}>
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
