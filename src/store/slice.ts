import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from './contacts.types';

interface ContactsState {
  contacts: IContact[];
}

const initialState: ContactsState = {
  contacts: [{firstName:'Joe',lastName:'Biden',status:'active'}],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContact>) => {
      console.log(state)
      console.log(action)
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    editContact: (state,action: PayloadAction<IContact>) => {
      state.contacts = state.contacts.map((c)=> c.id === action.payload.id ? action.payload : c)
    }
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;