import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/student/studentSlice.js";

export default configureStore({
  reducer: {
    students: studentSlice,
  },
});
