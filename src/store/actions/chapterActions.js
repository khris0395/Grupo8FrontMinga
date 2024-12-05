import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChapter = createAsyncThunk(
    "chapter/fetchChapter",
    async (chapterId) => {
        const response = await axios.get(`http://localhost:8080/api/chapter/chapterById/${chapterId}`);
        return response.data.response;
    }
);
