import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
const initialState = {
    totalCompanies: 0,
    companies: [],
    companyStatus: 'idle',
}

export const fetchUsersWiseCompany = createAsyncThunk('user`s State/Companies', async (formData) => {
    const response = await Rest.axiosRequest(API.userWiseCompany, formData, 'POST')
    return response.data.data
})


export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        resetCompanies: (state) => {
            return initialState;
        },
    },
    extraReducers(builders) {
        builders
            .addCase(fetchUsersWiseCompany.pending, (state, action) => {
                state.companyStatus = 'loading';
            })
            .addCase(fetchUsersWiseCompany.fulfilled, (state, action) => {
                const { count, rows } = action.payload;
                state.companies = [...state.companies, ...rows];
                state.totalCompanies = count;
                state.companyStatus = "succeeded";
                state.error = '';
            })
            .addCase(fetchUsersWiseCompany.rejected, (state, action) => {
                state.companyStatus = 'failed';
            })
    }
})

export const { resetCompanies } = companySlice.actions;

export default companySlice.reducer;