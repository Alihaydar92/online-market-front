import React from "react";
import { Image } from "antd";
import { useSelector } from "react-redux";
const noImg = require("../../helpers/no-img.png");
export default function InvoiceShowImgPanel() {
  const imgsByProductId = useSelector(
    (state) => state.productReducers?.productImagesDataByProductId
  );
  return (
    <div>
      {imgsByProductId?.images?.length < 1 ? (
        <Image src={String(noImg)} width={200} height={200} preview={true} />
      ) : (
        imgsByProductId?.images?.map((image, index) => (
          <Image
            src={`data:image/jpeg;base64,${image["content"]}`}
            width={200}
            height={200}
            preview={true}
          />
        ))
      )}
    </div>
  );
}
