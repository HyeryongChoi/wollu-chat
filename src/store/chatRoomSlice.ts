import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChatRoom: {
    createdBy: {
      name: '',
    },
    description: '',
    id: '',
    name: '',
  },
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {},
});

export const chatRoomReducer = chatRoomSlice.reducer;
