import { createSlice } from "@reduxjs/toolkit";



export const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        currentUser : null,
        isAuthenticated : false
    },
    reducers :  {
        
      signIn: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateProfile : (state,action) => {
     
      state.currentUser = action.payload
    },

    }
});


export const { signIn, signOut, updateProfile } = profileSlice.actions;
export const selectCurrentUser = state => state.profile.currentUser;
export const selectIsAuthenticated = state => state.profile.isAuthenticated;

export default profileSlice.reducer;