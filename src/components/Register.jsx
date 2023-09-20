
import { useState } from 'react';
import img from '../assets/9f39df184c55189f9fbdaf2db4ab327a.jpg';
import bgimg from '../assets/backgroundimg.jpg';
import {userAxiosInstance} from '../api/axios.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const navigate = useNavigate()

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset any previous error messages
    setUserNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (email === '') {
      setEmailError('Email is required');
      return;
    }

    if (userName === '') {
      setUserNameError('Username is required');
      return;
    }

    if (password === '') {
      setPasswordError('Password is required');
      return;
    }

    if (password !== confirmpassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

       await userAxiosInstance.post('/signup', {
        userName,
        email,
        password,
      }).then ((res)=>{
        toast.success(res.data.message,"User Registered");
        navigate('/login')
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.Errmessage);
      })

   
    }
  

  return (
    <div className='w-full h-screen flex' style={backgroundStyle}>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className='w-full h-[550px] hidden md:block'>
          <img className='w-full h-full' src={img} alt="login" />
        </div>
        <div className='p-4 flex flex-col justify-around' style={{ marginTop: '-10px'}} >
          <form className='pb-0' onSubmit={handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-8'>Create An Account</h2>
            <div className='mt-0' style={{ marginTop: '-25px' }}> 
              <label htmlFor="username" className="text-lg font-semibold">Username</label>
              <input
                id="username"
                className='border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100'
                type="text"
                value={userName}
                name='userName'
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Enter your username'
              />
              {userNameError && <p className="text-red-500">{userNameError}</p>}
            </div>

            <div className='mb-2'> {/* Decreased margin here */}
              <label htmlFor="email" className="text-lg font-semibold">Email</label>
              <input
                id="email"
                className='border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100'
                type="text"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            <div className='mb-2'> {/* Decreased margin here */}
              <label htmlFor="password" className="text-lg font-semibold">Password</label>
              <input
                id="password"
                className='border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100'
                type="password"
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <div className='mb-2'> 
              <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
              <input
                id="confirmPassword"
                name='confirmPassword'
                className='border p-2 rounded-md focus:ring focus:ring-opacity-50 w-full bg-gray-100'
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
              />
              {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
            </div>

            <button 
              className='w-full py-2 my-4 bg-slate-600 hover:bg-blue-600 text-white rounded-md'
              type="submit"
            >
              Signup
            </button>
            
            <p className='text-center text-gray-600 cursor-pointer hover:underline'>Already have An Account Login</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
