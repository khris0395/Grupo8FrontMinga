import { createReducer } from "@reduxjs/toolkit";
import {
    fetchMangas,
    fetchCategories,
    fetchAuthors,
    fetchMangaDetails,
    fetchChapters,
    setSearch,
    createManga,
    fetchReactions,
    createReaction,
    deleteReaction,
    updateReaction
} from "../actions/mangaActions";

const initialState = {
    mangas: [],
    categories: [],
    chapters: [],
    authors: [],
    reactions: [],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
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
        .addCase(setSearch, (state, action) => {
            state.search = action.payload;
        })
        .addCase(fetchReactions.pending, (state) => {
            state.loading = true;
            state.error = null;
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
                const existingReactionIndex = state.reactions.findIndex(
                    reaction => reaction.manga_id === action.payload.manga_id
                );

                if (existingReactionIndex !== -1) {
                    state.reactions[existingReactionIndex] = action.payload;
                } else {
                    state.reactions.push(action.payload);
                }

                if (['liked', 'love'].includes(action.payload.reaccion)) {
                    const newFavorite = {
                        mangaId: action.payload.manga_id,
                        reaccion: action.payload.reaccion,
                        _id: action.payload._id,
                        timestamp: new Date().toISOString()
                    };

                    const existingFavoriteIndex = state.favorites.findIndex(
                        f => f.mangaId === newFavorite.mangaId
                    );

                    if (existingFavoriteIndex === -1) {
                        state.favorites.push(newFavorite);
                    } else {
                        state.favorites[existingFavoriteIndex] = newFavorite;
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
        .addCase(updateReaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateReaction.fulfilled, (state, action) => {
            const index = state.reactions.findIndex(
                reaction => reaction._id === action.payload._id
            );
            if (index !== -1) {
                state.reactions[index] = action.payload;

                if (['liked', 'love'].includes(action.payload.reaccion)) {
                    const favoriteIndex = state.favorites.findIndex(
                        f => f.mangaId === action.payload.manga_id
                    );
                    if (favoriteIndex !== -1) {
                        state.favorites[favoriteIndex] = {
                            mangaId: action.payload.manga_id,
                            reaccion: action.payload.reaccion,
                            _id: action.payload._id,
                            timestamp: new Date().toISOString()
                        };
                        localStorage.setItem('favorites', JSON.stringify(state.favorites));
                    }
                }
            }
            state.loading = false;
        })
        .addCase(updateReaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteReaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteReaction.fulfilled, (state, action) => {
            state.reactions = state.reactions.filter(
                reaction => reaction._id !== action.payload.id
            );
            state.favorites = state.favorites.filter(
                favorite => favorite._id !== action.payload.id
            );
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
            state.loading = false;
        })
        .addCase(deleteReaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
});