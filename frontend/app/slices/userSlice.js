import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';

const initialState = {
    status: 'idle',
    error: '',
    user: {},
    followersCount: 0,
    followingsCount: 0
}

export const fetchUserById = createAsyncThunk('user/fetchById', async ({ userId }) => {
    const response = await Rest.axiosRequest(`${API.userDetails}/${+userId}`, {}, 'GET')
    return response.data.data
})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            initialState;
        },
    },
    extraReducers: (builders) => {
        builders
            .addCase(fetchUserById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                const { followersCount, followingsCount } = action.payload;
                state.user = { ...action.payload };
                state.followersCount = followersCount;
                state.followingsCount = followingsCount;
                state.status = "succeeded";
                state.error = '';
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;


