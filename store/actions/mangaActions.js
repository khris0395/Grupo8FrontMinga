import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMangas = createAsyncThunk("mangas/fetchMangas",
    async (search) => {
        const response = await axios.get(`http://localhost:8080/api/mangas/mangasByTitle${search? '/'+search : ''}`
        )
console.log(response);
console.log(response.data);

        return response.data.response
    }
)

export const Setsearch = createAction('mangas/search')

export const fetchMangaDetails = createAsyncThunk(
    "mangas/fetchMangaDetails",
    async (mangaId) => {
      const response = await axios.get(`http://localhost:8080/api/manga/mangaById/${mangaId}`);
      return response.data.manga;
    }
  );