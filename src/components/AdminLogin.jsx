import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin } from "../store/slice/admin";
import "react-toastify/dist/ReactToastify.css";
import { adminAxiosInstance } from "../api/axios";

const AdminLogin = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Define the errors variable at the component level
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validateFormData = () => {
    const { email, password } = formData;
    const newErrors = {}; // Create a new errors object

    if (!isValidEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password.trim().length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    }

    // Update the errors state with the newErrors object
    setErrors(newErrors);

    // Return the newErrors object
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make the login request using adminAxiosInstance
        const response = await adminAxiosInstance.post("/login", formData);

        if (response.status === 200) {
          const name = response?.data?.name;
          const token = response?.data?.token;
          const role = response?.data?.role;
          const id = response?.data?.id;

          // Dispatch adminLogin action with token and adminId
          dispatch(adminLogin({ name, token, role, id }));

          // Redirect to admin dashboard or another page
          // navigate("/admin/dashboard");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(error?.response?.data?.errMsg);
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      // Handle form validation errors
      // You can display error messages or take other actions here
      console.log("Form validation errors:", validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-16 mb-4">
        {/* Form inputs and submit button */}
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {/* Display email validation error */}
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {/* Display password validation error */}
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
