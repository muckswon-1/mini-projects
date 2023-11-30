import React, { useEffect, useState } from 'react'
import { ChatDotsFill } from 'react-bootstrap-icons'
import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/profile/profileSlice';
import { selectUsers } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';
import CreateComment from './CreateComment';






function DisplayComment({comment, children}) {
  const [showReplies, setShowReplies] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const allUsers = useSelector(selectUsers);
  const [user,setUser] = useState(null);


  useEffect(() => {
    if(currentUser){
      const userSearch = allUsers.filter((aUser) => aUser.username === currentUser.username);
      setUser(userSearch[0]);
    }
  },[allUsers])
    
  return (
    <div className="mb-2">
      <div className="flex items-center">
        {/* Display profile picture */}
        <div className="w-8 h-8 overflow-hidden bg-gray-300 rounded-full mr-2">
          <ProfileImage user={user} /> {/* Pass the userId to your ProfileImage component */}
        </div>
        {/* Display username */}
        <Link to={comment.username === 'currentUsername' ? '/profile' : `/users/profile/${comment.username}`}>
          <span className="text-gray-500 font-bold">{comment.username}</span>
        </Link>
      </div>
      {/* Display comment content */}
      <p className="mt-1 text-gray-700">{comment.content}</p>
      {/* Display replies count */}
      <button className="flex items-center mt-2 text-blue-500 cursor-pointer" onClick={() => setShowReplies(!showReplies)}>
        <span className="mr-1">
          <ChatDotsFill />
        </span>
        {comment.replies.length} replies
      </button>
      {/* Display replies if showReplies is true */}
      {showReplies && (
        <div className="ml-4 mt-2">
          {/* Map through replies and render each one using DisplayComment */}
          {comment.replies.map((reply) => (
            <DisplayComment key={reply.id} comment={reply}>
              {children}
            </DisplayComment>
          ))}
          {/* Add CreateComment component for replying to this comment */}
          <CreateComment post={comment} parentComment={comment} />
        </div>
      )}
      
    </div>
  );
  
}

export default DisplayComment