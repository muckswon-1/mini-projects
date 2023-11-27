import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkPassword, fetchUser } from '../utils/utils';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../features/profile/profileSlice';
import { selectUsers } from '../features/users/usersSlice';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectUsers);
  
    const [formData, setFormData] = useState({
        username : '',
        password :  ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChange = e => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name] : value
        }));
    }
    

    const handleFormSubmit = e => {
        e.preventDefault();
        const user = fetchUser(users,formData.username);

        if(!user || !checkPassword(user,formData.password) ){
            setErrorMessage('Invalid username or password')
            navigate('/login');
            return
        }

   
        dispatch(signIn(user));
        navigate('/');
         
    }
  return (
   <form
  onSubmit={handleFormSubmit}
  className="mx-auto w-1/2  p-8 rounded-md shadow-md mt-48 z-10"
>
  <p className="text-red-500">{errorMessage}</p>
  <div className="mb-4">
    <label htmlFor="username" className="block text-white-700">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleOnChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="password" className="block text-white-700">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleOnChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Login
  </button>

  <p className="mt-4">
    New to Story Za Jaba? <Link to="/register" className="text-blue-500">Create a new account</Link>
  </p>
</form>
  )
}

export default Login