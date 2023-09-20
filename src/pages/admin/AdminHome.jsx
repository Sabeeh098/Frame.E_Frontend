
import AdminNav from '../../components/layouts/AdminNav'

import AdminSidebar from '../../components/layouts/AdminSidebar';
// import Users from '../admin/Users';


function AdminHome() {
  return (
    <div>

   <AdminNav/>
  <AdminSidebar>
  <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-4">DashBoard</h2>
          </main>
  </AdminSidebar>

  </div>
  );
}

export default AdminHome