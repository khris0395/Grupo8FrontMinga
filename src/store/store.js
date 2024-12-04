import { configureStore } from "@reduxjs/toolkit"
import { mangaReducer } from "./reducer/mangaRecuer.js"
import authReducer from "./reducer/authReducer.js"
import { categoryReducer } from './reducer/categoryReducer.js'
import { EditChapter } from "./reducer/edithChapterReducer.js"
import { authorReducer } from "./reducer/authorReducer.js"
import { adminPanelReducer } from "./reducer/adminPanelReducer.js"
import { companyReducer } from "./reducer/companyReducer.js"
// import { chapterReducer } from "./reducer/chapterRecuer.js"

const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    authStore: authReducer,
    categories: categoryReducer,
    EditChapter: EditChapter,
    author: authorReducer,
    adminPanel: adminPanelReducer,
    company: companyReducer,
    //   chapter: chapterReducer
  }
})
export default store 