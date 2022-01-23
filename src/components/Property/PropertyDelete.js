import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import {listOfProperties,deleteProperty} from "../../redux/actions/propertyActions"
export default function PropertyDelete(props) {
    const dispatch = useDispatch();
    const propertyDataById = useSelector(
      (state) => state.propertyReducers.propertyDataById
    );

    
    useEffect(() => {}, [propertyDataById]);
    useEffect(() => {
        console.log('propertyDataById ',propertyDataById)
    }, []);
    const onDelete = (id) => async (e) => {
      dispatch(deleteProperty(id), []);
      props.handleCancel();
      dispatch(listOfProperties());
    };
  
    return (
      <div>
        <Form>
          <Form.Item label="Xüsusiyyət məlumatını silməyə əminsinizmi?"></Form.Item>
          <Form.Item>
            <Button
              type="submit"
              htmlType="submit"
              style={{ position: "absolute", left: "320px", bottom: "-90px" }}
              onClick={onDelete(propertyDataById.id)}
            >
              Bəli
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}
