import { useState } from "react";
import {artistAxiosInstance} from "../api/axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import bgimg from "../assets/bgartist.jpg"
import img from "../assets/artistlogin.jpg"


function ArtistRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation

    // Perform form validation
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      return;
    }

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    console.log(name)
   await artistAxiosInstance.post('/signup',{
    name,
    email,
    password,
   }).then((res)=>{
    toast.success(res.data.message,"Artist Registered");

     navigate('/artist/login')
   }).catch((err)=>{
    console.log(err);
    toast.error(err.response.data.ErrMessage);
   })


  };

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="min-h-screen flex justify-center items-center" style={backgroundStyle}>
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full" src={img} alt="login" />
        </div>
        <div className="p-4 flex flex-col justify-around" style={{ marginTop: "-10px" }}>
          <form className="pb-0" onSubmit={handleSubmit}>
            {/* <h2 className="text-4xl font-bold text-center mb-8 font-mono">ON BOARD AS AN ARTIST</h2> */}
            <h2
  className="text-4xl font-bold text-center mb-8"
  style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
>
  ON BOARD AS AN ARTIST
</h2>

            <div className="mt-0" style={{ marginTop: "-25px" }}>
              <label htmlFor="name" className="text-lg font-semibold font-garamond">
                Name
              </label>
              <input
                id="name"
                className={`border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100 ${
                  errors.name ? "border-red-500" : ""
                }`}
                type="text"
                name="name"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="text-lg font-semibold font-garamond">
                Email
              </label>
              <input
                id="email"
                className={`border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="text"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="text-lg font-semibold font-garamond">
                Password
              </label>
              <input
                id="password"
                className={`border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="text-lg font-semibold font-garamond">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                className={`border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              className="w-full py-2 my-4 bg-blue-600 hover:bg-slate-500 text-white rounded-md"
              type="submit"
            >
              Signup
            </button>

            <p className="text-center text-gray-800 cursor-pointer hover:underline">
              Already have An Account  <span style={{ fontWeight: 'bold' }}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtistRegister;
