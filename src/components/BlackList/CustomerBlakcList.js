import React, { useEffect, useState } from "react";
import { Form, Button, Select, Input, Space, Table } from "antd";
import { fetchCustomers } from "../../redux/actions/customerAction";
import {
  addBlackListCustomer,
  showBlackList,
} from "../../redux/actions/blackListActions";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
export default function CustomerBlakcList() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(showBlackList());
  }, [dispatch]);

  const fetchCustomerData = useSelector(
    (state) => state.customerReducer?.fetchCustomerData
  );
  const showBlackListData = useSelector(
    (state) => state.blackListReducers?.showBlackListData
  );

  useEffect(()=>{
    console.log(showBlackListData)
  },[showBlackListData])
  const onChangeProduct = (value) => {
    setCustomerId(value);
  };
  const addCustomerToBlackList = () => {
    console.log(";asasasas");
    console.log(customerId);
    dispatch(addBlackListCustomer(customerId));
  };

  const columns = [
    {
      title: "Müştəri adı",
      dataIndex: ["customerDto", "name"],
    },
  ];
  return (
    <div>
      <Space align="center" style={{ marginTop: "20px" }}>
        Müştərilər:
        <Select
          style={{ width: 200 }}
          onChange={onChangeProduct}
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
          {fetchCustomerData.map((customerData) => (
            <Option key={customerData.id} value={customerData.id}>
              {customerData.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={addCustomerToBlackList}>
          Əlavə et
        </Button>
      </Space>
      <Table
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        scroll={{ y: 530 }}
        dataSource={showBlackListData}
        columns={columns}
        rowKey="blackListTable"
      ></Table>
    </div>
  );
}
