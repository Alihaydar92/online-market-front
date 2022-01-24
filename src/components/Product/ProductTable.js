import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  listOfProducts,
  addProductExcel
} from "../../redux/actions/productActions";
import { Space, Button, Table, Modal, Upload, Input, InputNumber } from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";

export default function ProductTable() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64URL: "",
  });

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
          fileContext:file.base64,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // selectedFile({
    //   file: e.target.files[0],
    // });
  };
  const onCreateExcel = async (e) => {
    console.log(' add excel base64 data', selectedFile);  
        dispatch(addProductExcel(selectedFile));   
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
      dataIndex: ["categoryDto", "name"],
    },
    {
      title: "Xüsusiyyət",
      dataIndex: ["propertyDto", "name"],
    },
    {
      title: "Əməliyyat",
      dataIndex: "delete",
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
      <Input
        style={{ marginTop: "10px", width: "300px" }}
        // style={{ position: "absolute", right: "50px", top: "100px" }}
        accept=".xlsx, application/vnd.ms-excel"
        onChange={handleFileInputChange}
        type="file"
      />

      <Button
        style={{ marginTop: "10px", marginLeft: "10px" }}
        // style={{ position: "absolute", right: "1400px", top: "70px" }}
        type="primary"
        onClick={onCreateExcel}
      >
        Excel əlavə et
      </Button>
      <Button
        style={{ marginTop: "10px", marginLeft: "1200px" }}
        // style={{ position: "absolute", right: "30px", top: "70px" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>

      {/* <Button onClick={handleSubmission}>Submit</Button> */}
      {/* <Button>Excel faylını seç</Button> */}
      {/* <Input
                size="small"
                // ghost="success"
                type="file"
                accept=".xlsx, application/vnd.ms-excel"
                // onClick={() => showRemoveModal(getExcel)}
              />
                Excel */}
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
