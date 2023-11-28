import React from 'react';

function FollowButton({ isFollowing, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-md ${
        isFollowing
          ? 'bg-red-500 text-white hover:bg-red-700'
          : 'bg-blue-500 text-white hover:bg-blue-700'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;