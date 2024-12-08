import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchComment = createAsyncThunk(
    "author/fetchComment",
    async (commentId) => {
        const response = await axios.get(`http://localhost:8080/api/commentById/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("fetch comment", response.data.response);
        return response.data.response
    }
);


export const fetchCommentAC = createAsyncThunk(
    "comment/fetchCommentAC",
    async () => {
        const response = await axios.get('http://localhost:8080/api/comments/allComments',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data);
    }
);


export const createComment = createAsyncThunk(
    "comment/createComment",
    async ({ commentData, token, chapterId }) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/comments/createComment`,
                {
                    ...commentData,
                    chapter_id: chapterId
                },
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