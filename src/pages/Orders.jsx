import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
import { fetchUserOrderAsyncThunk } from "../store/order-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import Loader from "../components/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchUserOrderAsyncThunk(loggedInUser?._id));
    }
  }, [dispatch, loggedInUser?._id]);

  return (
    <div className="ecom-container p-4">
      <div className="header">
        <h2>Orders</h2>
      </div>
      {loading && <Loader />}
      {orders.length === 0 ? (
        <div className="flex items-center justify-center h-[80%]">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <span className=" text-dark-brown font-semibold text-xl ml-2">
            No orders found.
          </span>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
