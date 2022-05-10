import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Row,
  Col,
  Input,
  Form,
  InputNumber,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  showAddedBasketItems,
  endRestore,
  clearBasket,
} from "../../redux/actions/restoreActions";
import BasketDelete from "./BasketDelete";
import TextArea from "antd/lib/input/TextArea";
import { exportRestorePdf } from "../../redux/actions/pdfActions";
export default function RestoreBasket() {
  const dispatch = useDispatch();
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  const [basketId, setBasketId] = useState();
  const [basketNote, setBasketNote] = useState();
  const basketItems = useSelector(
    (state) => state.restoreReducers?.addRestoreBasketItems
  );
  const basketAllData = useSelector(
    (state) => state.restoreReducers?.restoreBasketAllData
  );
  const endRestoreBasketReturnData = useSelector(
    (state) => state.restoreReducers?.endRestoreReturnData
  );
  const [basketArray, setBasketArray] = useState();
  useEffect(() => {
    dispatch(showAddedBasketItems());
  }, [dispatch]);
  useEffect(() => {
    console.log(endRestoreBasketReturnData);
  }, [endRestoreBasketReturnData]);
  useEffect(() => {
    console.log(basketItems);
  }, [basketItems]);

  useEffect(() => {
    console.log(basketAllData);
  }, [basketAllData]);

  useEffect(() => {
    setBasketArray(basketItems);
    console.log(basketItems);
  }, [basketItems, basketArray]);

  useEffect(() => {
    console.log(basketArray);
  }, [basketArray]);

  const handleClear = () => { 
    dispatch(clearBasket());
  };
  const showRemoveModal = (id) => {
    setBasketId(id);

    setIsSilModalVisible(true);
  };
  const handleCancel = () => {
    setIsSilModalVisible(false);
  };

  const editBasketData = (basketData) => {
    console.log(basketData);
  };

  const columns = [
    {
      title: "Barkod",
      dataIndex: ["storeHouseDto", "barcode"],
    },
    {
      title: "Məhsulun adı",
      dataIndex: ["storeHouseDto", "productDto", "name"],
    },
    {
      title: "Say",
      dataIndex: "quantity",
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          value={text}
          onChange={onInputQuantityChange("refundQuantity", index)}
        />
      ),
    },
    {
      title: "Qiymət",
      dataIndex: ["storeHouseDto", "sellPrice"],
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          min={0}
          defaultValue={text}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          onChange={onInputPriceChange("sellPrice", index)}
        />
      ),
    },
    {
      title: "Güzəşt",
      dataIndex: "discountPercent",
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          defaultValue={text}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          onChange={onInputDiscountPercent("discountPercent", index)}
        />
      ),
    },
    {
      title: "Güzəştli qiyməti",
      dataIndex: "discount",

      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          defaultValue={text}
          editable={false}
          disabled={true}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
        />
      ),
    },
    {
      title: "Ümumi cəm",
      dataIndex: "totalPrice",
      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          min={0}
          defaultValue={text}
          editable={false}
          disabled={true}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
        />
      ),
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      width: "220px",
      render: (text, basketData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(basketData.storeHouseDto.id)}
            >
              Sil
            </Button>
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              onClick={() => editBasketData(basketData)}
            >
              Dəyişikliyi təsdiqlə
            </Button>
          </Space>
        );
      },
    },
  ];
  const onInputQuantityChange = (key, index) => (e) => {
    console.log(e);
    console.log(key);
    const newData = [...basketArray];
    newData[index][key] = Number(e);

    setBasketArray(newData);
  };

  const onInputPriceChange = (key, index) => (e) => {
    console.log(e);
    console.log(key);

    const newData = [...basketArray];
    newData[index].storeHouseDto[key] = Number(e);

    setBasketArray(newData);
  };

  const onInputDiscountPercent = (key, index) => (e) => {
    const newData = [...basketArray];
    newData[index][key] = Number(e);

    setBasketArray(newData);
  };
  const openPdf = () => {
    dispatch(exportRestorePdf(basketArray, basketAllData,"Qaytarma Qaimə"));
  };
  const endRestores = () => {
    var endSalesData = new Object();
    endSalesData.customerId = basketAllData.customerDto.id;
    endSalesData.customerDto = basketAllData.customerDto;
    endSalesData.sellerDto = basketAllData.sellerDto;
    endSalesData.sellerId = basketAllData.sellerId;
    // endSalesData.note = basketNote === undefined ? "" : basketNote;
    endSalesData.grandTotal = basketAllData.grandTotal;

    var result = basketArray.reduce(function (map, obj) {
      let key = obj.storeHouseDto.id.toString();
      map[key] = obj;
      return map;
    }, {});
    // endSalesData.items= JSON.stringify({...result});
    endSalesData.items = result;
    console.log(basketArray);

    console.log(endSalesData);
    // exportPdf(endSaleBasketReturnData)
    dispatch(endRestore(endSalesData, "Qaytarma Qaimə"));
  };
  const onChangeNote = (note) => [
    setBasketNote(note.target.value === undefined ? "" : note.target.value),
  ];
  return (
    <div>
      {" "}
      <Row style={{ marginTop: "10px" }}>
        <Col span={2}>
          <Button
            disabled={basketArray?.length === 0 ? true : false}
            onClick={handleClear}
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#ff7400",
              borderColor: "#ff7400",
            }}
          >
            Səbəti Təmizlə
          </Button>
        </Col>
        <Col span={2} offset={20}>
          <Button
            onClick={openPdf}
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
              display: "none",
            }}
          >
            Pdf-ə çap et
          </Button>
        </Col>
      </Row>
      <Table
        pagination={false}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={basketArray}
        columns={columns}
      />
      <Row>
        <h4>Qeyd:</h4>

        <TextArea onChange={onChangeNote}></TextArea>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col span={6} offset={18}>
          <h3>Yekun qiymət: {basketAllData?.grandTotal}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            <Link to="/restore">Qaytarmaya davam et</Link>
          </Button>
        </Col>
        <Col span={6} offset={12}>
          <Button
            onClick={endRestores}
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            Qaytarmanı yekunlaşdır
          </Button>
        </Col>
      </Row>
      <Modal
        title="Səbət məlumatının silinməsi"
        visible={isSilModalVisible}
        pagin
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <BasketDelete
          rowKey="id"
          basketIdProps={basketId}
          handleCancel={handleCancel}
        ></BasketDelete>
      </Modal>
    </div>
  );
}
