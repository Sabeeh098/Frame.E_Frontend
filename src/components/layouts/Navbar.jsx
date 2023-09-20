import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogout } from "../../store/slice/user";
import { useDispatch } from "react-redux";
import icon from './icons/right-to-bracket-solid.svg';

function Navbar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  return (
    <div className="navbar bg-gray-600 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-gray-900 rounded-box w-52">
            <li><a>HOME</a></li>
            <li><a>STORE</a></li>
            <li><a>ARTISTS</a></li>
          </ul>
        </div>
        <a className="normal-case text-xl font-family text-white p-2"  style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>FRAME.E</a>

      </div>
      <div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
    <li><a className="hover:text-white hover:bg-gray-300">HOME</a></li>
    <li><a className="hover:text-white hover:bg-gray-300">STORE</a></li>
    <li><a className="hover:text-white hover:bg-gray-300">ARTISTS</a></li>
  </ul>
</div>


  <div className="navbar-end">
    <button className={`px-2 py-1 border border-gray-600 rounded hover:bg-gray-400 hover:text-white flex items-center justify-between ${token ? '' : 'bg-gray-600 text-white'}`} onClick={() => token ? dispatch(userLogout()) : null}>
      {token ? 'Logout' : <><NavLink to="/login">Login</NavLink></>}
      <img src={icon} alt="icon" className="h-4 w-4 ml-2" />
    </button>
  </div>

    </div>
  );
}

export default Navbar;
