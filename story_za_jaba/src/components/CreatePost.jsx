import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '../features/profile/profileSlice';
import { createPostFromObject } from '../utils/utils';
import { addPost } from '../features/posts/postsSlice';


const CreatePost = () => {

  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    title : '',
    content : ''
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewPost(prevNewPost => ({
      ...prevNewPost,[name] : value
    }))
  }

  const handlePostSubmission = (e) => {
   
    e.preventDefault();

    // Add the new post to your data store or API
    const makePostReady = createPostFromObject(newPost);
    makePostReady.userId = currentUser.id;
    makePostReady.username = currentUser.username;

   
    dispatch(addPost(makePostReady));


    // Redirect to the home page or wherever you want after submission
      navigate('/');
  };

  return (
    <div className="max-w-screen-md mx-auto mt-48 z-10 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-8">Create a New Post</h1>
      <form onSubmit={handlePostSubmission}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 border rounded-md w-full"
            name='title'
            value={newPost.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="mt-1 p-2 border rounded-md w-full"
            name='content'
            value={newPost.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit Post
        </button>
      </form>
     
    </div>
  );
};

export default CreatePost;

