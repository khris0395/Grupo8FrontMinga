import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCommentAC = createAsyncThunk(
    "comment/fetchCommentAC",
    async () => {
        const response = await axios.get('http://localhost:8080/comments', { params: filter });
        console.log(response.data);
    } 
);