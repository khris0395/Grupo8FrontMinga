import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 
export const fetchAuthor = createAsyncThunk(
    "editAuthor/fetchAuthor",
    async (AuthorId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/authors/id/${AuthorId}`
            );
            return response.data;
        } catch (error) {
            // Manejo de errores de axios
            const errorMessage =
                error.response?.data?.message || error.message || "An error occurred";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
); 
*/
export const fetchAuthor = createAsyncThunk(
    "author/fetchAuthor",
    async ({ user_id, token }) => {
      const response = await axios.post(
        `http://localhost:8080/api/authors/findAuthor`, // Enviamos una solicitud POST
        { user_id }, // Pasa el user_id en el cuerpo
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetch authors", response.data.response);
      return response.data.response;
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