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
        }
    }
});

export const {editUser, addNewUser} = usersSlice.actions;

export const selectUsers = state => state.users.users;

export default usersSlice.reducer;