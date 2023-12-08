import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/profile/profileSlice'
import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import { selectPosts } from '../features/posts/postsSlice';
import { selectUsers } from '../features/users/usersSlice';



function CurrentUserProfile() {


  const currentUser = useSelector(selectCurrentUser);
  const allPosts = useSelector(selectPosts);
  const userPosts = allPosts.filter((aPost) => aPost.username === currentUser.username);
  const allUsers = useSelector(selectUsers);
  const [user, setUser] = useState(allUsers.filter((aUser) => aUser.username === currentUser.username)[0]);
  
 
  useEffect(() => {
    setUser(allUsers.filter((aUser) => aUser.username === currentUser.username)[0]);
  },[user,currentUser]);



  return (
    
   <div className="max-w-screen-lg mx-auto p-4 mt-48 z-10">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mr-4">
          
          <ProfileImage image={currentUser.profilePic} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <div className="flex justify-between mb-8">
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500">Following</p>
                <p className="text-lg font-bold">{user.following.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500">Followers</p>
                <p className="text-lg font-bold">{user.followers.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Link to={`/profile/${user.username}/edit`} className="text-blue-500 hover:underline">
          Edit Profile
        </Link>
      </div>

      <div className="flex justify-center gap-8">
        <h2 className="text-2xl font-bold mb-4">{`${user.username}'s Posts`}</h2>
      </div>

      <PostList posts={userPosts}  showDeleteOption={true} />
    </div>
    
  )
}

export default CurrentUserProfile