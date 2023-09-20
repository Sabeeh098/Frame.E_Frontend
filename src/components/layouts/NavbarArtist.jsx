import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { artistLogout } from "../../store/slice/artist";
import { useDispatch } from "react-redux";
import icon from './icons/right-to-bracket-solid.svg';
import logo from './icons/Frame.e__1_-removebg-preview.png'
function NavbarArtist() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.artist);

  return (
    <div className="navbar bg-transparent font-bold text-slate-950">
   <div className="navbar-start">
  <div className="dropdown">
    <label tabIndex={0} className="btn btn-ghost lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black-900 rounded-box w-52">
      <li><a>POSTS</a></li>
      <li><a>ORDERS</a></li>
      <li><a>PROFILE</a></li>
    </ul>
  </div>
  <img src={logo} alt="Logo" className="h-14 w-75" />
</div>

      <div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
    <li><a className="hover:text-black hover:bg-gray-300">POSTS</a></li>
    <li><a className="hover:text-black hover:bg-gray-300">ORDERS</a></li>
    <li><a className="hover:text-black hover:bg-gray-300">PROFILE</a></li>
  </ul>
</div>


  <div className="navbar-end">
    <button className={`px-2 py-1 border border-gray-600 rounded hover:bg-gray-400 hover:text-white flex items-center justify-between ${token ? '' : 'bg-gray-600 text-white'}`} onClick={() => token ? dispatch(artistLogout()) : null}>
      {token ? 'Logout' : <><NavLink to="/artist/login">Login</NavLink></>}
      <img src={icon} alt="icon" className="h-4 w-4 ml-2" />
    </button>
  </div>

    </div>
  );
}

export default NavbarArtist;
