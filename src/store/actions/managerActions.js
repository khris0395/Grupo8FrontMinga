import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getManagerProfile = createAsyncThunk('manager/fetch', async () => {

    try {

        const token = localStorage.getItem('token')

        // Realizamos la solicitud con el token en los headers
        const response = await axios.get('http://localhost:8080/api/manager/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('response del backend: ',response.data);
        
        return response.data
    } catch (error) {
        return 'error'
    }

})