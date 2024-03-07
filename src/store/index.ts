import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { chatRoomReducer } from '@store/chatRoomSlice';
import { userReducer } from '@store/userSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatRoom: chatRoomReducer,
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
