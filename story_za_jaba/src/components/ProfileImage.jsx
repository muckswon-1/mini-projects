import React from 'react'
import PersonIcon from '../assets/icon.png'



function ProfileImage({image, wh}) {
    
  return (

      <div className={`${wh} overflow-hidden bg-gray-300 rounded-full mb-2`}>
      <img src={image ? image : PersonIcon } alt="profile pic" className="object-cover max-w-full h-auto w-full h-full" />
    </div>
  
  )
}

export default ProfileImage