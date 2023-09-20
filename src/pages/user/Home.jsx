// import { useSelector } from "react-redux"
// import { NavLink } from "react-router-dom"
// import {userLogout} from '../../store/slice/user'
// import { useDispatch } from "react-redux"

import Navbar from "../../components/layouts/Navbar"

function Home() {
    // const dispatch = useDispatch()
    // const {token} =useSelector((state)=>state.user)
  return (
    <>
     <div>
     <Navbar/>
     <h1>Home page</h1>
     </div>
    </>
   
  )
}

export default Home