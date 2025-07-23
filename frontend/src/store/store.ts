import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import playersReducer from "./playersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
