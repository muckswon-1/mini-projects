import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profile/profileSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
    reducer : {
        profile : profileReducer,
        posts : postsReducer,
        users : usersReducer
    }
});

export default store