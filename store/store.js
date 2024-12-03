import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"
import authReducer from "./reducer/authReducer.js"


const store = configureStore({
     reducer:{
        mangas: mangaReducer,
        authStore: authReducer
     }
 })
export default store 