
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import {
  deleteStoreHouse,
  listOfStoreHouse,
} from "../../redux/actions/storeHouseActions";
export default function StoreHouseDelete(props) {
    const dispatch = useDispatch();
    const storeHouseDataById = useSelector(
        (state) => state.storeHouseReducers.storeHouseDataById
      );
    const onDelete = (id) => async (e) => {
      dispatch(deleteStoreHouse(id), []);
      props.handleCancel();
      dispatch(listOfStoreHouse());
    };
  
    return (
      <div>
        <Form>
          <Form.Item label="Anbar məlumatını silməyə əminsinizmi?"></Form.Item>
          <Form.Item>
            <Button
              type="submit"
              htmlType="submit"
              style={{ position: "absolute", left: "320px", bottom: "-90px" }}
              onClick={onDelete(storeHouseDataById.id)}
            >
              Bəli
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}

