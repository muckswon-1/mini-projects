import React, { useState } from 'react'
import { ChatDotsFill, HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons';
import { useDispatch} from 'react-redux';
import { dislikePost, likePost } from '../features/posts/postsSlice';

import CreateComment from './CreateComment';
import DisplayComment from './DisplayComment';
import { Link } from 'react-router-dom';



function Post({ post, isOpen, onToggleRead }) {

  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);


  

  return (
    <div className="mx-auto w-full bg-white  p-4 rounded-md shadow-md mb-4">
      <div className="mb-4">
        <Link to={`/profile/${post.username}`}> <h3 className="text-gray-700">{post.username}</h3></Link>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
      {isOpen ? (
        <div className="mb-4">
          <div className="bg-gray-200 p-4 rounded-md">
            <p className="text-gray-700">{post.content}</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => onToggleRead(post.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Read
        </button>
      )}
      <div className="flex items-center justify-between">
        <span className="text-gray-500">{post.timePosted}</span>
        <button
         onClick={() => {setShowComments((prevShowComments) => !prevShowComments)}}
        className="flex items-center text-blue-500">
          <span className="mr-1">
            <ChatDotsFill />
          </span>
          {post.comments.length}
        </button>
        <div className="flex items-center">
          <button
            onClick={() => {dispatch(likePost(post))}}
            className="flex items-center text-blue-500 mr-2"
          >
            <span className="mr-1">
              <HandThumbsUpFill />
            </span>
            {post.likes.length - post.dislikes.length}
          </button>
          <button 
          onClick={() =>{ dispatch(dislikePost(post))}}
          
          className="flex items-center text-blue-500">
            <span className="mr-1">
              <HandThumbsDownFill />
            </span>
          </button>
        </div>
      </div>
     
      {
        showComments && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
             <CreateComment post={post}/>
            {
              post.comments.length > 0 ? (
                post.comments.map((aComment) => {
                  return <DisplayComment key={aComment.id} comment={aComment} />
                })
              ) : <p>This post has no comments.</p>
                 
            }
          </div>
        )}
    </div>
  );
}

export default Post