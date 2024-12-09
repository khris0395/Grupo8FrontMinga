import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllChapters = createAsyncThunk(
  "chapter/getAllChapters",
  async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/chapters/allChapters?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data.response
    } catch (error) {

    }
  }
)

export const getChapter = createAsyncThunk(
  "chapter/fetchChapter",
  async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8080/api/chapters/chapterById/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      return 'Error in the Consult success: false'

    }
  }
);

// Acción para obtener comentarios de un capítulo
export const fetchCommentFromChapter = createAsyncThunk(
  "chapter/fetchCommentFromChapter",
  async (chapter_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8080/api/chapters/${chapter_id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.response;
    } catch (error) {
      throw error;
    }
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

export const deleteComment = createAsyncThunk(
  "chapter/deleteComment",
  async ({ id, token }, { rejectWithValue }) => {
    console.log("token entrando a actionDelete", token);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/comments/deleteComment/${id}`, // Pasar el ID como parte de la URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Respuesta exitosa
    } catch (error) {
      console.error("Error en deleteComment:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);


export const updateChapter = createAsyncThunk(
  "chapter/updateChapter",
  async ({ title, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://localhost:8080/api/chapters/update`,
        { title, updateData },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const fetchComments = createAsyncThunk(
  "chapter/fetchComments",
  async (chapter_id) => {
    const response = await axios.get(`http://localhost:8080/api/chapters/${chapter_id}/comments`)
    return response.data.response
  }
)