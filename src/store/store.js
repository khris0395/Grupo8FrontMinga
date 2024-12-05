import { configureStore } from "@reduxjs/toolkit";
import { mangaReducer } from "./reducer/mangaRecuer";
import authReducer from "./reducer/authReducer";
import { categoryReducer } from './reducer/categoryReducer';
import { EditChapter } from "./reducer/edithChapterReducer";
import { authorReducer } from "./reducer/authorReducer";
import { adminPanelReducer } from "./reducer/adminPanelReducer";
import { companyReducer } from "./reducer/companyReducer";
import { managerReducer } from "./reducer/managerReducer";

const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    authStore: authReducer,
    categories: categoryReducer,
    EditChapter: EditChapter,
    author: authorReducer,
    adminPanel: adminPanelReducer,
    company: companyReducer,
    manager: managerReducer
  }
});

export default store;