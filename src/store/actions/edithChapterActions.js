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