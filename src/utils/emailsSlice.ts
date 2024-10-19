import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Email {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  isFavorite: boolean;  // Field for marking email as favorite
  isRead: boolean;      // Field for marking email as read
}


export interface EmailsState {
  emails: Email[];
}

const initialState: EmailsState = {
  emails: [],
};


const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    
    addAllEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload.map(email => ({
        ...email,
        isFavorite: email.isFavorite ?? false, // Default to false if not provided
        isRead: email.isRead ?? false          // Default to false if not provided
      }));
    },

   
    removeAllEmails(state) {
      state.emails = [];
    },

    
    toggleFavorite(state, action: PayloadAction<string>) {
      const email = state.emails.find((email) => email.id === action.payload);
      if (email) {
        email.isFavorite = !email.isFavorite; 
      }
    },


    toggleRead(state, action: PayloadAction<string>) {
      const email = state.emails.find((email) => email.id === action.payload);
      if (email) {
        email.isRead = true; 
      }
    }
  },
});

export const { addAllEmails, removeAllEmails, toggleFavorite, toggleRead } = emailsSlice.actions;


export default emailsSlice.reducer;
