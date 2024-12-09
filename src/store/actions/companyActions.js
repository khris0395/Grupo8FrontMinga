import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCompany = createAsyncThunk(
    "companies/createCompany",
    async ({companyData, token}) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/companies/create',
                companyData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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

export const fetchCompany = createAsyncThunk(
    "author/fetchCompany",
    async (companyId) => {
        const response = await axios.get(`http://localhost:8080/api/comments/commentById/${companyId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("fetch company",response.data.response);
        return response.data.response
    }
);
