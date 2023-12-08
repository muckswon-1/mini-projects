import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { followUser, selectUsers, unFollowUser } from '../features/users/usersSlice';
import PostList from './PostList';
import { selectPosts } from '../features/posts/postsSlice';
import ProfileImage from './ProfileImage';
import FollowButton from './FollowButton';



function UserProfile({currentUser}) {

    const {username} = useParams();
    const allUsers = useSelector(selectUsers);
    const user = allUsers.filter((aUser) => aUser.username === username)[0];
    const allPosts = useSelector(selectPosts);
    const userPosts = allPosts.filter((aUser) => aUser.username === user.username);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
   


    useEffect(() => {
        const flag = user.followers.includes(currentUser.username);
        console.log(flag);
        setIsFollowing(flag);
    },[user, currentUser])



    const onToggleFollow = () => {
        if( user && isFollowing) {
            dispatch(unFollowUser({userToUnfollow : user.username,unFollowingUser : currentUser.username}))
            console.log('just unfollowed. ');
           
        }else {
            
            dispatch(followUser({userToFollow : user.username, followingUser : currentUser.username}));
            console.log('now following')
        }
        setIsFollowing((prevFlag) => !prevFlag);
    }



  return (
    
        <div className="max-w-screen-lg mx-auto p-4 mt-48 z-10">
      {/* User Header */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full mr-4">
          <ProfileImage user={user} />
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

        <div className="flex justify-center gap-8">
            <h3>{user.username}'s Posts</h3>
          <FollowButton isFollowing={isFollowing} onToggleFollow={onToggleFollow} />
        </div>
    

      {/* User Posts */}
      <PostList posts={userPosts} showFolowUnfollowButton={false}/>
    </div>
  )
}

export default UserProfile