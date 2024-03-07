import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@store/index';

const initialState = {
  currentUser: {
    uid: '',
    name: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser.uid = action.payload.uid;
      state.currentUser.name = action.payload.name;
    },
    clearUser: state => {
      state.currentUser = {
        uid: '',
        name: '',
      };
    },
    setName: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        name: action.payload.name,
      };
    },
  },
});

export const { setUser, clearUser, setName } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user.currentUser;
