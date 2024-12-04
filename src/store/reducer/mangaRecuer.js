import { createReducer } from "@reduxjs/toolkit";
import { fetchMangas, fetchCategories, fetchAuthors, fetchMangaDetails, fetchChapters, Setsearch, createManga } from "../actions/mangaActions";

const initialState = {
    mangas: [],
    categories: [],
    chapters: [],
    authors: [],
    search: '',
    loading: false,
    error: null,
    selectedManga: null,
    createSuccess: false
};

export const mangaReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchMangas.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMangas.fulfilled, (state, action) => {
            state.mangas = action.payload;
            state.loading = false;
        })
        .addCase(fetchMangas.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            console.log("Categories:", action.payload);
            state.categories = action.payload;
        })
        .addCase(fetchAuthors.fulfilled, (state, action) => {
            console.log("Authors:", action.payload);
            state.authors = action.payload;
        })
        .addCase(createManga.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.createSuccess = false;
        })
        .addCase(createManga.fulfilled, (state, action) => {
            state.mangas.push(action.payload);
            state.loading = false;
            state.createSuccess = true;
        })
        .addCase(createManga.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.createSuccess = false;
        })
        .addCase(fetchMangaDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.selectedManga = null;
        })
        .addCase(fetchMangaDetails.fulfilled, (state, action) => {
            state.selectedManga = action.payload;
            state.loading = false;
        })
        .addCase(fetchMangaDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchChapters.pending, (state) => {
            state.loading = true;
            state.chapters = [];
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            state.chapters = action.payload;
            state.loading = false;
        })
        .addCase(fetchChapters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.chapters = [];
        })
        .addCase(Setsearch, (state, action) => {
            state.search = action.payload;
        });
});