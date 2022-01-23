import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, listOfProducts } from "../../redux/actions/productActions";
import { Space, Button, Table, Modal } from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
export default function ProductTable() {
  const dispatch = useDispatch();
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);

  useEffect(() => {
    console.log("listOfProductData", listOfProductData);
  });
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);

  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getProductById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
  };
  const showRemoveModal = (id) => {
    dispatch(getProductById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
  };

  const handleCancel = () => {
    dispatch(listOfProducts());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  const columns = [
    {
      title: "Məhusulun adı",
      dataIndex: "name",
    },
    {
      title: "Barkod",
      dataIndex: "barcode",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
    {
      title: "Satış qiyməti",
      dataIndex: "sellPrice",
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
      dataIndex: "otherPrice",
    },
    {
      title: "Kəmiyyət",
      dataIndex: "quantity",
    },
    {
      title: "Kateqoriya",
      dataIndex: ["categoryDto","name"]
    },
    {
      title: "Xüsusiyyət",
      dataIndex: ["propertyDto","name"],
    },
    // {
    //     title: "Satış strategiyası",
    //     dataIndex: "priceStrategyList[].unitPrice",
    // },
    {
      title: "Düzəliş",
      dataIndex: "edit",
      render: (text, productData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="primary"
                onClick={() => showEditModal(productData)}
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
      render: (text, productData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="danger"
                onClick={() => showRemoveModal(productData.id)}
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
        style={{ marginTop: "20px" }}
        dataSource={listOfProductData}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Məhsulun əlavə edilməsi"
        visible={isElaveEtModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <ProductAdd rowKey="id" handleCancel={handleCancel}></ProductAdd>
      </Modal>
      <Modal
        title="Məhsul məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <ProductEdit rowKey="id" handleCancel={handleCancel}></ProductEdit>
      </Modal>
      <Modal
        title="Məhsul məlumatının silinməsi"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <ProductDelete rowKey="id" handleCancel={handleCancel}></ProductDelete>
      </Modal>
    </div>
  );
}
