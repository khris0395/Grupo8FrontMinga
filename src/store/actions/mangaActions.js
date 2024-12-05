import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMangas = createAsyncThunk("mangas/fetchMangas",
    async (search) => {
        const response = await axios.get(`http://localhost:8080/api/mangas/mangasByTitle/${search}`) 
        console.log(response);

        return response.data.response
    }
)

export const setSearch = createAction('mangas/search')