import { createReducer } from "@reduxjs/toolkit"
import { fetchMangas, setSearch } from "../actions/mangaActions.js"

const initialState = {
    mangas: [],
    mangaDetails: [],
    mangaFilterCategory: [],
    mangaFavorites: [],
    search: '',
    loading: true,
    error: null
}

export const mangaReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchMangas.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchMangas.fulfilled, (state, action) => {
            state.mangas = action.payload
            state.loading = false
            state.error = null
        })
        .addCase(fetchMangas.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        }).
        addCase(setSearch, (state, action) => {
            state.search = action.payload
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        .addCase(fetchAuthors.fulfilled, (state, action) => {
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
        })
        .addCase(fetchReactions.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchReactions.fulfilled, (state, action) => {
            state.reactions = action.payload;
            state.loading = false;
        })
        .addCase(fetchReactions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(createReaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createReaction.fulfilled, (state, action) => {
            if (action.payload) {
                state.reactions.push(action.payload);
                if (action.payload.reaccion === 'liked' || action.payload.reaccion === 'love') {
                    const newFavorite = {
                        mangaId: action.payload.manga_id,
                        reaccion: action.payload.reaccion,
                        _id: action.payload._id,
                        timestamp: new Date().toISOString() // Para ordenar por más recientes
                    };

                    // Evitar duplicados
                    const existingIndex = state.favorites.findIndex(f =>
                        f.mangaId === newFavorite.mangaId && f.reaccion === newFavorite.reaccion
                    );

                    if (existingIndex === -1) {
                        state.favorites.push(newFavorite);
                    } else {
                        state.favorites[existingIndex] = newFavorite;
                    }

                    localStorage.setItem('favorites', JSON.stringify(state.favorites));
                }
            }
            state.loading = false;
        })
        .addCase(createReaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
});

