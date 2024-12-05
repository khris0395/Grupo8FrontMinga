import { configureStore } from "@reduxjs/toolkit";
import { mangaReducer } from "./reducer/mangaRecuer";
import authReducer from "./reducer/authReducer";
import { categoryReducer } from './reducer/categoryReducer';
import { editChapter } from "./reducer/edithChapterReducer";
import { authorReducer } from "./reducer/authorReducer";
import { adminPanelReducer } from "./reducer/adminPanelReducer";
import { companyReducer } from "./reducer/companyReducer";
import { chapterReducer } from "./reducer/chapterReducer";

const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    authStore: authReducer,
    categories: categoryReducer,
    editChapter: editChapter,
    author: authorReducer,
    adminPanel: adminPanelReducer,
    company: companyReducer,
    chapter: chapterReducer,
    // comment: commentReducer
  }
});

export default store;