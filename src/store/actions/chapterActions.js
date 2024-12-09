import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChapter = createAsyncThunk(
    "chapter/fetchChapter",
    async (chapterId) => {
        const response = await axios.get(`http://localhost:8080/api/chapters/chapterById/${chapterId}`);
        return response.data.response
    }
);

// Acción para obtener comentarios de un capítulo
export const fetchCommentFromChapter = createAsyncThunk(
    "chapter/fetchCommentFromChapter",
    async (chapter_id) => {
      const response = await axios.get(`http://localhost:8080/api/chapters/${chapter_id}/comments`);
      return response.data.response;
    }
  );
  
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

  export const updateComment = createAsyncThunk(
    "chapter/updateComment",
    async ({ commentId, updatedMessage, token }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/comments/updateComment`,
                { commentId, updatedMessage }, // ID y mensaje en el cuerpo del request
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Respuesta exitosa
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update comment"
            );
        }
    }
);