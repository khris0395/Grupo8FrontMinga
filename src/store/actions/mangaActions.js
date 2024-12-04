import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMangas = createAsyncThunk(
    "mangas/fetchMangas",
    async (search) => {
        const response = await axios.get(`http://localhost:8080/api/mangas/mangasByTitle${search ? '/' + search : ''}`);
        return response.data.response;
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

export const Setsearch = createAction('mangas/search');