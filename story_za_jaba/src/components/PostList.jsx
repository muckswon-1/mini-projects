import React, { useState } from 'react'
import Post from './Post'

function PostList({ posts }) {
  const [openPostId, setOpenPostId] = useState(null);

  const handleToggleRead = (postId) => {
    setOpenPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <div className="flex flex-col items-center">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}  className="mb-6 w-full md:w-3/4 lg:w-1/2">
            <Post
             
              post={post}
              isOpen={openPostId === post.id}
              onToggleRead={handleToggleRead}
           
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nothing posted at this time.</p>
      )}
    </div>
  );
}

export default PostList;
