import { useState } from "react";
import { Link } from "react-router-dom";


function AdminSidebar({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white w-1/5 p-6 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transform transition-transform duration-300 md:translate-x-0 md:block`}
        >
          <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
          <nav className="space-y-4">
            <Link
              to="/admin"
              className="block hover:bg-slate-600 px-4 py-2 rounded transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="block hover:bg-slate-600 px-4 py-2 rounded transition duration-300"
            >
              Users
            </Link>
            <Link
              to="/products"
              className="block hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
            >
              Artists
            </Link>
            <Link
              to="/products"
              className="block hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
            >
              Products
            </Link>
            {/* Add more navigation links */}
          </nav>
        </aside>
  
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden absolute top-4 left-4 text-red-500"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
  
        {/* Main Content */}
       
          {children}
        
      </div>
    );
  }
  
  export default AdminSidebar;