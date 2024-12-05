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
    async (chapterData) => {
        try {
            console.log('Sending data:', chapterData);
            const response = await axios.post(
                'http://localhost:8080/api/chapters/createChapter',
                chapterData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Create Chapter Response:', response.data);
            return response.data.chapter
        } catch (error) {
            console.log('Error details:', error.response?.data);
            throw error;
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