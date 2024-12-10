import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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
  async ({ author, token }, { getState }) => {
    try {
      // Obtén el estado de Redux
      const state = getState();
      // Suponemos que el estado tiene un arreglo de autores y tomamos la primera ID (ajusta según tu estructura)
      const id = state.authors.authors[0]?._id;

      if (!id) {
        throw new Error("No author ID found in state.");
      }

      const response = await axios.put(
        `http://localhost:8080/api/authors/update/${id}`, // ID obtenida desde Redux
        { ...author }, // Datos de actualización
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token en encabezados
          },
        }
      );
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in updateAuthor:", error.response?.data || error.message);
      throw error.response?.data || error.message; // Manejo de error
    }
  }
);


export const deleteAuthor = createAsyncThunk(
  "editAuthor/deleteAuthor",
  async ({ author, token }, { getState }) => {
    try {
      // Obtén el estado de Redux
      const state = getState();
      // Suponemos que el estado tiene un arreglo de autores y tomamos la primera ID (ajusta según tu estructura)
      const id = state.authors.authors[0]?._id;

      if (!id) {
        throw new Error("No author ID found in state.");
      }

      const response = await axios.delete(
        `http://localhost:8080/api/authors/delete/${id}`
        ,
         
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token en encabezados
          },
        }
      );
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in delete:", error.response?.data || error.message);
      throw error.response?.data || error.message; // Manejo de error
    }
  }
);


