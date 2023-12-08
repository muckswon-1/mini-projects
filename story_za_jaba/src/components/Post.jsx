import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatDotsFill, HandThumbsDownFill, HandThumbsUpFill, Trash } from 'react-bootstrap-icons';
import { dislikePost, likePost, deletePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../features/profile/profileSlice';
import { selectComments } from '../features/comments/commentSlice';
import Comments from './Comments';
import { findUserById } from '../utils/utils';
import { followUser, selectUsers, unFollowUser } from '../features/users/usersSlice';


function Post({ post, isOpen, onToggleRead, showDeleteOption, showFollowUnfollowButton }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const allComments = useSelector(selectComments);
  const allUsers = useSelector(selectUsers)
  const [postComments, setPostComments] = useState([...allComments.filter((aComment) => aComment.postId === post.id)]);
  const user = findUserById(allUsers,post.userId);
  const checkIfFollwing = user.followers.includes(currentUser.username)
  const [isFollowing, setIsFollowing] = useState(checkIfFollwing);

 
  useEffect(() => {
    const filterComments = allComments.filter((aComment) => aComment.postId === post.id);
    setPostComments([...filterComments]);
  }, [showComments, allComments, post.id]);


  useEffect(() => {

    const flag = user.followers.includes(currentUser.username);
    setIsFollowing(flag)
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
    <div className="mx-auto w-full bg-white p-4 rounded-md shadow-md mb-4">
      <div className="mb-4">
        <div className='flex justify-between'>
          <Link to={currentUser.username === post.username ? `profile/${post.username}` : `users/profile/${post.username}`}>
          <h3 className="text-gray-700">{post.username}</h3>
        </Link>
        {
          showFollowUnfollowButton && post.userId !== currentUser.id && <button onClick={onToggleFollow} className={!isFollowing ? "text-blue-400 font-normal hover:underline" : "text-red-400 font-normal hover:underline"}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
        
        }
        </div>
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
          onClick={() => setShowComments((prevShowComments) => !prevShowComments)}
          className="flex items-center text-blue-500"
        >
          <span className="mr-1">
            <ChatDotsFill />
          </span>
          {postComments.length}
        </button>
        <div className="flex items-center">
          <button
            onClick={() => dispatch(likePost(post))}
            className="flex items-center text-blue-500 mr-2"
          >
            <span className="mr-1">
              <HandThumbsUpFill />
            </span>
            {0}
          </button>
          <button
            onClick={() => dispatch(dislikePost(post))}
            className="flex items-center text-blue-500 mr-2"
          >
            <span className="mr-1">
              <HandThumbsDownFill />
            </span>
          </button>
          {showDeleteOption && (
            <button
              onClick={() => dispatch(deletePost(post.id))}
              className="flex items-center text-red-500"
            >
              <span className="mr-1">
                <Trash />
              </span>
            </button>
          )}
        </div>
      </div>
      {showComments && <Comments comments={postComments} postId={post.id}/>}
    </div>
  );
}

export default Post;
