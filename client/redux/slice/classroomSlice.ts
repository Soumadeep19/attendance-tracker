import { axiosInstance } from "@/lib/axios";
import { ClassItem } from "@/types/classes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchClassrooms = createAsyncThunk(
  "classroom/fetchClassrooms",
  async () => {
    try {
      const response = await axiosInstance.get("/class/fetch");
      return response.data;
    } catch (error) {
      console.log("Error in fetchClassrooms", error);
    }
  },
);

interface ClassroomState {
  classrooms: ClassItem[];
  isLoading: boolean;
  classCount: number;
  errorInFetch: boolean;
  isCreatingClass: boolean;
  isEnrolling: boolean;
}

const initialState: ClassroomState = {
  classrooms: [],
  isLoading: false,
  classCount: 0,
  errorInFetch: false,
  isCreatingClass: false,
  isEnrolling: false,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ((builder.addCase(fetchClassrooms.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchClassrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classrooms = action.payload.result;
      state.classCount = state.classrooms.length;
      state.errorInFetch = false;
    })),
      builder.addCase(fetchClassrooms.rejected, (state) => {
        state.isLoading = false;
        state.errorInFetch = true;
      }));
  },
});

export default classroomSlice.reducer;
