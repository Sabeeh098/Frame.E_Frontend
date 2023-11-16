import React, { useState, useEffect } from "react";
import { artistAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";


function Orders() {
  const token = useSelector((state) => state.artist.token);
  console.log(token);
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
     const response = await artistAxiosInstance.get("/order", {
       headers: {
         Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.orders);

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table className="table">
        {/* Head */}
        <thead>
          <tr>
            <th></th>
    
            <th>Post Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows based on fetched orders */}
          {orders.map((order, index) => (
            <tr key={index}>
    <th>{index + 1}</th>
    <td>{order.items[0]?._id ? order.items[0]._id.toString().substring(0, 6) : "N/A"}</td>
    <td>{order.amount}</td>
    <td>{order.status}</td>
    <td>{order.ShippingAddress}</td>
  </tr>
))}


        </tbody>
      </table>
    </div>
  );
}

export default Orders;
