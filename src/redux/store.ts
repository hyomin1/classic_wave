import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./slices/bookSlice";
import likeReducer from "./slices/likeSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    like: likeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
