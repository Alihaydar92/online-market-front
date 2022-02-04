import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  addProductExcel,
  addProductImages,
  getProductImagesByProductId,
  listOfProductsByPage,
  searchProduct,
} from "../../redux/actions/productActions";
import { Space, Button, Table, Modal, Input, Row, Col, Form } from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ImageUploading from "react-images-uploading";
import "../../style.css";
import { SearchOutlined } from "@ant-design/icons";

export default function ProductTable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
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
    setImages(imageList);
  };
  //////////////////////////////////////////////////image upload

  const listOfProductDataByPage = useSelector(
    (state) => state.productReducers?.productListDataByPage
  );
  const productDataById = useSelector(
    (state) => state.productReducers?.productDataById
  );

  const productImagesDataByProductId = useSelector(
    (state) => state.productReducers?.productImagesDataByProductId
  );

  useEffect(() => {
    dispatch(listOfProductsByPage(pagination.page, pagination.pageSize));
  }, []);

  useEffect(() => {}, [listOfProductDataByPage]);

  useEffect(() => {
    setImages(productImagesDataByProductId.images);
  }, [productImagesDataByProductId]);

  useEffect(() => {
    form.setFieldsValue({
      name: "",
      barcode: "",
      note: "",
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
    dispatch(addProductImages(productDataById.id, data, pagination));
    handleCancel();
  };
  const onSearch = (e) => {
    var searchData = {
      name: form.getFieldsValue().name.trim(),
      barcode: form.getFieldsValue().barcode.trim(),
      note: form.getFieldsValue().note.trim(),
    };
    dispatch(searchProduct(searchData, pagination));
    setPagination({
      page: listOfProductDataByPage.currentPage + 1,
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
    dispatch(listOfProductsByPage(pagination.page, pagination.pageSize));
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
            style={{ marginLeft: "10px" }}
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
          <Button type="primary" onClick={showAddModal}>
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
          <Form.Item label="Məhsul:" name="name">
            <Input allowClear />
          </Form.Item>
          <Form.Item  label="Barkod:" name="barcode">
            <Input  allowClear />
          </Form.Item>
          <Form.Item label="Qeyd:" name="note">
            <Input allowClear />
          </Form.Item>
          <Form.Item>
            <Button
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
              style={{ left: "20px" }}
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
        dataSource={listOfProductDataByPage.pages}
        scroll={{ y: 420 }}
        columns={columns}
        rowKey="id"
        pagination={{
          // defaultCurrent:0,
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: listOfProductDataByPage.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
            dispatch(listOfProductsByPage(page, pageSize));
          },
        }}
      ></Table>
      <Modal
        title="Məhsulun əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel}>
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
          <Button danger onClick={handleCancel}>
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
          <Button danger onClick={handleCancel}>
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
            <Button danger onClick={handleCancel}>
              Geri
            </Button>
            <Button danger onClick={onSaveImages}>
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
                  <Col>
                    <div key={index} className="image-item">
                      <img
                        style={{ marginTop: "10px", marginRight: "10px" }}
                        src={image["content"]}
                        alt=""
                        width="100"
                        height={100}
                      />
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
