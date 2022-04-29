import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Form, Input } from "antd";
import {
  listOfIncomeType,
  deleteIncomeType,
  updateIncomeType,
} from "../../redux/actions/incomeActions";
export default function IncomeTypeModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    dispatch(listOfIncomeType());
  }, [dispatch]);
  const incomeTypesTableData = useSelector(
    (state) => state.incomeReducers?.incomeTypesListData
  );
  useEffect(() => {
    setDataSource(incomeTypesTableData);
  }, [incomeTypesTableData]);

  useEffect(() => {
    console.log(editingRow);
  }, [editingRow]);
  const columns = [
    {
      title: "Növün adı",
      dataIndex: "name",
      render: (text, incomeTypeData) => {
        if (editingRow === incomeTypeData.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Növünü adını daxil edin",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, incomeTypeData) => {
        return (
          <Space size="middle">
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              onClick={() => {
                setEditingRow(incomeTypeData.id);
                form.setFieldsValue({
                  name: incomeTypeData.name,
                });
              }}
            >
              Redaktə et
            </Button>
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              htmlType="submit"
              // onClick={() => onClickUpdate(incomeTypeData)}
            >
              Yadda saxla
            </Button>
            <Button
              danger
              type="primary"
              size="small"
              onClick={() => showRemove(incomeTypeData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];

  const showRemove = (id) => {
    dispatch(deleteIncomeType(id));
  };
  const onFinish = (values) => {
    console.log(values);
    console.log(editingRow);
    // const updatedDataSource = [...dataSource];
    // updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    // setDataSource(updatedDataSource);
    // setEditingRow(null);
    var data = {
      id: editingRow,
      name: values.name,
    };

    dispatch(updateIncomeType(data));
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Table
          scroll={{ y: 460 }}
          style={{ wordBreak: "break-word" }}
          dataSource={dataSource}
          columns={columns}
          rowKey="incomeTypeTable"
          pagination={false}
        ></Table>
      </Form>
    </div>
  );
}
