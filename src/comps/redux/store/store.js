import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
