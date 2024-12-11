import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const setUser = createAction("setUser", (datos) => {
  return {
    payload: datos,
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
    console.log(response.data);
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

const findAuthor = createAsyncThunk(
  "author/fetchAuthor",
  async ({ user_id, token }) => {

    console.log(user_id, token);
    
    const response = await axios.post(
      `http://localhost:8080/api/authors/findAuthor`, // Enviamos una solicitud POST
      { user_id }, // Pasa el user_id en el cuerpo
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("fetch authors", response.data.response);
    return response.data.response;
  }
);

const findCompany = createAsyncThunk(
  "findCompany",
  async ({ user_id, token }) => {
    const response = await axios.post(
      `http://localhost:8080/api/companies/findCompany`, // Enviamos una solicitud POST
      { user_id }, // Pasa el user_id en el cuerpo
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("fetch company", response.data.response);
    return response.data.response;
  }
);

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
  })

const fetchMangaDetails = createAsyncThunk(
  "mangas/fetchMangaDetails",
  async (mangaId) => {
    const response = await axios.get(`http://localhost:8080/api/manga/mangaById/${mangaId}`);
    return response.data.manga;
  }
);

const updateRole = createAsyncThunk(
  'updateRole',
  async ({ userId, role, token }, { rejectWithValue }) => {
      try {
          const response = await axios.patch(
              'http://localhost:8080/api/users/updateRole',
              { _id: userId, role },
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          return response.data; // Devuelve la respuesta de la actualización
      } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
      }
  })

  const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Hacer una petición al backend para verificar el token y obtener datos del usuario
                const response = await axios.get('http://localhost:8080/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return {
                    user: response.data.user,
                    token: token
                };
            } catch (error) {
                localStorage.removeItem("token");
                throw error;
            }
        }
        return null;
    }
);


export {login, setUser, logOut, registerUser, loginWithGoogle, updateRole,findAuthor, findCompany, initializeAuth};