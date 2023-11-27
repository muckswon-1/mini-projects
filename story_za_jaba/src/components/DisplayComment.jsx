import React from 'react'
import { findUserById } from '../utils/utils'
import { useSelector } from 'react-redux'
import { selectUsers } from '../features/users/usersSlice'

function DisplayComment({comment}) {

    const users = useSelector(selectUsers);

    const user = findUserById(users,comment.userId)
  return (
    <div key={comment.id} className="mb-4 flex items-start">
      {/* User Profile Pic */}
      <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full mr-4">
        
        <img src={user.profilePic} alt="profile pic" className="object-cover w-full h-full" />
      </div>

      {/* Comment Content and User Info */}
      <div className="flex flex-col w-full">
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center justify-between text-gray-500">
          <span className="mr-2 font-semibold">{user.username}</span>
          <span>{comment.timePosted}</span>
        </div>
      </div>
    </div>
  )
}

export default DisplayComment