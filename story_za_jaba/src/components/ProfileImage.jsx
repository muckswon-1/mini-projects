import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, signOut } from '../features/profile/profileSlice'
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile.jpg'

function ProfileImage() {
    const currentUser = useSelector(selectCurrentUser);


    const image = currentUser &&  currentUser.profilePic ? currentUser.profilePic : defaultProfilePic;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
      const confirmLogout = window.confirm('Are you sure you want to logout')
      
      if(confirmLogout){
        dispatch(signOut());
        navigate('/');
    
      }
    }

  
   

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mb-2">
        <img src={image} alt="profile pic" className="object-cover w-full h-full" />
      </div>
     {
      currentUser ? (
         <Link to={`profile/${currentUser.username}`} className="text-white-800 font-bold hover:underline">{currentUser.username}</Link>
      ) : ''
     }
      <button onClick={handleLogoutClick} className="mt-2 text-red-500 hover:underline">
        Logout
      </button>
    </div>
  )
}

export default ProfileImage