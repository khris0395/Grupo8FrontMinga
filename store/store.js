import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"
import authReducer from "./reducer/authReducer.js"
import { categoryReducer } from './reducer/categoryReducer.js'


const store = configureStore({
     reducer:{
        mangas: mangaReducer,
        authStore: authReducer,
        categories: categoryReducer
     }
 })
export default store 