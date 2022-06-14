import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IRepairsState = {
  isRepairs: boolean;
};
const initialState: IRepairsState = {
  isRepairs: false,
};

const repairsSlice = createSlice({
  name: "repairs",
  initialState: initialState,
  reducers: {
    setIsRepairs: (state, { payload }: PayloadAction<boolean>) => {
      state.isRepairs = payload;
    },
  },
});

export const repairsReducer = repairsSlice.reducer;
export const { setIsRepairs } = repairsSlice.actions;
