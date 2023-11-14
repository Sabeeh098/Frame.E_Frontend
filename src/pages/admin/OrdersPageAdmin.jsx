import React from 'react'
import AdminNav from '../../components/layouts/AdminNav'
import AdminSidebar from '../../components/layouts/AdminSidebar'
import OrdersAdmin from '../../components/Admin/OrdersAdmin'


function OrdersPageAdmin() {
  return (
    <>
    <AdminNav/>
      <AdminSidebar>
      <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-10">ORDERS</h2>
          <OrdersAdmin/>
        </main>
      </AdminSidebar>
    </>
  )
}

export default OrdersPageAdmin