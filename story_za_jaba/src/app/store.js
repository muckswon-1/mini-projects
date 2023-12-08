import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profile/profileSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import commentsReducer from '../features/comments/commentSlice';

const store = configureStore({
    reducer : {
        profile : profileReducer,
        posts : postsReducer,
        comments : commentsReducer,
        users : usersReducer
    }
});

export default store