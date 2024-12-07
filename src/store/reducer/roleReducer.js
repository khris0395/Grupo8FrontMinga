import { createReducer } from '@reduxjs/toolkit';
import { updateRole } from '../actions/roleActions';

const initialState = {
    loading: false,
    error: null,
    user: null
};

const roleReducer = createReducer(initialState, (builder) => {
    builder.addCase(updateRole.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateRole.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false,
            state.user = action.payload.user
        })
        .addCase(updateRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default roleReducer;
