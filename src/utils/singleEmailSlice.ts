import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Email } from "./emailsSlice";

export interface ContentState {
  id: string;
  body: string;
}
const initialState: Email = {
  id: "",
  from: {
    email: "",
    name: "",
  },
  date: 0,
  subject: "",
  short_description: "",
  isFavorite: false,
  isRead: false,
};

const singleEmailSlice = createSlice({
  name: "singleEmail",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<Email>) => {
      console.log(action)
      state = action.payload;
      return state
    },
    clearContent: () => {
      return initialState
      
    },
  },
});

export const { setContent, clearContent } = singleEmailSlice.actions;

export default singleEmailSlice.reducer;
