import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id?: string;
  email?: string;
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (_state: UserState | null, action: PayloadAction<UserState>) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
