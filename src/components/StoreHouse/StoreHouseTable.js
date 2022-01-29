import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfStoreHouse,
  getStoreHouseById,
} from "../../redux/actions/storeHouseActions";
import { Space, Button, Table, Modal} from "antd";
import StoreHouseAdd from "./StoreHouseAdd";
import StoreHouseEdit from "./StoreHouseEdit";
import StoreHouseDelete from "./StoreHouseDelete";
import "../../style.css";

export default function StoreHouseTable() {
  const dispatch = useDispatch();
  /////////////////////////////////////////////file upload
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64URL: "",
  });
  /////////////////////////////////////////////file upload
  const storeHouseList = useSelector(
    (state) => state.storeHouseReducers.storeHouseListData
  );

  useEffect(() => {
    dispatch(listOfStoreHouse());
  }, []);

  //   useEffect(() => {
  //     console.log("listOfProductData", storeHouseList);
  //   },[listOfProductData]);

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
    // console.log("productDataById", productDataById);
    dispatch(getStoreHouseById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
  };

  const handleCancel = () => {
    // dispatch(listOfProducts());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
  };
  //hem excel hem de imageleri base64-e ceviren function
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  ////////////////////////excel file upload
  //excel file sececek function
  const handleFileInputChange = (e) => {
    console.log("e.target.files[0].name", e.target.files[0].name);
    console.log("file path ", window.location + "   " + e.target.files[0].name);
    let { file } = selectedFile;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setSelectedFile({
          fileName: file.name,
          fileContext: file.base64,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Barkod",
      dataIndex: "barcode",
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
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Məhsul",
      dataIndex: ["product", "name"],
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
        style={{ marginTop: "10px" }}
        // style={{ position: "absolute", right: "30px", top: "70px" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>
      <Table
        style={{ marginTop: "20px" }}
        dataSource={storeHouseList}
        columns={columns}
        rowKey="id"
      ></Table>
      <Modal
        title="Anbar məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
            Geri
          </Button>,
        ]}
      >
        <StoreHouseAdd rowKey="id" handleCancel={handleCancel}></StoreHouseAdd>
      </Modal>
      <Modal
        title="Anbar məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
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
