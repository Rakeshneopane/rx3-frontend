import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/students`
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Someting went wrong while fetching students", error);
      throw error;
    }
  }
);

export const addStudent = createAsyncThunk(
  "add/addStudent",
  async (newStudent) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/students`,
        newStudent
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Something went wrong while sending", error);
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updateStudent }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/students/${id}`,
        updateStudent
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Something went wrong while updating", error);
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log(id);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/students/${id}`
      );
      console.log(id);
      return id;
    } catch (error) {
      console.log("Something went wrong while deleting", error);
      return rejectWithValue(error.response?.data ?? error.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendance = action.payload.averageAttendance;
      state.averageMarks = action.payload.averageMarks;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder //fetch
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        console.log("payload shape:", action.payload);
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }) //add
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        console.log("payload shape:", action.payload);
        state.status = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }) // update
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        if (index !== -1) {
          state.status = "success";
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }) // delete
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy, updateSchoolStats, setTopStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
