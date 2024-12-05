import { createReducer } from "@reduxjs/toolkit"
import { fetchChapter } from "../actions/edithChapterActions"

const initialState = {
  loading: false,
  data: {},
  error: null,
};

export const editChapter = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchChapter.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchChapter.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    })
    .addCase(fetchChapter.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
})