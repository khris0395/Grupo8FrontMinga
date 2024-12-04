import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCompany = createAsyncThunk(
    "companies/createCompany",
    async (companyData) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/companies/create',
                companyData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data.company
        } catch (error) {
            console.log('Error details:', error.response?.data)
            throw error
        }
    }
)