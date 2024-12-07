import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateRole = createAsyncThunk(
    'updateRole',
    async ({ userId, role, token }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                'http://localhost:8080/api/users/updateRole',
                { _id: userId, role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Devuelve la respuesta de la actualización
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);