import { createReducer } from "@reduxjs/toolkit"
import { fetchMangas, Setsearch } from "../actions/mangaActions"

const initialState = {
    mangas: [],
    mangaDetails: [],
    mangaFilterCategory: [],
    mangaFavorites: [],
    search: '',
    loading: true,
    error: null
}

export const mangaReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchMangas.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchMangas.fulfilled, (state, action) => {
            state.mangas = action.payload
            state.loading = false
            state.error = null
        })
        .addCase(fetchMangas.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        }).
        addCase(Setsearch, (state, action) => {
            state.search = action.payload
        })
})
