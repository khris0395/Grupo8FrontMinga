import { createReducer } from "@reduxjs/toolkit"
import { get_categories } from "../actions/categoryActions"

const initialState = {
    categories: [],
    loading: false,
    error: null
}

export const categoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(get_categories.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(get_categories.fulfilled, (state, action) => {
            state.categories = action.payload.categorys // Notar que es "categorys" no "categories"
            state.loading = false
            state.error = null
        })
        .addCase(get_categories.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
})