import { createReducer } from "@reduxjs/toolkit"
import { getChapter, fetchComments, createComment, updateChapter, getAllChapters } from "../actions/chapterActions"

const initialState = {
    chapter: [],
    comments: [],
    loading: false,
    error: null,
    updateSuccess: false,
    createSuccess: false
}

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        // Casos para fetchChapter
        .addCase(getChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.chapter = null;
        })
        .addCase(getChapter.fulfilled, (state, action) => {
            state.chapter = action.payload; // Actualizar capítulo
            state.loading = false;
            state.error = null;
        })
        .addCase(getChapter.rejected, (state, action) => {
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
        })
        .addCase(updateChapter.pending, (state, action) => {
            state.loading = true
        })
        .addCase(updateChapter.fulfilled, ( state, action ) => {
            state.loading = false
            state.updateSuccess = true
        })
        .addCase(updateChapter.rejected, (state, action) => {
            state.loading = false
            state.updateSuccess = false
        })
        .addCase(getAllChapters.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.chapter = null;
        })
        .addCase(getAllChapters.fulfilled, (state, action) => {
            state.chapter = action.payload; // Actualizar capítulos
            state.loading = false;
            state.error = null;
        })
        .addCase(getAllChapters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
});