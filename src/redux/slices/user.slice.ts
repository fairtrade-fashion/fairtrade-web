// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  profilePicture: string;
  address?: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  profilePicture: "",
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
