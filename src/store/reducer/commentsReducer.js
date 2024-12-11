import { createReducer } from "@reduxjs/toolkit";
import { fetchComment } from "../actions/commentsActions";
import { createComment } from "../actions/chapterActions"; // Asegúrate de importar createComment

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
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // Agregar casos para createComment
    .addCase(createComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.comments.push(action.payload); // Agregar el nuevo comentario al array
      state.loading = false;
      state.error = null;
    })
    .addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});