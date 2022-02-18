import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Input ,Select } from "antd";
import moment from "moment";
import { addStoreHouse } from "../../redux/actions/storeHouseActions";
import {listOfProducts} from "../../redux/actions/productActions"
const { Option } = Select;
const { TextArea } = Input;


function TableRows({rowsData, deleteTableRows, handleChange}) {
    const dispatch = useDispatch();
    const productListData=useSelector(
        (state) =>state.productReducers?.productListData
      )
    useEffect(()=>{
      dispatch(listOfProducts());
    },[])
    useEffect(()=>{
        console.log('productListData ',productListData)
          },[productListData])
    return(
        
        rowsData.map((data, index)=>{
          console.log('data: ',data)
            const {fullName, emailAddress, salary}= data;
            return(

                <tr key={index}> 
                <td>
               {/* <input type="text" value={fullName} onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control"/> */}
               {/* <select id="fullName" onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control">
    <option value="fullName">Volvo</option>
    <option value="fullName">Saab</option>
    <option value="fullName">Opel</option>
    <option value="fullName">Audi</option>
  </select> */}
  <Select   onChange={(evnt)=>(handleChange(index, evnt))} name="fullName"
  style={{ width: 200 }}
            // showSearch
            // optionFilterProp="children"
            // filterOption={(input, option) => {
            //   return (
            //     option.props.children
            //       .toString()
            //       .toLowerCase()
            //       .indexOf(input.toLowerCase()) >= 0 ||
            //     option.props.value
            //       .toString()
            //       .toLowerCase()
            //       .indexOf(input.toLowerCase()) >= 0
            //   );
            // }}
          >
            {productListData.map((fullName) => (
              <Option  
               key={fullName.id} value={fullName.id} name="fullName">
                {fullName.name}
              </Option>
            ))}
          </Select>
                </td>
                <td><input type="text" value={emailAddress}  onChange={(evnt)=>(handleChange(index, evnt))} name="emailAddress" className="form-control"/> </td>
                <td><input type="text" value={salary}  onChange={(evnt)=>(handleChange(index, evnt))} name="salary" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>

            )
        })
   
    )
    
}

export default TableRows;