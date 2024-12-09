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
)

export const updateChapter = createAsyncThunk(
  "chapter/updateChapter",
  async ({ title, updateData }, { rejectWithValue }) => {

    try {
      console.log(title);
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:8080/api/chapters/update/${title}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,

        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating chapter");
    }
  }
)