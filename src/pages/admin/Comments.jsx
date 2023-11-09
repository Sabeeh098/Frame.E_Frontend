import React from 'react'

import AdminNav from '../../components/layouts/AdminNav'
import AdminSidebar from '../../components/layouts/AdminSidebar'
import CommentsList from '../../components/Admin/CommentsList'

function Comments() {
  return (
    <>
    <AdminNav />
      <AdminSidebar>
      <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-10">Comments</h2>
          <CommentsList/>
        </main>
      </AdminSidebar>
    </>
  )
}

export default Comments;