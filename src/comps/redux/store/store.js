import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import { setUserdata } from "../user/userSlice";
export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: {
    user:setUserdata,
    rootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
