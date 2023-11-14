import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { adminAxiosInstance } from '../../api/axios';

const TABLE_HEAD = ["Product Name", "Price", "Address", "Quantity", "Actions"];

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await adminAxiosInstance.get('/orders');
      setOrders(response.data.adminOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleApprove = (orderId) => {
    // Implement logic to approve order with orderId
    console.log(`Order ${orderId} approved`);
  };

  const handleReject = (orderId) => {
    // Implement logic to reject order with orderId
    console.log(`Order ${orderId} rejected`);
  };

  return (
    <Card className="h-full w-full w-full max-h-[400px] max-w-[800px] overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ _id, orderDate, products, user }, index) => {
            return (
              <tr key={_id}>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {products[0].product.name}
                  </Typography>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {products[0].product.price}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {user.address[0]}
                  </Typography>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {products[0].quantity}
                  </Typography>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Button
                    color="green"
                    size="sm"
                    onClick={() => handleApprove(_id)}
                  >
                    Approve
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    onClick={() => handleReject(_id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default OrdersAdmin;
