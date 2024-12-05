import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createAuthor = createAsyncThunk(
    "authors/createAuthor",
    async (authorData) => {
        try {
            const [city, country] = authorData.city_country.split(',').map(item => item.trim())
            const formattedData = {
                name: authorData.name,
                last_name: authorData.last_name,
                city: city || '',
                country: country || '',
                date: authorData.date,
                photo: authorData.photo,
                user_id: "674e8d017de330968c59d918", // ID temporal para pruebas
                active: true
            }

            const response = await axios.post(
                'http://localhost:8080/api/authors/createAuthor',
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data.author
        } catch (error) {
            console.log('Error details:', error.response?.data)
            throw error
        }
    }
)