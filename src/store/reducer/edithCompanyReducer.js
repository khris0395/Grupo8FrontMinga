import { createReducer } from "@reduxjs/toolkit"
import { fetchCompany } from "../actions/edithCompanyAction"

const initialState = {
  loading: false,
  data: {
    name: "",
    website: "",
    description: "",
    photo: "",
  },
  error: null,
};

export const editCompany = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCompany.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCompany.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    })
    .addCase(fetchCompany.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
})