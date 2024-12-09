import { createReducer } from "@reduxjs/toolkit"
import { createAuthor, fetchAuthor } from "../actions/authorActions"

const initialState = {
    authors: [],
    loading: false,
    error: null,
    createSuccess: false
}

export const authorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createAuthor.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.createSuccess = false;
        })
        .addCase(createAuthor.fulfilled, (state, action) => {
            state.authors.push(action.payload);
            state.loading = false;
            state.error = null;
            state.createSuccess = true;
        })
        .addCase(createAuthor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.createSuccess = false;
        }).addCase(fetchAuthor.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAuthor.fulfilled, (state, action) => {
            state.authors.push(action.payload) ;
            state.loading = false;
        })
        .addCase(fetchAuthor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
})