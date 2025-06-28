import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@/services/auth.service';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        { username, password }: { username: string; password: string },
        thunkAPI
    ) => {
        try {
            const token = await login(username, password);
            return token;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null as string | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        logout(state) {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
