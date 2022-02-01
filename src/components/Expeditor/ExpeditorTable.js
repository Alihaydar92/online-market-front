import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfExpeditors,
  getExpeditorById,
  addExpeditorExcel,
} from "../../redux/actions/expeditorActions";
import { Button, Table, Modal, Space, Input ,Row} from "antd";
import ExpeditorAdd from "./ExpeditorAdd";
import ExpeditorEdit from "./ExpeditorEdit";
import ExpeditorDelete from "./ExpeditorDelete";
export default function ExpeditorTable() {
  const dispatch = useDispatch();
  /////////////////////////////////////////////file upload
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64URL: "",
  });
  const [disabledSave, setDisabledSave] = useState(true);

  /////////////////////////////////////////////file upload
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
  const onCreateExcel = async (e) => {
    console.log(" add excel base64 data", selectedFile);
    dispatch(addExpeditorExcel(selectedFile));
  };
  ////////////////////////excel file upload
  return (
    <div>
      <Row>
        <Space>
          Fayl seç:
          <Input
            style={{ marginTop: "10px", width: "300px"}}
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
            disabled={disabledSave}
          >
            Excel əlavə et
          </Button>
        </Space>
      </Row>
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={showAddModal}
      >
        Əlavə et
      </Button>
      <Table
        style={{ marginTop: "20px" ,wordBreak:'break-word'}}
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
