import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import todo from "./todo";

export default configureStore({
  reducer: todo,
  middleware: [api]
});