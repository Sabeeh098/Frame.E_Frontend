import DashBoard from '../../components/Admin/DashBoard';
import AdminNav from '../../components/layouts/AdminNav';
import AdminSidebar from '../../components/layouts/AdminSidebar';

function AdminHome() {
  return (
    <div>
      <AdminNav />
      <AdminSidebar>
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-10">DashBoard</h2>
          <DashBoard /> 
        </main>
      </AdminSidebar>
    </div>
  );
}

export default AdminHome;
