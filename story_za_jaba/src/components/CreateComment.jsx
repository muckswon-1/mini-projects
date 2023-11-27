import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/profile/profileSlice'
import {v4 as generateCommentId} from 'uuid';
import { formatTimestamp } from '../utils/utils';
import { commentOnPost } from '../features/posts/postsSlice';

function CreateComment({post}) {
    const currentUser = useSelector(selectCurrentUser);
    const [userComment, setUserComment] = useState('');
    const dispatch = useDispatch();

    const handleCommentSubmit = () => {
       const commentObject = {  
        id: generateCommentId(),
        userId : currentUser.id,
        postId : post.id,
        content : userComment,
        timePosted : formatTimestamp(Date.now())
       }

       dispatch(commentOnPost(commentObject));
       setUserComment('')

    }

   
  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md">
  <textarea
    className="w-full h-20 p-2 border rounded-md mb-2"
    placeholder="Write your comment here..."
  
     value={userComment}
     onChange={(e) => setUserComment(e.target.value)}
  ></textarea>
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
    
     onClick={handleCommentSubmit}
  >
     Comment
  </button>
</div>
  )
}

export default CreateComment