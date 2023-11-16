import React, { useState, useEffect } from "react";
import { artistAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";

function Orders() {
  const token = useSelector((state) => state.artist.token);
  console.log(token);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleApprove = async () => {
    try {
      // Update the order status to "delivered" in the backend
      await artistAxiosInstance.put(`approve/${selectedOrder._id}`, {
        status: "delivered",
      });

      // Fetch updated orders after approval
      fetchOrders();

      // Close the modal
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
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
            <th>Action</th>
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
              <td>
                {order.status === "pending" && (
                  <button onClick={() => openModal(order)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Approval */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Are you sure you want to approve this order?</p>
            <button onClick={handleApprove}>Approve</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
