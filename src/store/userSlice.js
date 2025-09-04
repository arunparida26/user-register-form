import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList.push(action.payload);
    },
    clearUsers: (state) => {
      state.usersList = [];
    },
    removeUser: (state, action) => {
      state.usersList = state.usersList.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

// Export actions
export const { addUser, clearUsers, removeUser } = usersSlice.actions;

// Export selectors
export const selectAllUsers = (state) => state.users.usersList;
export const selectUsersCount = (state) => state.users.usersList.length;

// Export reducer
export default usersSlice.reducer;
