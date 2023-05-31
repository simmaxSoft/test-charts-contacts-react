
export type TContactStatus = 'active' | 'inactive'

export interface IContact {
  id?: string;
  firstName: string;
  lastName: string;
  status: TContactStatus;
}

export interface ContactsState {
  contacts: IContact[];
}

export const initialContactsState: ContactsState = {
  contacts: [],
};