import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMangas = createAsyncThunk("mangas/fetchMangas",
    async (search) => {
        const response = await axios.get(`http://localhost:8080/api/mangas/mangasByTitle/${search}`) 
        return response.data.response
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
        const response = await axios.get(`http://localhost:8080/api/manga/mangaById/${mangaId}`);
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
        return response.data.response;
    }
);

export const createReaction = createAsyncThunk(
    "reactions/createReaction",
    async (reactionData) => {
        try {
            const payload = {
                manga_id: reactionData.manga_id.toString(),
                author_id: "674a404f2c593fb14a0d09b4", // id del autor de la manga prueba
                company_id: "674a404f2c593fb14a0d09b6", // id de la compañía de la que se ha hecho la reacción prueba
                reaccion: reactionData.reaccion
            };
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/reactions/createReaction',
                data: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.response;
        } catch (error) {
            console.error('Full error:', error);
            console.error('Error response:', error.response?.data);
            throw error;
        }
    }
);

export const setSearch = createAction('mangas/search')