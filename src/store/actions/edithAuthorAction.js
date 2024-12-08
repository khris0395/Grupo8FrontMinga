import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuthor = createAsyncThunk(
    "editAuthor/fetchAuthor",
    async (AuthorId) => {
        const response = await axios.get(
            `http://localhost:8080/api/authors/id/${AuthorId}`
            
        );
        return response.data;
    }
);


export const updateAuthor = createAsyncThunk(
    "editAuthor/updateAuthor",
    async (author) => {
        const response = await axios.put(
            `http://localhost:8080/api/authors/id/${author.id}`
            ,
            author
        );
        return response.data;
    }
);

export const deleteAuthor = createAsyncThunk(
    "editAuthor/deleteAuthor",
    async (AuthorId) => {
        const response = await axios.delete(
            `http://localhost:8080/api/authors/id/${AuthorId}`
        );
        return response.data;
    }
);