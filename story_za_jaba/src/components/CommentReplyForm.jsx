import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatTimestamp } from '../utils/utils';
import { commentOnPost } from '../features/comments/commentSlice';
import { v4 as genCommentId } from 'uuid';


function CommentReplyForm({handleCancelButton,handleDoneSubmit ,commentReplyText, setCommentReplyText}) {
  
  return (
 
     <form onSubmit={handleDoneSubmit} className="flex flex-col space-y-2">
      <textarea
        value={commentReplyText}
        onChange={(e) => {setCommentReplyText(e.target.value)}}
        placeholder="Type your comment here."
        className="border p-2 rounded-md"
      ></textarea>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={commentReplyText === ''}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Done
        </button>
        
          <button
            type="button"
            onClick={handleCancelButton}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
          >  Cancel </button>
      
      </div>
    </form>
   
  );
}

export default CommentReplyForm;
