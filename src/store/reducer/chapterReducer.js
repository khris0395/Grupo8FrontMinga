import { createReducer } from "@reduxjs/toolkit"
import { getChapter, fetchComments, createComment, updateChapter, getAllChapters, deleteChapter } from "../actions/chapterActions"

const initialState = {
    chapter: null,
    comments: [],
    loading: false,
    error: null,
    updateSuccess: false,
    createSuccess: false
}

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.chapter = []
        })
        .addCase(getChapter.fulfilled, (state, action) => {
            state.chapter = action.payload.response;
            state.loading = false;
            state.error = null;
        })
        .addCase(getChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.chapter = null;
        })
        .addCase(deleteChapter.fulfilled, ( state, action) => {
            state.chapter = action.payload
        })
        .addCase(deleteChapter.rejected, ( state, action ) => {
            state.error = action.error.message
        })
        .addCase(fetchComments.pending, (state) => {
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
            state.createSuccess = false;
        })
        .addCase(updateChapter.pending, (state) => {
            state.loading = true;
            state.updateSuccess = false;
        })
        .addCase(updateChapter.fulfilled, (state, action) => {
            state.loading = false;
            state.updateSuccess = true;
        })
        .addCase(updateChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.updateSuccess = false;
        })
        .addCase(getAllChapters.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllChapters.fulfilled, (state, action) => {
            state.chapter = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getAllChapters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.chapter = null;
        })
});