import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchComment = createAsyncThunk(
    "author/fetchComment",
    async (commentId) => {
        const response = await axios.get(`http://localhost:8080/api/commentById/${commentId}`);
        console.log("fetch comment",response.data.response);
        return response.data.response
    }
);


export const fetchCommentAC = createAsyncThunk(
    "comment/fetchCommentAC",
    async () => {
        const response = await axios.get('http://localhost:8080/comments', { params: filter });
        console.log(response.data);
    } 
);