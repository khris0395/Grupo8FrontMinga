import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const get_categories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories/allCategories")
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const setSelectedCategories = createAction('SET_SELECTED_CATEGORIES');