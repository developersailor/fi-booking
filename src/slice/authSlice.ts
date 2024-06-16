import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  user: { username: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  status: 'loading'
};

interface LoginData {
  username: string;
  password: string;
  hotelId: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, hotelId }: LoginData) => {
    // Implement logic to send login request to your Express backend API
    // and return the user data or a success message upon successful login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, hotelId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data; // Return user data or success message
    } else {
      throw new Error('Login failed'); // Throw error on failed login
    }
  }
);

interface AuthState {
  user: { username: string } | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post('http://localhost:3000/register', credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
