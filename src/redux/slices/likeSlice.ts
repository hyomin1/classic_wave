import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeBook {
  like: number[];
}

const initialState: LikeBook = {
  like: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikeBooks: (state, action: PayloadAction<number[]>) => {
      state.like = action.payload;
    },
  },
});

export const { setLikeBooks } = likeSlice.actions;
export default likeSlice.reducer;
