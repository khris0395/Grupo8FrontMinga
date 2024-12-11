import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk('manager/fetch', async () => {

  try {

    const token = localStorage.getItem('token')

    // Realizamos la solicitud con el token en los headers
    const response = await axios.get('http://localhost:8080/api/profile/profiles', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);

    return response.data
  } catch (error) {
    return 'error'
  }

})

// Acción para actualizar datos de la compañía
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ company, token, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/companies/update/${id}`,
        // Endpoint para actualizar la compañía
        company,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "author/updateAuthor",
  async ({ author, token, id }, { rejectWithValue }) => {
    try {

      const response = await axios.put(
        `http://localhost:8080/api/authors/update/${id}`, // Endpoint para actualizar el autor
        author,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

