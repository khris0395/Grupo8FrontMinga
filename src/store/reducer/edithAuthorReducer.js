import { createReducer } from "@reduxjs/toolkit"
import { fetchAuthor } from "../actions/edithAuthorAction"

const initialState = {
  loading: false,
  data: {
    name: "",
    last_name: "",
    city: "",
    date: "",
    photo: "",
  },
  error: null,
};

export const editAuthor = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAuthor.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchAuthor.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    })
    .addCase(fetchAuthor.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
})