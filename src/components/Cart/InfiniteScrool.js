import React, { useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { listOfCustomers } from "../../redux/actions/customerAction";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

export default function InfiniteScrool() {
  const dispatch = useDispatch();
  const customerlist = useSelector(
    (state) => state.customerReducers?.customerListData
  );

  const loadFunc = (page) => {
    console.log(page)
    dispatch(listOfCustomers(1, 15));
  };

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        {customerlist}
      </InfiniteScroll>
    </div>
  );
}
