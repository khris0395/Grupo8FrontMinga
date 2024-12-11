import { createReducer } from "@reduxjs/toolkit"
import { getProfile } from "../actions/profilesActions"


const initialState = {
    profile: [],
    mangas: [],
    role: null,
    loading: false,
    error: null
}

export const profilesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile
            state.mangas = action.payload.mangas
            state.role = action.payload.role
            state.loading = false
            state.error = null
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
})