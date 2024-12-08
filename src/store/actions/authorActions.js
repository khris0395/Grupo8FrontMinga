import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuthor = createAsyncThunk(
    "author/fetchAuthor",
    async (authorId) => {
        const response = await axios.get(`http://localhost:8080/api/authors/id/${authorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("fetch authors",response.data.response);
        return response.data.response
    }
);

export const createAuthor = createAsyncThunk(
    "authors/createAuthor",
    async ({ authorData, token }, { rejectWithValue }) => {
        try {
            // Validación de campos requeridos según el modelo
            if (!authorData.name) {
                return rejectWithValue('El nombre es requerido');
            }
            if (!authorData.city_country) {
                return rejectWithValue('La ciudad y país son requeridos');
            }
            if (!authorData.photo) {
                return rejectWithValue('La foto es requerida');
            }
            if (!authorData.user_id) {
                return rejectWithValue('El ID de usuario es requerido');
            }

            // Procesamiento de ciudad y país
            const cityCountry = authorData.city_country;
            const [city, country] = cityCountry.includes(',')
                ? cityCountry.split(',').map(item => item.trim())
                : [null, null];

            if (!city || !country) {
                return rejectWithValue('Debe proporcionar tanto la ciudad como el país en formato "Ciudad, País"');
            }

            const formattedData = {
                name: authorData.name.trim(),
                last_name: authorData.last_name.trim(),
                city,
                country,
                date: authorData.date,
                photo: authorData.photo,
                user_id: authorData.user_id,
                active: true
            };

            const response = await axios.post(
                'http://localhost:8080/api/authors/createAuthor',
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data.author;

        } catch (error) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Error al crear el autor');
        }
    }
);