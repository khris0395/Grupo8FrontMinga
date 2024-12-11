import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChapter = createAsyncThunk(
    "editChapter/fetchChapter",
    async (chapterId) => {
        const response = await axios.get(
            `http://localhost:8080/api/chapters/chapterById/${chapterId}`
        );
        return response.data;
    }
);

export const createChapter = createAsyncThunk(
    "chapters/createChapter",
    async (chapterData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Sending data:', chapterData);

            const response = await axios.post(
                'http://localhost:8080/api/chapters/createChapter',
                chapterData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Create Chapter Response:', response.data);
            return response.data.chapter;
        } catch (error) {
            console.error('Error details:', error.response?.data);

            // Retornar el mensaje del backend si está presente
            return rejectWithValue(error.response?.data || { success: false, message: "Unknown error occurred" });
        }
    }
);


export const updateChapter = createAsyncThunk(
    "editChapter/updateChapter",
    async (chapter) => {
        const response = await axios.put(
            `http://localhost:8080/api/chapters/chapterById/${chapter.id}`,
            chapter
        );
        return response.data;
    }
);

export const deleteChapter = createAsyncThunk(
    "editChapter/deleteChapter",
    async (chapterId) => {
        const response = await axios.delete(
            `http://localhost:8080/api/chapters/chapterById/${chapterId}`
        );
        return response.data;
    }
);