import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/product.reducer";
import authReducer from "../features/Auth/auth.reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
