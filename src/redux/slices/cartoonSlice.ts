import { IBookDetail } from "./../../interfaces/bookInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartoonState {
  cartoon: IBookDetail;
}

const initialState: cartoonState = {
  cartoon: {
    id: 0,
    isbnId: "",
    authorName: "",
    name: "",
    folderName: "",
    sceneList: [],
  },
};

const cartoonSlice = createSlice({
  name: "cartoon",
  initialState,
  reducers: {
    setCartoon: (state, action: PayloadAction<IBookDetail>) => {
      state.cartoon = action.payload;
    },
  },
});

export const { setCartoon } = cartoonSlice.actions;
export default cartoonSlice.reducer;
