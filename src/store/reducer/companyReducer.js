import { createReducer } from "@reduxjs/toolkit"
import { createCompany } from "../actions/companyActions"

const initialState = {
    companies: [],
    loading: false,
    error: null,
    createSuccess: false
}

export const companyReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.createSuccess = false;
        })
        .addCase(createCompany.fulfilled, (state, action) => {
            state.companies.push(action.payload);
            state.loading = false;
            state.error = null;
            state.createSuccess = true;
        })
        .addCase(createCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.createSuccess = false;
        })
})