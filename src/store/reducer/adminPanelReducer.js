import { createReducer } from "@reduxjs/toolkit"
import { fetchAdminPanel, SET_SEARCH, TOGGLE_STATUS } from "../actions/adminPanelActions"

const initialState = {
    teams: [],
    authors: [],
    search: '',
    loading: false,
    error: null
}

export const adminPanelReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchAdminPanel.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAdminPanel.fulfilled, (state, action) => {
            state.teams = action.payload.teams
            state.authors = action.payload.authors
            state.loading = false
            state.error = null
        })
        .addCase(fetchAdminPanel.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(SET_SEARCH, (state, action) => {
            state.search = action.payload
        })
        .addCase(TOGGLE_STATUS, (state, action) => {
            const team = state.teams.find(t => t.id === action.payload)
            if (team) {
                team.isActive = !team.isActive
            }
            const author = state.authors.find(a => a.id === action.payload)
            if (author) {
                author.isActive = !author.isActive
            }
        })
})

export default adminPanelReducer