import { createReducer } from "@reduxjs/toolkit"
import { getManagerProfile } from "../actions/managerActions"


const initialState = {
    profile: [],
    mangas: [],
    role: null,
    loading: false,
    error: null
}

export const managerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getManagerProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getManagerProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile
            state.mangas = action.payload.mangas
            state.role = action.payload.role
            state.loading = false
            state.error = null
        })
        .addCase(getManagerProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
})