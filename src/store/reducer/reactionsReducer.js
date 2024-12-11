import { createReducer } from "@reduxjs/toolkit";
import { reactionsById } from "../actions/reactionsActions";

const initialState = {
  reactions: [],
  loading: false,
  error: null,
};

export const reactionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reactionsById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(reactionsById.fulfilled, (state, action) => {
      state.reactions = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(reactionsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
});