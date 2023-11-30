import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile.jpg'
import {  selectCurrentUser, signOut } from '../features/profile/profileSlice';

function ProfileImage({user}) {

  
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const currentUser = useSelector(selectCurrentUser);

    const handleLogoutClick = () => {
      const confirmLogout = window.confirm('Are you sure you want to logout')
      
      if(confirmLogout){
        dispatch(signOut());
        navigate('/');
    
      }
    }

    useEffect(() => {
      if(user){
        setImage(user.profilePic)
      }
    },[image, user])

   
 
   

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mb-2">
        <img src={image} alt="profile pic" className="object-cover w-full h-full" />
      </div>
     {
        
       currentUser && (
          <Link to={`profile/${currentUser.username}`} className="text-white-800 font-bold hover:underline">{currentUser.username}</Link> 
       )
      
     }
      <button onClick={handleLogoutClick} className="mt-2 text-red-500 hover:underline">
        Logout
      </button>
    </div>
  )
}

export default ProfileImage