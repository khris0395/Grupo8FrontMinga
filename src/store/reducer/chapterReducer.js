import { createReducer } from "@reduxjs/toolkit"
import { fetchChapter, fetchCommentFromChapter, createComment } from "../actions/chapterActions"

const initialState = {
    chapter: null,
    comments: [],
    loading: false,
    error: null,
    createSuccess: false
}

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        // Casos para fetchChapter
        .addCase(fetchChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.chapter = null;
        })
        .addCase(fetchChapter.fulfilled, (state, action) => {
            state.chapter = action.payload; // Actualizar capítulo
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchCommentFromChapter.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCommentFromChapter.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.loading = false;
        })
        .addCase(fetchCommentFromChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // Casos para createComment
        .addCase(createComment.pending, (state) => {
            state.loading = true;
            state.createSuccess = false;
        })
        .addCase(createComment.fulfilled, (state, action) => {
            state.loading = false;
            state.createSuccess = true;
        })
        .addCase(createComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
});