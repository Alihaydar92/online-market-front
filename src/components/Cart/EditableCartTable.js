import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, InputNumber, Select, Row, Col } from "antd";
import { listOfProducts } from "../../redux/actions/productActions";
import "../../costTable.css";
const { Option } = Select;
const _defaultCosts = [
  {
    name: "Rice",
    price: 40
  },
  {
    name: "Noodle",
    price: 20
  }
];

const CostTable = () => {
  const dispatch=useDispatch();
  const [costs, setCosts] = useState(_defaultCosts);
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);
  const productList = useSelector(
    (state) => state.productReducers.productListData
  );
  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);
  };

  const addNewCost = () => {
    setCosts(prevCosts => [...prevCosts, { }]);
  };

  const getTotalCosts = () => {
    return costs.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  };

  return (
    <div className="table">
      <div className="table-title">Food costs</div>
      <div className="table-content">
        <div className="table-header">
          <div className="table-row">
            <div className="table-data">
              <div>Item</div>
            </div>
            <div className="table-data">
              <div>Price</div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {costs.map((item, index) => (
            <div className="table-row" key={index}>
             
              <Select showSearch
                optionFilterProp="children"
                // onSearch={onSearchProduct}
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
                }}>
                {productList.map((productData) => (
                  <Option key={productData.id} value={productData.id}>
                    {productData.name}
                  </Option>
                ))}
              </Select>
              
              
                <input
                  name="price"
                  data-id={index}
                  type="number"
                  value={item.price}
                  onChange={handleCostsChange}
                />
              
            </div>
          ))}
          <div className="table-row">
            <div className="table-data">
              <button onClick={addNewCost}>+</button>
            </div>
          </div>
        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-data">
              <div>Total</div>
            </div>
            <div className="table-data">
              <div>{getTotalCosts()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTable;
