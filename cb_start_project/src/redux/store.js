import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});
export default configureStore({
  reducer: rootReducer,
});
