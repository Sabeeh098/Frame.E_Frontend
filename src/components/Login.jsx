import { useEffect, useState } from "react";
import bgimg from "../assets/Loginbackground.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from 'axios';
import { useDispatch } from "react-redux";
import { userLogin } from "../store/slice/user";
import "react-toastify/dist/ReactToastify.css";
import { userAxiosInstance,artistAxiosInstance } from "../api/axios";
import bg from "../assets/bgartist.jpg"
import { artistLogin } from "../store/slice/artist";


// eslint-disable-next-line react/prop-types
const Login = ({ url, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentURL = useLocation();

  useEffect(() => {
    if (currentURL?.state === "?singup=success") {
      toast.success("Registeration Success");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validateFormData = () => {
    const { email, password } = formData;
    const errors = {};

    if (!isValidEmail(email)) {
      errors.email = "Invalid Mail address";
    }

    if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 character long";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    // Validate form data
    const errors = validateFormData();
    e.preventDefault();
  
    // Determine the Axios instance to use based on the name prop
    const axiosInstance = name === "artist" ? artistAxiosInstance : userAxiosInstance;
  
    if (Object.keys(errors).length === 0) {
      try {
        // Make the POST request using the determined Axios instance
        const response = await axiosInstance.post(`/${url}`, formData);
  
        if (response.status === 200) {
          const name = response?.data?.name;
          const token = response?.data?.token;
          const role = response?.data?.role;
          const id = response?.data?.id;
          console.log(name, token, role, id);
  
          if (role === "user") {
            // Dispatch userLogin action if the role is "user"
            dispatch(userLogin({ name, token, role, id }));
            navigate("/");
          } else if (role === "artist") {
            // Dispatch artistLogin action if the role is "artist"
            dispatch(artistLogin({ name, token, role, id }));
            navigate("/artist/"); // Navigate to the artist-specific route
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(error?.response?.data?.errMsg);
        } else if (error.response?.status === 402) {
          toast.warn(error?.response?.data?.errMsg);
        } else {
          toast.error("Something went wrong");
        }
      }
    } else if (Object.keys(errors).length === 2) {
      toast.error("Enter all fields");
    } else if (errors.email) {
      toast.error(errors.email);
    } else if (errors.password) {
      toast.error(errors.password);
    }
  };
  
  

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={backgroundStyle}>
      <div className="min-h-screen flex flex-col justify-center items-center py-12 lg:px-8 bg-opacity-50 bg-white">
        <div className="container min-w-full min-h-min bg-slate-700 pt-20 pb-19 pb-10" style={{ backgroundImage: `url(${bg})` }}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-opacity-80 rounded-lg  p-6 ">
                <h2 className="mt-3 text-center text-2xl font-bold leading-9 text-gray-900 pb-6">
                {name === "artist" ? "Welcome back Artist" : "Login to your Account"}
               </h2>


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black-600"
                >
                  Email address
                </label>
                <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 bg-white text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 hover:underline cursor-pointer">
            Dont have an Account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            ></a>
          </p>
        </div>
        </div>
      </div>
      </div>
   
  );
};
export default Login;
