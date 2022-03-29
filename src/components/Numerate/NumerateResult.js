import React, { useEffect } from "react";
import { Table } from "antd";
import { storeHouseNumerateResult } from "../../redux/actions/storeHouseActions";
import { useDispatch, useSelector } from "react-redux";
export default function NumerateResult() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeHouseNumerateResult());
  }, [dispatch]);

  const numerateResultData = useSelector(
    (state) => state.storeHouseReducers?.storeHouseNumerateResult
  );

  const columns = [
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Artırılmış say",
      dataIndex: "countQuantity",
    },
    {
      title: "Nəticə",
      dataIndex: "result",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={numerateResultData?.pages}></Table>
    </div>
  );
}
