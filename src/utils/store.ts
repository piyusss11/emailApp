import { configureStore } from '@reduxjs/toolkit'
import emailsReducer from './emailsSlice'
import singleEmailReducer from './singleEmailSlice'

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
    singleEmail: singleEmailReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch