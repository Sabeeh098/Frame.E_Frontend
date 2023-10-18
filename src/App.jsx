import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register"
import {useSelector} from "react-redux";
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import Home from '../src/pages/user/Home'
import ArtistRegister from './components/ArtistRegister';
import ArtistHome from './pages/artist/ArtistHome';
import AdminLogin from './components/adminLogin';
import AdminHome from './pages/admin/AdminHome';
import Users from './pages/admin/Users';
import Profile from './pages/artist/Profile';
import Artists from './pages/user/Artists';
import SpecificArtist from './components/User/SpecificArtist';
import Store from './pages/user/Store';
import Products from './pages/admin/Products';
import UserProfile from './pages/user/UserProfile';




function App() {
  const userAuth = useSelector((state)=> state.user.token)
  const artistAuth = useSelector((state)=> state.artist.token) 
  const adminAuth = useSelector((state)=>state.admin.token)
  console.log(userAuth)
  console.log(artistAuth);
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        
        <Routes>

          {/* User Pages */}
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={userAuth !== null ? <Navigate to="/" />: <Login name='user' url='login'/>} />
          <Route path="/artists" element={<Artists/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/specificartist" element={<SpecificArtist/>} />
          <Route path="/profile" element={<UserProfile/>} />
       


         {/* Artist Pages */}
          <Route path="/artist/" element={<ArtistHome/>} />
          <Route path="/artist/signup" element={<ArtistRegister/>} />
          {/* <Route path="/artist/login" element={artistAuth !== null ? <Navigate to="/artist/"/> : <Login name='artist' url='/artist/login'/>} /> */}
          <Route path="/artist/login" element={artistAuth !== null ? <Navigate to="/artist/"/> : <Login name='artist' url='login'/>} />
          <Route path="/artist/profile" element={<Profile />} />
         





        {/* Admin Pages */}
          <Route path="/admin/" element={adminAuth !== null ? <AdminHome /> : <Navigate to="/admin/login" />}/>
         <Route path="/admin/login" element={adminAuth !== null ? <Navigate to="/admin/"/>: <AdminLogin name = 'admin' url='admin/login'/>} />
        <Route path="/admin/users"  element={<Users/>}/>
        <Route path="/admin/products"  element={<Products/>}/>
    

        </Routes>
      </div>
    </Router>
  )
}

export default App
