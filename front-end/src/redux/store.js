import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "./reducer/columnReducer";

export const store = configureStore({
  reducer: { columnReducer },
});
