import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../store/slice/admin';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const AdminNav = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.admin);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Dispatch the adminLogout action here to log the admin out
    dispatch(adminLogout());
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div>
        <h1 className="text-white text-xl font-semibold">Admin Panel</h1>
      </div>
      <div className="relative flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md p-2 outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-400"
          />
        </div>
        <button
          onClick={toggleDropdown}
          className="text-white font-semibold ml-4 focus:outline-none"
        >
          Admin Name
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-10 w-48 bg-white border rounded-lg shadow-lg">
            <ul>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Settings
                </a>
              </li>
              <li>
                {token ? (
                  // If the admin is logged in, show the logout button
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
                  >
                    Logout
                  </button>
                ) : (
                  // If the admin is not logged in, show the login button and navigate to /admin/login
                  <NavLink
                    to="/admin/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;
