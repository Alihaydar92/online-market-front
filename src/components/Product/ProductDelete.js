import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import { deleteProduct } from "../../redux/actions/productActions";
export default function ProductDelete(props) {
  const dispatch = useDispatch();
  const productDataById = useSelector(
    (state) => state.productReducers?.productDataById
  );
  const onDelete = (id) => async (e) => {
    dispatch(deleteProduct(id,props.pagination),[]);
    props.handleCancel();
  };

  return (
    <div>
      <Form>
        <Form.Item label="Məhsul məlumatını silməyə əminsinizmi?"></Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onDelete(productDataById.id)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
