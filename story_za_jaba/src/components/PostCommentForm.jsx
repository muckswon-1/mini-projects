import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/profile/profileSlice';
import { formatTimestamp } from '../utils/utils';
import {v4 as genCommentId} from 'uuid';
import { commentOnPost } from '../features/comments/commentSlice';


function PostCommentForm({postId}) {
    const [postCommentText, setPostCommentText] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();



   const handlePostCommentSubmit = (e) => {
    e.preventDefault();

    const commentObject = {
      id: genCommentId(),
      parentId: null,
      userId: currentUser.id,
      postId: postId,
      content: postCommentText,
      likes: [],
      dislikes: [],
      timePosted: formatTimestamp(Date.now()),
    };

    dispatch(commentOnPost(commentObject));
    setPostCommentText('')
    
   }

  return (
     <form onSubmit={handlePostCommentSubmit} className="flex flex-col space-y-2">
      <textarea
        value={postCommentText}
        onChange={(e) => {setPostCommentText(e.target.value)}}
        placeholder="Type your comment here."
        className="border p-2 rounded-md"
      ></textarea>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={postCommentText === ''}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        > Comment </button>
      </div>
    </form>
  )
}

export default PostCommentForm