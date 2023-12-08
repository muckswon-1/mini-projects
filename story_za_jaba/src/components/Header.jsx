import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux'
import {selectCurrentUser, selectIsAuthenticated } from '../features/profile/profileSlice'
import { selectUsers } from '../features/users/usersSlice'
import Logout from './Logout'


function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [loggedIn,setLoggedIn] = useState(isAuthenticated);
  const allUsers = useSelector(selectUsers);
  const [user, setUser] = useState(currentUser);
  

  useEffect(()=>{
     setLoggedIn(isAuthenticated);
     if(currentUser) {
       const searchUser = allUsers.filter((aUser) => aUser.username === currentUser.username)[0];
       setUser(searchUser);
       
     }
         
  },[isAuthenticated, allUsers]);



  return (
   <header className={`bg-blue-500 text-white p-4 flex items-center justify-between fixed w-full top-0 z-50`}>
     <Link to='/'> <h1 className="text-3xl font-bold">Story Za Jaba</h1></Link>
      {loggedIn ? (
        <div className='flex flex-col align-center'>
          <ProfileImage image={user.profilePic} wh={'w-16 h-16'}/>
          <Link to={`profile/${user.username}`} className="text-white-800 font-bold hover:underline">{user.username}</Link> 
          <Logout/>
          </div>
      ) : (
        <Link
          to="/login"
          className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
        >
          Login
        </Link>
      )}
    </header>
  )
}

export default Header