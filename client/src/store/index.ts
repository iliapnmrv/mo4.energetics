import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Action, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk, { ThunkAction } from "redux-thunk";
import { useDispatch } from "react-redux";
import { catalogsReducer } from "./slices/catalogsSlice";

const reducers = combineReducers({
  catalogsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
  });
};

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
