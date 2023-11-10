import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register"
import {useSelector} from "react-redux";
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';

import Home from '../src/pages/user/Home'
import ArtistRegister from './components/ArtistRegister';
import ArtistHome from './pages/artist/ArtistHome';

import AdminHome from './pages/admin/AdminHome';
import Users from './pages/admin/Users';
import Profile from './pages/artist/Profile';
import Artists from './pages/user/Artists';
import SpecificArtist from './components/User/SpecificArtist';
import Store from './pages/user/Store';
import Products from './pages/admin/Products';
import UserProfile from './pages/user/UserProfile';
import ChatIcon from './components/layouts/ChatIcon';
import ChatPage from './components/ChatPage';
import ArtistChat from './pages/artist/ArtistChat'
import PaymentModal from './components/User/PaymentModal';
import PaySuccess from './components/User/PaySuccess';
import PayFailed from './components/User/PayFailed';

import EmailVerify from './components/User/EmailVerify';
import Artistfull from './pages/admin/Artistfull';
import VisualArts from './components/Artist/VisualArts';
import Comments from './pages/admin/Comments';
import OrdersPage from './pages/artist/OrdersPage';
import AdminLogin from './components/AdminLogin';







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
    <Route element={<ChatIcon/>}>
          {/* User Pages */}
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Register />} />
          <Route path='/emailVerify/:userId' element={<EmailVerify/>} />
          <Route path="/login" element={userAuth !== null ? <Navigate to="/" />: <Login name='user' url='login'/>} />
          <Route path="/artists" element={<Artists/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/specificartist" element={<SpecificArtist/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/chat/:artistId" element={<ChatPage senderRole={"User"}/>} />
          <Route path="/chat" element={<ChatPage senderRole={"User"} />} />
          <Route path="/paymentSuccess" element={<PaySuccess/>} />
          <Route path="/paymentFailed" element={<PayFailed/>} />
      </Route>


         {/* Artist Pages */}
          <Route path="/artist/" element={<ArtistHome/>} />
          <Route path="/artist/orders" element={<OrdersPage/>}/>
          <Route path="/artist/signup" element={<ArtistRegister/>} />
          {/* <Route path="/artist/login" element={artistAuth !== null ? <Navigate to="/artist/"/> : <Login name='artist' url='/artist/login'/>} /> */}
          <Route path="/artist/login" element={artistAuth !== null ? <Navigate to="/artist/"/> : <Login name='artist' url='login'/>} />
          <Route path="/artist/profile" element={<Profile />} />
          <Route path="/artist/chat" element={<ArtistChat senderRole={'Artist'} />} />
          {/* <Route path="/artist/visualsArts" element={<VisualArts />} /> */}
         





        {/* Admin Pages */}
          <Route path="/admin/" element={adminAuth !== null ? <AdminHome /> : <Navigate to="/admin/login" />}/>
         <Route path="/admin/login" element={adminAuth !== null ? <Navigate to="/admin/"/>: <AdminLogin name = 'admin' url='admin/login'/>} />
        <Route path="/admin/users"  element={<Users/>}/>
        <Route path="/admin/artists"  element={<Artistfull/>}/>
        <Route path="/admin/products"  element={<Products/>}/>
        <Route path="/admin/comments"  element={<Comments/>}/>
    

        </Routes>
        
      </div>
    </Router>
  )
}

export default App
