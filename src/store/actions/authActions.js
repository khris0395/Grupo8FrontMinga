import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const setUser = createAction("setUser", (datos)=>{
    return {
        payload:datos,
    }

})

const logOut = createAction("logout");



const login = createAsyncThunk("login", async({email,password}) => {

    const credentials = {
        email:email,
        password:password
    }
    const response = await axios.post("http://localhost:8080/api/auth/signin",credentials)
    
    localStorage.setItem("token",response.data.response.token)
    return response.data.response
   
    
})

const registerUser = createAsyncThunk(
    "user/register", 
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/register", 
          userData
        );
        return response.data.response; 
      } catch (error) {

        return rejectWithValue(error.response?.data?.messages || "Unknown error");
      }})

export {login, setUser, logOut, registerUser};