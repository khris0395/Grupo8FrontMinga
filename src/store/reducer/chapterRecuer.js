import { createReducer } from "@reduxjs/toolkit"
import { fetchChapter } from "../actions/chapterActions"

const initialState = {
    chapter: [],
    loading: false,
    error: null,
    createSuccess: false
}

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchChapter.fulfilled, (state, action) => {
            state.selectedManga = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
});