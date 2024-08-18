import { configureStore } from "@reduxjs/toolkit";
import productDataReducer from "../slice/ProductSlice";
import cartDataReducer from "../slice/CartSlice";
export const store = configureStore({
  reducer: {
    productDataReducer,
    cartDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
