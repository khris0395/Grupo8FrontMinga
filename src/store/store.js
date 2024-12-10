import { configureStore } from "@reduxjs/toolkit";
import { mangaReducer } from "./reducer/mangaRecuer";
import authReducer from "./reducer/authReducer";
import { categoryReducer } from './reducer/categoryReducer';
import { editChapter } from "./reducer/editChapterReducer"
import { editAuthor } from "./reducer/edithAuthorReducer";
import { authorReducer } from "./reducer/authorReducer";
import { adminPanelReducer } from "./reducer/adminPanelReducer";
import { companyReducer } from "./reducer/companyReducer";
import { chapterReducer } from "./reducer/chapterReducer";
import { commentReducer } from "./reducer/commentsReducer"
import { managerReducer } from "./reducer/managerReducer";


const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    authStore: authReducer,
    categories: categoryReducer,
    editChapter: editChapter,
    editAuthor: editAuthor,
    authors: authorReducer,
    adminPanel: adminPanelReducer,
    companies: companyReducer,
    chapter: chapterReducer,
    comment: commentReducer,
    manager: managerReducer,
    editAuthor: editAuthor
  }
});

export default store;