import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const reactionsById = createAsyncThunk(
    "reactions/reactionsById",
    async ({ id, token }) => {

        console.log(token);
        console.log(id);
        
        
        try {
            const response = await axios.post(
                `http://localhost:8080/api/reactions/reactionsById`,
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteReaction = createAsyncThunk(
    "chapter/deleteComment",
    async ({ id, token }, { rejectWithValue }) => {
  
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/reactions/delete/${id}`,
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