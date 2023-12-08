import React, { useState } from 'react'
import Comment from './Comment'
import CommentForm from './CommentReplyForm'

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/profile/profileSlice';
import PostCommentForm from './PostCommentForm';


function Comments({comments, postId}) {

    
    const currentUser = useSelector(selectCurrentUser);
    const [commentText, setCommentText] = useState('')

    const handleCommentSubmit = (e) => {
      e.preventDefault();

    }
    


  return (
    <div>
        <PostCommentForm postId={postId} />
        {
            comments.map((aComment) => (
                <Comment key={aComment.id} comment={aComment} />
            ))
        }
    </div>
  )
}

export default Comments