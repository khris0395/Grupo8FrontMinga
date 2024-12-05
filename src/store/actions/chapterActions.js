import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChapter = createAsyncThunk(
    "chapter/fetchChapter",
    async (chapterId) => {
        const response = await axios.get(`http://localhost:8080/api/chapters/chapterById/${chapterId}`);
        return response.data.response;
    }
);

// Acción para obtener comentarios de un capítulo
export const fetchComments = createAsyncThunk(
    "chapter/fetchComments",
    async (chapter_id) => {
      const response = await axios.get(`http://localhost:8080/api/chapters/${chapter_id}/comments`);
      return response.data.response;
    }
  );
  
  // Acción para crear un nuevo comentario en un capítulo
  export const createComment = createAsyncThunk(
    "chapter/createComment",
    async ({ chapterId, commentData }) => {
      const response = await axios.post(
        `http://localhost:8080/api/chapters/${chapterId}/comments`,
        commentData
      );
      return response.data.response;
    }
  );