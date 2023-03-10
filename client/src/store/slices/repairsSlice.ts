import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IRepairsState = {
  isRepairs: boolean;
  search: string;
};
const initialState: IRepairsState = {
  isRepairs: false,
  search: "",
};

const repairsSlice = createSlice({
  name: "repairs",
  initialState: initialState,
  reducers: {
    setIsRepairs: (state, { payload }: PayloadAction<boolean>) => {
      state.isRepairs = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
});

export const repairsReducer = repairsSlice.reducer;
export const { setIsRepairs, setSearch } = repairsSlice.actions;
