import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson, IType, IPlace, IStatus, IRepairType } from "types/catalogs";
type ICatalogs = {
  persons: IPerson[];
  types: IType[];
  places: IPlace[];
  statuses: IStatus[];
  repairTypes: IRepairType[];
};
const initialState: ICatalogs = {
  persons: [],
  types: [],
  places: [],
  statuses: [],
  repairTypes: [],
};

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState: initialState,
  reducers: {
    setPersons: (state, { payload }: PayloadAction<IPerson[]>) => {
      state.persons = payload;
    },
    setStatuses: (state, { payload }: PayloadAction<IStatus[]>) => {
      state.statuses = payload;
    },
    setTypes: (state, { payload }: PayloadAction<IType[]>) => {
      state.types = payload;
    },
    setPlaces: (state, { payload }: PayloadAction<IPlace[]>) => {
      state.places = payload;
    },
    setRepairTypes: (state, { payload }: PayloadAction<IRepairType[]>) => {
      state.repairTypes = payload;
    },
  },
});

export const catalogsReducer = catalogsSlice.reducer;
export const { setPersons, setPlaces, setRepairTypes, setStatuses, setTypes } =
  catalogsSlice.actions;
