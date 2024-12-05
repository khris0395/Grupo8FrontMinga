import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const setUser = createAction("setUser", (datos)=>{
    return {
        payload:datos,
    }

})

const logOut = createAsyncThunk(
  "logOut",
  async ( token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signout",
        {}, // No necesitas cuerpo en la solicitud
        {
          headers: {
            Authorization: `Bearer ${token}`, // Solo envías el token
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unknown error"
      );
    }
  }
);


const login = createAsyncThunk("login", async({email,password}, { rejectWithValue }) => {

    const credentials = {
        email:email,
        password:password
    }

    try {
    const response = await axios.post("http://localhost:8080/api/auth/signin",credentials)
    
    localStorage.setItem("token",response.data.response.token)
    return response.data.response

  } catch (error) {

    return rejectWithValue(
      error.response?.data?.message || 
      error.response?.data?.error || 
      "Unknown error"
    );
  }
})

const loginWithGoogle = createAction("loginWithGoogle", () => {
  window.location.href = "http://localhost:8080/api/auth/signin/google";
}) 

const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register", 
        userData
      );
      return response.data; 
    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Unknown error"
      );
    }
  }
);


export {login, setUser, logOut, registerUser, loginWithGoogle};