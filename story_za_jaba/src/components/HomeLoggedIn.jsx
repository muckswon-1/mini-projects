import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostList from './PostList';
import {  useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '../features/profile/profileSlice';
import { selectPosts } from '../features/posts/postsSlice';
import HomeLoggedOut from './HomeLoggedOut';

function HomeLoggedIn({users}) {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
 
  useEffect(() => {
 
    if(!isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated,navigate])

  if(!currentUser){
    return <HomeLoggedOut/>
  }
  

  return (
    <div className="mt-48 p-4">
      <div className="flex justify-center items-center mb-8">
        <Link
          to={`/posts/create/${currentUser.username}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Create Post
        </Link>
      </div>

          <h2 className="text-2xl font-bold mb-4 text-center">Top Posts</h2>
          <PostList users={users} posts={posts} showFollowUnfollowButton={true} />
  
    </div>
  );
}

export default HomeLoggedIn;
