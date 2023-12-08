import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentOnPost, deleteComment, selectComments, updateComment } from '../features/comments/commentSlice';
import { selectUsers } from '../features/users/usersSlice';
import { findUserById, formatTimestamp} from '../utils/utils';
import ProfileImage from './ProfileImage';
import { selectCurrentUser } from '../features/profile/profileSlice';
import { Link } from 'react-router-dom';
import CommentReplyForm from './CommentReplyForm';
import {v4 as genCommentId} from 'uuid';



function Comment({ comment }) {
  const allUsers = useSelector(selectUsers);
  const user = findUserById(allUsers, comment.userId);
  const allComments = useSelector(selectComments);
  const [commentReplies, setCommentReplies] = useState([...allComments.filter((aCommentReply) => aCommentReply.postId === null && aCommentReply.parentId === comment.id)]);
  const currentUser = useSelector(selectCurrentUser);
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false)

  const canDelete = currentUser.id === comment.userId && commentReplies.length === 0;
  const canEdit = currentUser.id === comment.userId;

  const  [commentReplyText, setCommentReplyText] = useState('');
  const  [commentEditText, setCommentEditText] = useState(comment.content);

   const handleNewCommentSubmit = (e) => {
    e.preventDefault();

    const commentObject = {
      id: genCommentId(),
      parentId: comment.id,
      userId: currentUser.id,
      postId: null,
      content: commentReplyText,
      likes: [],
      dislikes: [],
      timePosted: formatTimestamp(Date.now()),
    };

    dispatch(commentOnPost(commentObject));
    setCommentReplyText('');
    setIsReplying(false);
   
  };

    const handleNewCommentCancelButton = () => {
        setIsReplying(false);
    }

  const handleCommentEditDone = (e) => {
    e.preventDefault();
    dispatch(updateComment({commentId : comment.id, newContent : commentEditText}));
    setEditing(false);
  }

  const handleEditCancelButton = () => {
    setEditing(false);
  }




  useEffect(() => {
    const filterComments = allComments.filter(
      (aCommentReply) => aCommentReply.postId === null && aCommentReply.parentId === comment.id
    );
    setCommentReplies([...filterComments]);
  }, [allComments, comment.id]);


  


  
  return (
    <div className="border border-gray-300 p-4 rounded-md mb-4">
      <div className="flex items-center mb-2 gap-2">
        <ProfileImage image={user.profilePic} wh="h-8 w-8" />
         <Link to={currentUser.username === user.username ? `profile/${user.username}` : `users/profile/${user.username}`}>
          <h3 className="text-gray-700">{user.username}</h3>
        </Link>
      </div>
      {!editing && <div className="mb-2">{comment.content}</div>}

      {
        editing && (<CommentReplyForm 
        setIsReplying={setIsReplying}
        handleDoneSubmit={handleCommentEditDone}
        commentReplyText={commentEditText}
        setCommentReplyText={setCommentEditText} 
        handleCancelButton={handleEditCancelButton}
        />)
      }

     

     
      <div className="text-gray-500 mb-2">{comment.timePosted}</div>
      <div
        onClick={() => setShowReplies((prevShowReplies) => !prevShowReplies)}
        className="text-blue-500 cursor-pointer mb-2"
      >
        {showReplies ? 'Hide Replies' : 'Show Replies'}
      </div>
      {showReplies && (
        <>
          <div className="mb-2 flex gap-2">
            <div
              onClick={() =>{setIsReplying(true)}}
              className="text-blue-500 cursor-pointer"
            >
              Reply
            </div>

            {
              canEdit && (
                <div
              onClick={() => {setEditing(true)}}
              className="text-blue-500 cursor-pointer"
            >
              Edit
            </div> 
              )
            }

            {
              canDelete && (
                <div
              onClick={() => dispatch(deleteComment({commentId : comment.id}))}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </div> 
              )
            }

          </div>
          {isReplying && (
            <CommentReplyForm
             handleDoneSubmit={handleNewCommentSubmit}
             commentReplyText={commentReplyText}
             setCommentReplyText={setCommentReplyText}
             setIsReplying={setIsReplying} 
             handleCancelButton={handleNewCommentCancelButton} />
          )}


        </>
      )}
      {showReplies && (
        <>
          {commentReplies.length > 0 ? (
            commentReplies.map((aComment) => (
              <Comment comment={aComment} key={aComment.id} />
            ))
          ) : (
            
                <p className="text-gray-500">This comment has no replies.</p>
            
          )}
        </>
      )}
    </div>
  );
}

export default Comment;
