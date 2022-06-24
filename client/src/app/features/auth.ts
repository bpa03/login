import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/auth';
import { RootState } from '../store';
import {
  CredentialsRegister,
  CredentialsLogin,
  ErrorResponse,
} from '../services/interfaces';

type Token = string;

type AuthState = {
  token: Token | null;
  authLoading: boolean;
  isAuth: boolean;
};

export const thunkRegisterUser = createAsyncThunk<
  { token: Token; success: boolean },
  CredentialsRegister,
  { rejectValue: ErrorResponse }
>('auth/registerUser', async (args, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

export const thunkLoginUser = createAsyncThunk<
  { token: Token; success: boolean },
  CredentialsLogin,
  { rejectValue: ErrorResponse }
>('auth/loginUser', async (args, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

export const thunkAuthorizeUser = createAsyncThunk<
  { token: string; success: boolean },
  null,
  { rejectValue: ErrorResponse }
>('auth/authorizeUser', async (args, { rejectWithValue }) => {
  try {
    const response = await AuthService.authorize();
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
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<{ token: string; success: boolean }>,
    ) => {
      if (payload.success) {
        state.token = payload.token;
        state.isAuth = true;
        state.authLoading = false;
      }
    },
    setError: (
      state,
    ) => {
      state.authLoading = false;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkRegisterUser.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(thunkLoginUser.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(thunkAuthorizeUser.pending, (state) => {
      state.authLoading = true;
    });
  },
});

export default slice.reducer;
export const { setCredentials, setError } = slice.actions;
export const selectAuthState = (state: RootState) => state.auth;
