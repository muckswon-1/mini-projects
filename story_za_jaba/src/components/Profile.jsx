import React from 'react'
import PostList from './PostList'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/profile/profileSlice'
import ProfileImage from './ProfileImage';
import { selectPosts } from '../features/posts/postsSlice';
import { Link, useParams } from 'react-router-dom';



function Profile({users}) {

  const currentUser= useSelector(selectCurrentUser);
  const posts = useSelector(selectPosts);
  const {username} = useParams();
 

  const userPosts = posts.filter((aPost) => {
         return aPost.username === username
  });
 

  return (
     <div className="max-w-screen-lg mx-auto p-4 mt-48 z-10">
      {/* User Header */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mr-4">
          <ProfileImage/>
        </div>
        <div>
          <h2 className="text-xl font-bold">{currentUser.username}</h2>
          {/* Add additional user info if needed */}
        </div>
      </div>

      {/* Edit Profile Button for the Current User */}
      {currentUser.username  === username &&  (
        <div className="mb-4">
          <Link to={`/profile/${username}/edit`} className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
        </div>
      )}

      {/* User Posts */}
      <h2 className="text-2xl font-bold mb-4">{`${username}'s Posts`}</h2>
      <PostList users={users} posts={userPosts} />
    </div>
  )
}

export default Profile