import { axiosInstance } from "@/lib/axios";
import { clearToken, saveToken } from "@/services/tokenService";
import { loginData } from "@/types/authForms";
import { User } from "@/types/userType";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//api to check authentication
export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await axiosInstance.get("/auth/checkAuth");
    return response.data;
  } catch (error) {
    console.log("Error in checkAuth", error);
  }
});

//api to sign up user
export const signUpUser = createAsyncThunk("user/signUp", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    //toast success
    console.log("Sign up response", response.data);
    return response.data;
  } catch (error) {
    //toast error
    console.log("Error in sign up", error);
  }
});

//api to login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: loginData) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      //toast success
      await saveToken(response.data.jwt);
      console.log("Login response", response.data);
      return response.data;
    } catch (error: any) {
      //toast error
      console.log("Error in login", error);
    }
  },
);

//api to logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await clearToken();
    console.log("User logged out successfully");
  } catch (error) {
    console.log("Error in logout", error);
  }
});

interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isLoggedOut: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggedOut: true,
  isUpdatingProfile: false,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //check authentication
    (builder.addCase(checkAuth.pending, (state, action) => {
      state.isCheckingAuth = true;
    }),
      builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload.user;
      }),
      builder.addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      }));
    //sign up
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isSigningUp = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isSigningUp = false;
      //state.authUser = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isSigningUp = false;
      state.authUser = null;
    });
    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoggingIn = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedOut = false;
      state.authUser = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.authUser = null;
    });
    //logout
    builder.addCase(logoutUser.pending, (state, action) => {
      // add state to show loading spinner if needed
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.authUser = null;
      state.isLoggedOut = true;
    });
  },
});

export default authSlice.reducer;
