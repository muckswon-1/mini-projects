import React, { useEffect, useState } from 'react'
import PostList from './PostList'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/profile/profileSlice'
import ProfileImage from './ProfileImage';
import { selectPosts } from '../features/posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import FollowButton from './FollowButton';
import { followUser, unFollowUser } from '../features/users/usersSlice';




function Profile({users}) {
  const currentUser = useSelector(selectCurrentUser);
  const  {username} = useParams();
  const allPosts = useSelector(selectPosts);
  const userPosts = allPosts.filter((aPost) => aPost.username === username);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  let otherUser;
  if(username !== currentUser.username){
    otherUser = users.find((aUser) => aUser.username === username);
    
  }


  const onFollowButtonClick =  () => {
    dispatch(followUser({ userToFollow: otherUser.username, followingUser: currentUser.username }));
    setIsFollowing(true)

  }


  const onUnFollowButtonClick = () => {
    dispatch(unFollowUser({ userToUnfollow: otherUser.username, unFollowingUser: currentUser.username }))
    setIsFollowing(false);
  }

  useEffect(() => {
    if(username !== currentUser.username){
      const flag = otherUser.followers.includes(currentUser.username);
      setIsFollowing(flag);
    }
   
  },[username,dispatch])


  

 
 

  return (
     <div className="max-w-screen-lg mx-auto p-4 mt-48 z-10">
      {/* User Header */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mr-4">
          <ProfileImage/>
        </div>
        <div>
          <h2 className="text-xl font-bold">{}</h2>
            <div className="flex justify-between mb-8">
      <div className='flex gap-8 '>
        <div className="text-center">
        <p className="text-sm font-semibold text-gray-500">Following</p>
        <p className="text-lg font-bold">{}</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-500">Followers</p>
        <p className="text-lg font-bold">{}</p>
      </div>
      </div>
    </div>
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
      {
        currentUser.username !== username && (

           <div className='flex justify-center gap-8'>
      <h2 className="text-2xl font-bold mb-4">{`${username}'s Posts`}</h2>
      {
       isFollowing ? <FollowButton isFollowing={isFollowing} onClick={onUnFollowButtonClick} /> : <FollowButton isFollowing={isFollowing} onClick={onFollowButtonClick}/>
      }
      </div>

        )
      }

         {/* User Posts */}
        <PostList users={users} posts={userPosts} />
    </div>
  )
}

export default Profile