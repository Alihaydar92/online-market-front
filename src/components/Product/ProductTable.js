import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  listOfProducts,
  addProductExcel,
  addProductImages,
  getProductImagesByProductId
} from "../../redux/actions/productActions";
import { Space, Button, Table, Modal, Input,Row,Col } from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ImageUploading from "react-images-uploading";
import "../../style.css";

export default function ProductTable() {
  const dispatch = useDispatch();
  /////////////////////////////////////////////file upload
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64URL: "",
  });
  /////////////////////////////////////////////file upload

  //////////////////////////////////////////////////image upload
  const [images, setImages] = useState([{id:''}]);
  const maxNumber = 10;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    // var content=""; 
    // var myArray=[];
    // let splittedBase64Array=[];
    //  imageList.forEach(function (item, index) {
    //   console.log(item, index);
    //    myArray = item.content.split(",", -1);
    //   console.log(myArray)
    //    content= myArray[1];
    //    console.log(content)
       
    //    splittedBase64Array.push({content});
    // });
    // // splittedBase64Array.push(text);
    // // imageList=splittedBase64Array;
    // console.log(splittedBase64Array);
    // console.log(imageList);
    setImages(imageList);
  };
  //////////////////////////////////////////////////image upload

  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
  const productDataById = useSelector(
    (state) => state.productReducers?.productDataById
  );

  const productImagesDataByProductId=useSelector(
    (state) => state.productReducers?.productImagesDataByProductId
  )
  const [dataSource, setDataSource] = useState();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);

  useEffect(() => {
    console.log("listOfProductData", listOfProductData);
    setDataSource(listOfProductData)
  },[listOfProductData]);

  const FilterByBarcodeInput = (
    <Input
      placeholder="Barkodla axtar"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = listOfProductData.filter((entry) =>
          entry.barcode.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  

  

  
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState(false);
  const [isRedakteEtModalVisible, setIsRedakteModalVisible] = useState(false);
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  const [isImgPanelVisible, setIsImgPanelVisible] = useState(false);

  const showAddModal = () => {
    setIsElaveEtModalVisible(true);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(false);
  };
  const showEditModal = (data) => {
    dispatch(getProductById(data.id));
    setIsRedakteModalVisible(true);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(false);
  };
  const showRemoveModal = (id) => {
    console.log("productDataById", productDataById);
    dispatch(getProductById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
    setIsImgPanelVisible(false);
  };
  const showImgPanel = (id) => {
    // setImages(null);
    dispatch(getProductImagesByProductId(id));
    dispatch(getProductById(id));
    console.log("productDataById", productDataById);
    console.log("productImagesDataByProductId", productImagesDataByProductId);
    setImages(productImagesDataByProductId.images);
    console.log('images ',images)
   
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(true);
  };
  const handleCancel = () => {
    dispatch(listOfProducts());
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(false);
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
  const onCreateExcel = async (e) => {
    console.log(" add excel base64 data", selectedFile);
    dispatch(addProductExcel(selectedFile));
  };
  ////////////////////////excel file upload

  //save images
  const onSaveImages = () => {
    console.log(" productDataById", productDataById);
    console.log(" images", images);
    let data={
      images:images
      
    }
   
    console.log(" images data: ", data);
    dispatch(addProductImages(productDataById.id,data));
  };

  const columns = [
    {
      title: "Məhusulun adı",
      dataIndex: "name",
    },
    {
      title: FilterByBarcodeInput,
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
      dataIndex: "operation",
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
            <Button
              size="small"
              type="danger"
              onClick={() => showImgPanel(productData.id)}
            >
              Şəkil
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
        style={{ marginTop: "10px", marginLeft: "1150px" }}
        // style={{ position: "absolute", right: "30px", top: "70px" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>
      <Table
        style={{ marginTop: "20px" }}
        dataSource={dataSource}
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

      <Modal
        title="Məhsula şəkillər əlavə edilməsi"
        visible={isImgPanelVisible}
        onCancel={handleCancel}
        width={2000}
        height={1000}
        footer={[
          <div>
            <Button danger onClick={handleCancel}>
              Geri
            </Button>
            <Button danger onClick={onSaveImages}>
              yadda saxla
            </Button>
          </div>,
        ]}
      >
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="content"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              <Row>
              {imageList.map((image, index) => (
                <Col>
                <div key={index} className="image-item">
                  <img src={image["content"]} alt="" width="100" height={100} />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
                </Col>
                
              ))}
              </Row>
              
            </div>
          )}
        </ImageUploading>
      </Modal>
    </div>
  );
}
