import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useAppDispatch: () => TAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export const selectContacts = (state: TRootState) => state.contacts.contacts;

export default store;