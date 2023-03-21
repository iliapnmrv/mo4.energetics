import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { FLUSH, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkAction } from "redux-thunk";
import { catalogApi } from "./catalog/catalog.api";
import { repairsReducer } from "./slices/repairsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { itemApi } from "./item/item.api";

const reducers = combineReducers({
  [catalogApi.reducerPath]: catalogApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  repairsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [catalogApi.reducerPath, itemApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([catalogApi.middleware, itemApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
