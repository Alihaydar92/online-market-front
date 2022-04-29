import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Form, Input } from "antd";
import {
  listOfCostType,
  deleteCostType,
  updateCostType,
} from "../../redux/actions/costActions";
export default function CostTypeModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const costTypesTableData = useSelector(
    (state) => state.costReducers?.costTypesListData
  );
  useEffect(() => {
    dispatch(listOfCostType());
  }, [dispatch]);
  useEffect(() => {
    setDataSource(costTypesTableData);
  }, [costTypesTableData]);

  useEffect(() => {
    console.log(editingRow);
  }, [editingRow]);
  const columns = [
    {
      title: "Növün adı",
      dataIndex: "name",
      render: (text, costTypeData) => {
        if (editingRow === costTypeData.id) {
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
      render: (text, costTypeData) => {
        return (
          <Space size="middle">
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              onClick={() => {
                setEditingRow(costTypeData.id);
                form.setFieldsValue({
                  name: costTypeData.name,
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
              onClick={() => showRemove(costTypeData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];

  const showRemove = (id) => {
    dispatch(deleteCostType(id));
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

    dispatch(updateCostType(data));
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Table
          scroll={{ y: 460 }}
          style={{ wordBreak: "break-word" }}
          dataSource={dataSource}
          columns={columns}
          rowKey="costTypeTable"
          pagination={false}
        ></Table>
      </Form>
    </div>
  );
}
