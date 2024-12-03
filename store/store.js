import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"
import authReducer from "./reducer/authReducer.js"
import { categoryReducer } from './reducer/categoryReducer.js'
import { EditChapter } from "./reducer/edithChapterReducer.js"

const store = configureStore({
     reducer:{
        mangas: mangaReducer,
        authStore: authReducer,
        categories: categoryReducer,
        editChapter: EditChapter
     }
 })
export default store 