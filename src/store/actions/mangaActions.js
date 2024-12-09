import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMangas = createAsyncThunk("mangas/fetchMangas",
    async (search) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/mangas/allMangas?title=${search}`);
            return response.data.response;
        } catch (error) {
            return 'error';
        }
    }
);

export const deleteManga = createAsyncThunk(
    'mangas/deleteManga',
    async (id) => {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:8080/api/mangas/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
);

export const fetchCategories = createAsyncThunk(
    "mangas/fetchCategories",
    async () => {
        const response = await axios.get('http://localhost:8080/api/categories/allCategories');
        return response.data.categorys;
    }
);

export const fetchAuthors = createAsyncThunk(
    "mangas/fetchAuthors",
    async () => {
        const response = await axios.get('http://localhost:8080/api/authors/allAuthors');
        return response.data.authors;
    }
);

export const fetchMangaDetails = createAsyncThunk(
    "mangas/fetchMangaDetails",
    async (mangaId) => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/api/manga/mangaById/${mangaId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.response;
    }
);

export const fetchChapters = createAsyncThunk(
    "mangas/fetchChapters",
    async (mangaId) => {
        const response = await axios.get(`http://localhost:8080/api/mangas/${mangaId}/chapters`);
        return response.data.response.chapters;
    }
);

export const createManga = createAsyncThunk(
    "mangas/createManga",
    async (mangaData) => {
        const response = await axios.post(
            'http://localhost:8080/api/mangas/create',
            mangaData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.response;
    }
);

export const fetchReactions = createAsyncThunk(
    "reactions/fetchReactions",
    async () => {
        const response = await axios.get('http://localhost:8080/api/reactions/allReactions');
        return response.data.reactions;
    }
);

export const createReaction = createAsyncThunk(
    "reactions/createReaction",
    async (reactionData) => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                manga_id: reactionData.manga_id.toString(),
                reaccion: reactionData.reaccion
            };

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/reactions/createReaction',
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data.reaction;
        } catch (error) {
            console.error('Error creating reaction:', error.response?.data);
            throw error;
        }
    }
);

export const updateReaction = createAsyncThunk(
    "reactions/updateReaction",
    async ({ id, reactionData }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8080/api/reactions/update/${id}`,
                reactionData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data.reaction;
        } catch (error) {
            console.error('Error updating reaction:', error);
            throw error;
        }
    }
);

export const deleteReaction = createAsyncThunk(
    "reactions/deleteReaction",
    async (reactionId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:8080/api/reactions/delete/${reactionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return { id: reactionId, data: response.data };
        } catch (error) {
            console.error('Error deleting reaction:', error);
            throw error;
        }
    }
);

export const fetchReactionById = createAsyncThunk(
    "reactions/fetchReactionById",
    async (reactionId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:8080/api/reactions/reactionById/${reactionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data.reaction;
        } catch (error) {
            console.error('Error fetching reaction:', error);
            throw error;
        }
    }
);

export const setSearch = createAction('mangas/search');