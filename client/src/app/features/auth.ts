import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/auth';
import { ErrorResponse } from '../services/interfaces';
import { RootState } from '../store';

type Token = string;

type AuthState = {
  token: Token | null;
  authLoading: boolean;
  errors: ErrorResponse | null;
  isAuth: boolean;
};

export const thunkRegisterUser = createAsyncThunk<
  { token: Token; success: boolean },
  { email: string; password: string },
  { rejectValue: ErrorResponse }
>('auth/registerUser', async (args, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    authLoading: false,
    isAuth: false,
    errors: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>,
    ) => {
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkRegisterUser.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(thunkRegisterUser.fulfilled, (state, action) => {
      state.authLoading = false;
      state.isAuth = true;
      state.token = action.payload.token;
    });
    builder.addCase(thunkRegisterUser.rejected, (state, action) => {
      state.authLoading = false;
      state.isAuth = false;
      state.errors = action.payload ? action.payload : null;
    });
  },
});

export default slice.reducer;
export const { setCredentials } = slice.actions;
export const selectAuthState = (state: RootState) => state.auth;
