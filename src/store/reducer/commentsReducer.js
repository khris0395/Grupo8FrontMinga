import { createReducer } from "@reduxjs/toolkit";
import { fetchCommentAC } from "../actions/commentsActions";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCommentAC.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCommentAC.fulfilled, (state, action) => {
      state.comments = action.payload; // Guardamos los comentarios que incluyen la info del autor
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchCommentAC.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});
