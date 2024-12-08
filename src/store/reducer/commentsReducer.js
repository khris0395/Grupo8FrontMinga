import { createReducer } from "@reduxjs/toolkit";
import { fetchComment } from "../actions/commentsActions";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchComment.fulfilled, (state, action) => {
      state.comments = action.payload; // Guardamos los comentarios que incluyen la info del autor
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});
