import React from 'react'
import ArtistTable from '../../components/Admin/ArtistTable'
import AdminNav from '../../components/layouts/AdminNav'
import AdminSidebar from '../../components/layouts/AdminSidebar'

function Artistfull() {
  return (
    <>
    <AdminNav />
      <AdminSidebar>
      <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-10">Artists</h2>
          <ArtistTable/>
        </main>
      </AdminSidebar>
    </>
  )
}

export default Artistfull