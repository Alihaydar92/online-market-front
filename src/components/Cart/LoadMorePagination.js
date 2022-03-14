import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listOfCustomers } from "../../redux/actions/customerAction";
import * as actionTypes from "../../redux/actions/actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export default function LoadMorePagination() {
  const dispatch = useDispatch();
  const perPage = 15;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listOfCustomers = () => {
      const axiosInstance = axios.create({
        baseURL: baseURL,
        auth: {
          username: window.localStorage.getItem("username"),
          password: window.localStorage.getItem("password"),
        },
      });
      //?page=" + (page - 1) + "&size=" + pageSize
      axiosInstance
        .get(`customers?size=${perPage}&page=${page}`)

        .then((res) => {
          console.log(res.data);
          setTotalPages(res.totalPages);
          setUserList([...userList, ...res.data.pages]);
          setLoading(false);
        });
    };
    listOfCustomers();
  }, [page]);

  return (
    <div className="App">
      {userList.maps((x, i) => {
        return (
          <div key={i} className="box">
            <div className="name">
              {x.name} {x.last_name}
            </div>
            <div className="email">{x.email}</div>
          </div>
        );
      })}
      <div className="clearfix"></div>
      {totalPages !== page && (
        <button className="btn-load-more" onClick={() => setPage(page + 1)}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
