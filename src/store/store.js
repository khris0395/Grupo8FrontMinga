import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"
import authReducer from "./reducer/authReducer.js"
import { categoryReducer } from './reducer/categoryReducer.js'
import { EditChapter } from "./reducer/edithChapterReducer.js"
// import { chapterReducer } from "./reducer/chapterRecuer.js"

const store = configureStore({
     reducer:{
        mangas: mangaReducer,
        authStore: authReducer,
        categories: categoryReducer,
        editChapter: EditChapter
      //   chapter: chapterReducer
     }
 })
export default store 