import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk('manager/fetch', async () => {

    try {

        const token = localStorage.getItem('token')

        // Realizamos la solicitud con el token en los headers
        const response = await axios.get('http://localhost:8080/api/profile/profiles', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        
        return response.data
    } catch (error) {
        return 'error'
    }

})