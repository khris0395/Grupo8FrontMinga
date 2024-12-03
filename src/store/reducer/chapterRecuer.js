import { createReducer } from "@reduxjs/toolkit"
import { fetchChapter, createChapter } from "../actions/chapterActions" // Actualizado el import

const initialState = {
    chapter: [],
    loading: false,
    error: null,
    createSuccess: false // Agregado para manejar el éxito de la creación
}

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchChapter.fulfilled, (state, action) => {
            state.selectedManga = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // Agregados los casos para createChapter
        .addCase(createChapter.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.createSuccess = false;
        })
        .addCase(createChapter.fulfilled, (state, action) => {
            state.chapter.push(action.payload);
            state.loading = false;
            state.error = null;
            state.createSuccess = true;
        })
        .addCase(createChapter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.createSuccess = false;
        })
})