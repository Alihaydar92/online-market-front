import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  addProductExcel,
  addProductImages,
  getProductImagesByProductId,
  searchProduct,
} from "../../redux/actions/productActions";
import {
  Space,
  Button,
  Table,
  Modal,
  Input,
  Row,
  Col,
  Form,
  Image,
} from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ImageUploading from "react-images-uploading";
import "../../style.css";
import { SearchOutlined } from "@ant-design/icons";
export default function ProductTable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  var base64Prefix = "data:image/jpeg;base64,";
  /////////////////////////////////////////////file upload
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64URL: "",
  });
  const [disabledSave, setDisabledSave] = useState(true);
  /////////////////////////////////////////////file upload

  /////////////////////////////////////////////pagination
  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const setfirstpage = () => {
    pagination.page = 1;
  };
  /////////////////////////////////////////////pagination

  //////////////////////////////////////////////////image upload
  const [images, setImages] = useState([{ id: "" }]);
  const maxNumber = 10;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    // var arr = [];
    // for (let imgValue of Object.values(imageList)) {
    //   if (imgValue.content.includes(",")) {
    //     arr.push({ content: imgValue.content.split(",")[1] });
    //   } else {
    //     arr.push({ content: imgValue.content });
    //   }
    // }
    // console.log(arr);
    setImages(imageList);
  };
  //////////////////////////////////////////////////image upload
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
      title: "Tip",
      dataIndex: ["categoryDto", "name"],
    },
    {
      title: "Xüsusiyyət",
      dataIndex: ["propertyDto", "name"],
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      width: "220px",
      render: (text, productData) => {
        return (
          <Space size="middle">
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
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
              type="primary"
              onClick={() => showImgPanel(productData.id)}
            >
              Şəkil
            </Button>
          </Space>
        );
      },
    },
  ];
  const listOfProductDataByPage = useSelector(
    (state) => state.productReducers?.productListDataByPage
  );
  useEffect(() => {
    console.log("first");
    dispatch(searchProduct("", pagination.page, pagination.pageSize, false));
  }, []);

  const productDataById = useSelector(
    (state) => state.productReducers?.productDataById
  );

  const productImagesDataByProductId = useSelector(
    (state) => state.productReducers?.productImagesDataByProductId
  );

  useEffect(() => {
    console.log(productImagesDataByProductId);
   
    var arr = [];
    if (
      productImagesDataByProductId !== null &&
      productImagesDataByProductId !== undefined &&
      productImagesDataByProductId.length !== 0
    ) {
      for (let imgValue of Object.values(
        productImagesDataByProductId?.images
      )) {
        if (imgValue.content.includes(",")) {
          arr.push({ content: imgValue });
        } else {
          arr.push({ content: base64Prefix.concat(imgValue.content) });
        }
      }
      console.log(arr);
      setImages(arr);
    }
  }, [productImagesDataByProductId]);

  useEffect(() => {
    form.setFieldsValue({
      name: "",
    });
  }, [form]);

  ////////////////////////////////////////////////////////////////////modals
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
    dispatch(getProductById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(true);
    setIsImgPanelVisible(false);
  };
  const showImgPanel = (id) => {
    dispatch(getProductImagesByProductId(id));
    dispatch(getProductById(id));
    setIsRedakteModalVisible(false);
    setIsElaveEtModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(true);
  };
  const handleCancel = () => {
    setIsElaveEtModalVisible(false);
    setIsRedakteModalVisible(false);
    setIsSilModalVisible(false);
    setIsImgPanelVisible(false);
  };
  ////////////////////////////////////////////////////////////////////modals

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
    setDisabledSave(false);
  };
  const onCreateExcel = (paginationData) => () => {
    console.log(" add excel base64 data", selectedFile);
    dispatch(addProductExcel(selectedFile, paginationData));
  };
  ////////////////////////excel file upload

  //save images
  const onSaveImages = () => {
    console.log(" productDataById", productDataById);
    console.log(" images", images);
    let data = {
      images: images,
    };

    console.log(" images data: ", data);
    dispatch(addProductImages(productDataById?.id, data, pagination));
    handleCancel();
  };
  const onSearch = (e) => {
    var searchData = form.getFieldsValue().name;

    dispatch(
      searchProduct(searchData, pagination.page, pagination.pageSize, false)
    );
    setPagination({
      page: listOfProductDataByPage?.currentPage + 1,
      pageSize: 15,
    });
    // setDataSource(searchProductData.pages);
    // setTotal(searchProductData.totalItems);
  };

  const onClear = () => {
    form.setFieldsValue({
      name: "",
      barcode: "",
      note: "",
    });
  };

  const onRefresh = () => {
    onClear();
    pagination.page = 1;
    dispatch(searchProduct("", pagination.page, pagination.pageSize, false));
  };
  return (
    <div>
      <Row style={{ marginTop: "20px" }}>
        <Space>
          Fayl seç:
          <Input
            style={{ width: "300px" }}
            accept=".xlsx, application/vnd.ms-excel"
            onChange={handleFileInputChange}
            type="file"
          />
          <Button
            style={{
              marginLeft: "10px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            type="primary"
            onClick={onCreateExcel(pagination)}
            disabled={disabledSave}
          >
            Excel əlavə et
          </Button>
        </Space>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          <Button
            type="primary"
            onClick={showAddModal}
            style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
          >
            Əlavə et
          </Button>
        </Col>
      </Row>

      <Form
        form={form}
        name="basic"
        layout="inline"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ marginTop: "20px" }}
      >
        <Input.Group compact>
          <Form.Item label="Axtarış:" name="name">
            <Input allowClear />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              icon={<SearchOutlined />}
              type="primary"
              htmlType="submit"
              onClick={onSearch}
            >
              Axtar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                left: "20px",
                backgroundColor: "#ff7400",
                borderColor: "#ff7400",
              }}
              onClick={onClear}
            >
              Təmizlə
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ left: "40px" }}
              onClick={onRefresh}
            >
              Yenilə
            </Button>
          </Form.Item>
        </Input.Group>
      </Form>

      <Table
        style={{ wordBreak: "break-word", marginTop: "20px" }}
        scroll={{ y: 420 }}
        dataSource={listOfProductDataByPage?.pages}
        columns={columns}
        rowKey="id"
        pagination={{
          // defaultCurrent:0,
          current: listOfProductDataByPage?.currentPage + 1,
          pageSize: pagination.pageSize,
          total: listOfProductDataByPage?.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
            var searchData = form.getFieldsValue().name;

            dispatch(searchProduct(searchData, page, pageSize, true));
          },
        }}
      ></Table>
      <Modal
        title="Məhsulun əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <ProductAdd
          rowKey="id"
          handleCancel={handleCancel}
          firstPage={setfirstpage}
        ></ProductAdd>
      </Modal>
      <Modal
        title="Məhsul məlumatına düzəliş edilməsi"
        visible={isRedakteEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <ProductEdit
          paginationData={pagination}
          rowKey="id"
          handleCancel={handleCancel}
        ></ProductEdit>
      </Modal>
      <Modal
        title="Məhsul məlumatının silinməsi"
        visible={isSilModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <ProductDelete
          paginationData={pagination}
          rowKey="id"
          handleCancel={handleCancel}
        ></ProductDelete>
      </Modal>
      <Modal
        title="Məhsula şəkillər əlavə edilməsi"
        visible={isImgPanelVisible}
        onCancel={handleCancel}
        width={2000}
        height={1000}
        footer={[
          <div>
            <Button danger onClick={handleCancel} type="primary">
              Geri
            </Button>
            <Button
              type="primary"
              onClick={onSaveImages}
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
            >
              Yadda saxla
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
              <Row>
                <button onClick={onImageUpload} {...dragProps}>
                  Faylı seç
                </button>
                &nbsp;&nbsp;&nbsp;
              </Row>

              <Row>
                {imageList.map((image, index) => (
                  <Col style={{ marginTop: "10px", marginRight: "10px" }}>
                    <div key={index} className="image-item">
                      <Image.PreviewGroup>
                        <Image
                          // style={{ marginTop: "10px", marginRight: "10px" }}
                          // src={`data:image/jpeg;base64,${image["content"]}`}
                          //qeyd: backende sekillerin base 64 nun qarisina  data:image/jpeg;base64 vurulanda useeffectde data:image/jpeg;base64 concat etmeyi silecem,

                          src={`${image["content"]}`}
                          // alt={}
                          width={200}
                          height={200}
                        />
                      </Image.PreviewGroup>

                      <div className="image-item__btn-wrapper">
                        <button
                          style={{ marginTop: "10px" }}
                          onClick={() => onImageRemove(index)}
                        >
                          Sil
                        </button>
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
