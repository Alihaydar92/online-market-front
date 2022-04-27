import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cashboxTypeList,
  cashboxAdd,
} from "../../redux/actions/cashBoxActions";

const { Option } = Select;
export default function CashBoxPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [cashboxTypeDataState, setCashboxTypeDataState] = useState(null);

  const cashboxTypeListData = useSelector(
    (state) => state.cashboxReducers?.cashboxTypeListData
  );

  useEffect(() => {
    dispatch(cashboxTypeList());
  }, []);

  const onChangeCashboxCombo = (e) => {
    setCashboxTypeDataState(e);
  };

  const onClickAddCashbox = () => [
    form
      .validateFields()
      .then((values) => {
        var addData = {
          name: values.customer,
          boxTypeId: cashboxTypeDataState,
        };
        console.log(addData);
        dispatch(cashboxAdd(addData));
      })
      .catch((err) => {}),
  ];
  return (
    <div>
      Kassa tipi:
      <Select
        style={{ width: 200, marginTop: "20px" }}
        onChange={onChangeCashboxCombo}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => {
          return (
            option.props.children
              .toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0 ||
            option.props.value
              .toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          );
        }}
      >
        {cashboxTypeListData.map((cashboxTypeData) => (
          <Option key={cashboxTypeData.id} value={cashboxTypeData.id}>
            {cashboxTypeData.name}
          </Option>
        ))}
      </Select>
      {cashboxTypeDataState === null ? (
        <p>Məlumat yoxdur</p>
      ) : (
        <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
          <Form.Item
            label="Tarix aralığı"
            type="object"
            name="dateRange"
            rules={[
              { required: false, message: "Tarix aralığını  daxil edin!" },
            ]}
          >
            <DatePicker placeholder="tarix aralığını seçin" />
          </Form.Item>
          <Form.Item
            label="Müştəri"
            name="customer"
            rules={[{ required: true, message: "Müştərini daxil edin!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Məbləğ"
            name="price"
            rules={[{ required: false, message: "Məbləği daxil edin!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Növü"
            name="type"
            rules={[{ required: false, message: "Növü daxil edin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Qeyd"
            name="note"
            rules={[{ required: false, message: "Qeydi daxil edin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#0C9873",
                borderColor: "#0C9873",
              }}
              onClick={onClickAddCashbox}
            >
              Əlavə et
            </Button>
          </Form.Item>
        </Form>
      )}
      <br />
    </div>
  );
}
