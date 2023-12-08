import { createSlice } from "@reduxjs/toolkit";
import { COMMENTS } from "../../../data";



export const commentSlice = createSlice({
    name : 'comments',
    initialState : {
        comments : [...COMMENTS]
    },
    reducers : {

          commentOnPost : (state,action) => {
            const comment = action.payload;
            state.comments.push(comment);
        },
        updateComment : (state,action) => {
            const {commentId, newContent } = action.payload;

            const commentToEditIndex = state.comments.findIndex((aComment) => aComment.id === commentId);
            console.log(commentToEditIndex);

            if(commentToEditIndex !== -1){
                const updatedComments = [...state.comments];
                updatedComments[commentToEditIndex].content = newContent;
                state.comments = updatedComments;
            }



           


        },
        deleteComment : (state,action) =>  {
            const {commentId} = action.payload;
             
            const deleteCommentIndex = state.comments.findIndex((aComment) => aComment.id === commentId);

            if(deleteCommentIndex !== -1){
                state.comments = state.comments.filter((aComment) => aComment.id !== commentId);
            }
        }
    }
});


export const {commentOnPost, deleteComment, updateComment} = commentSlice.actions;
export const selectComments = (state) => state.comments.comments;
export default commentSlice.reducer;