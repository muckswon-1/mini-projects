import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  hasEmptyOrNullValues, isUnique } from '../utils/utils';
import { validate } from 'email-validator';
import {v4 as generateId} from 'uuid';
import { PersonFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../features/users/usersSlice';



function Register({users}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState( {
    username : '',
    email : '',
    password : '',
    confirmPassword : ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
   const handleOnChange = e => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name] : value
        }));
    }
    



  const handleFormSubmit = e => {
    e.preventDefault();

     if(hasEmptyOrNullValues(formData)){
      setErrorMessage('You have some missing input. ')
       navigate('/register');
      return;
    }

    if(formData.password !== formData.confirmPassword){
      setErrorMessage('Confirm password should match your password.');
      navigate('/register')
      return;
    }

    if(!isUnique(users,'username',formData.username)){
      setErrorMessage('Username already exists.');
      navigate('/register');
      return;
    }

       if(!isUnique(users,'email',formData.email)){
      setErrorMessage('Email already exists.');
      navigate('/register');
      return;
    }

    const validEmail = validate(formData.email);

    if(!validEmail){
      setErrorMessage('Use a valid email.');
      navigate('/register');
      return;
    }

    const newUser = {
      id : generateId(),
      username : formData.username,
      email : formData.email,
      password : formData.password,
      profilePic : null,
      following : [],
      followers : []
    }

    
    dispatch(addNewUser(newUser));
    setSuccessMessage('Account created successfully. You can now login.')
    setTimeout(() => {
      navigate('/login');
    },1500)
    
  }

  return (
    <form

  onSubmit={handleFormSubmit}
  className="mx-auto w-1/2  p-8 rounded-md shadow-md mt-48 z-10"
>
  <p className="text-red-500">{errorMessage}</p>
   <p className="text-green-500">{successMessage}</p>
  <div className="mb-4">
    <label htmlFor="username" className="block text-white-700">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleOnChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="email" className="block text-white-700">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleOnChange}
      required
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
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="confirm-password" className="block text-white-700">Confirm Password</label>
    <input
      type="password"
      id="confirm-password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleOnChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Register
  </button>
</form>
  )
}

export default Register