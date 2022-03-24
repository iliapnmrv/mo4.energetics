import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPerson,
  IType,
  IPlace,
  IStatus,
  IRepairType,
  IRepairDecision,
} from "types/catalogs";

type ICatalogs = {
  persons: IPerson[];
  types: IType[];
  places: IPlace[];
  statuses: IStatus[];
  repairTypes: IRepairType[];
  repairDecisions: IRepairDecision[];
};
const initialState: ICatalogs = {
  persons: [],
  types: [],
  places: [],
  statuses: [],
  repairTypes: [],
  repairDecisions: [],
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
    setRepairDecisions: (
      state,
      { payload }: PayloadAction<IRepairDecision[]>
    ) => {
      state.repairDecisions = payload;
    },
  },
});

export const catalogsReducer = catalogsSlice.reducer;
export const {
  setPersons,
  setPlaces,
  setRepairTypes,
  setStatuses,
  setTypes,
  setRepairDecisions,
} = catalogsSlice.actions;
