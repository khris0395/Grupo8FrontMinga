import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"


const store = configureStore({
     reducer:{
        mangas: mangaReducer
     }
 })
export default store 