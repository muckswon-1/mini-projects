import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../../data";

 const usersSlice = createSlice({
    name: 'users',
    initialState : {
        users : [...USERS,]
    },
    reducers : {
        editUser :(state, action) => {
            const user = action.payload;

            const editUserIndex = state.users.findIndex(aUser => {
                return aUser.id === user.id
            })

            if(editUserIndex !== -1){

                const updatedUsers = [...state.users];

                updatedUsers[editUserIndex] = {
                    ...updatedUsers[editUserIndex],
                    ...user
                };

                state.users = updatedUsers;
               

            }
        },
        addNewUser: (state, action) => {
            state.users.push(action.payload);
        },
        followUser : (state, action) => {

            const {userToFollow, followingUser} = action.payload;

            // const userToFollowIndex = state.users.findIndex((aUser) => {
            //      return aUser.username === action.payload.userToFollow;
            // });

            // const userFollowingIndex = state.users.findIndex((aUser) => {
            //     return aUser.username === action.payload.userFollowing;
            // })

            // console.log(userFollowingIndex);

            // if(userToFollowIndex !== -1 && userFollowingIndex !== -1){
            //      const updatedUsers = [...state.users];

            //      const alreadyFollowing = updatedUsers[userToFollowIndex].followers.includes(action.payload.userFollowing);

            //      if(!alreadyFollowing){
                      
            //      updatedUsers[userToFollowIndex].followers.push(action.payload.userFollowing);
            //      updatedUsers[userFollowingIndex].following.push(action.payload.userToFollow);
                 
            //      }
               

            //      state.users = updatedUsers;
            //}
   
        },
        unFollowUser : (state, action) => {
            const {userToUnfollow,unFollowingUser} = action.payload;

            console.log(userToUnfollow ,unFollowingUser);

    //         const userToUnfollowIndex = state.users.findIndex((aUser) => {
    //             return aUser.username === userToUnfollow;
    //         });

    //         const unFollowingUserIndex = state.users.findIndex((aUser) => {
    //             return aUser.username === unFollowingUser;
    //         });


    //         if(unFollowingUserIndex !== -1 && userToUnfollowIndex !== -1){
    //             const updatedUsers = [...state.users];

    //             const userToUnfollowFollowers = updatedUsers[userToUnfollowIndex].followers.filter((follower) => {
    //                 return follower !== updatedUsers[userToUnfollowIndex].username;
    //             })

    //            updatedUsers[userToUnfollowIndex].followers = userToUnfollowFollowers;

    //            const unFollowingUserFollowing = updatedUsers[unFollowingUserIndex].following.filter(followingUser => {
    //             return followingUser !== updatedUsers[userToUnfollowIndex].username;

    //            });
    //            updatedUsers[unFollowingUserIndex].following = unFollowingUserFollowing;
            }
     }
});

export const {editUser, addNewUser, followUser, unFollowUser} = usersSlice.actions;

export const selectUsers = state => state.users.users;

export default usersSlice.reducer;