import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import { deleteCategory } from "../../redux/actions/categoryActions";
export default function CategoryDelete(props) {
  const dispatch = useDispatch();
  const categoryDataById = useSelector(
    (state) => state.categoryReducers.categoryDataById
  );
  const onDelete = (id) => async (e) => {
    dispatch(deleteCategory(id), []);
    props.handleCancel();
  };

  return (
    <div>
      <Form>
        <Form.Item label="Kateqoriya məlumatını silməyə əminsinizmi?"></Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onDelete(categoryDataById.id)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
