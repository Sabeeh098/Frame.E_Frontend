import { useState } from "react";
// import locofy from "./locofy.png"
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slice/user";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Dispatch the logout action here
    dispatch(userLogout());
    // Redirect to the home page or any other desired page after logout
    navigate("/login");
  };

  const toggleDropdown = () => {
    // Toggle the dropdown visibility
    setShowDropdown(!showDropdown);
  };

  const becomeArtist = () => {
   navigate("/artist/signup")
    // For now, let's just close the dropdown
    setShowDropdown(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 border-y-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <p className="text-black font-extrabold">FRAME.E</p>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-lg lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/store"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:underline"
          >
            Store
          </Link>
          <Link
            to="/artists"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:underline"
          >
            Artists
          </Link>
        </div>
        <span
          className="text-white-200 mr-4 text-2xl hover:cursor-pointer"
          onClick={toggleDropdown}
        >
          <FaUserCircle /> {/* Use the FaUserCircle icon */}
        </span>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute mt-32 right-0 bg-white border rounded-lg shadow-lg">
            <ul className="py-3 px-4">
              {/* Add your dropdown options here */}
              <li
                onClick={becomeArtist}
                className="cursor-pointer hover:bg-gray-100 py-2"
              >
                Become an Artist
              </li>
              <li className="cursor-pointer hover:bg-gray-100 py-2">
          <Link to="/profile">Profile</Link>
        </li>
            </ul>
          </div>
        )}
        <div>
          {token ? (
            <button
              className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
