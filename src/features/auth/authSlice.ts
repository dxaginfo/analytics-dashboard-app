import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock authentication API (in a real app, this would be real API calls)
const mockLogin = (credentials: { username: string; password: string }) => {
  return new Promise<{ token: string; user: any }>((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any valid-looking credentials
      if (credentials.username && credentials.password.length > 3) {
        resolve({
          token: 'mock-jwt-token',
          user: { id: '1', name: 'Demo User', email: credentials.username },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

const mockCheckAuth = () => {
  return new Promise<{ user: any }>((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        resolve({
          user: { id: '1', name: 'Demo User', email: 'user@example.com' },
        });
      } else {
        resolve({ user: null });
      }
    }, 500);
  });
};

// Define the authentication state type
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

// Define async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await mockLogin(credentials);
      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
  const response = await mockCheckAuth();
  return response;
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
      });
  },
});

export default authSlice.reducer;