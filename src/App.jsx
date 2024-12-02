import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayoud from "./layouts/MainLayout"
import SecondLayout from "./layouts/SecondLayout";
import Home from './pages/Home';
import AdminPanel from "./pages/AdminPanel";
import AuthorForm from "./pages/AuthorForm";
import AuthorProfile from "./pages/AuthorProfile";
import Chapter from "./pages/Chapter"
import ChapterForm from "./pages/EditAuthor"
import CompanyForm from "./pages/CompanyForm"
import CompanyProfile from "./pages/CompanyProfile";
import EditAuthor from "./pages/EditAuthor"
import EditChapter from "./pages/EditChapter";
import EditCompany from "./pages/EditCompany"
import Favourites from "./pages/Favourites"
import Manager from "./pages/Manager"
import MangaForm from "./pages/Favourites"
import Mangas from "./pages/Mangas"
import NewRole from "./pages/NewRole"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const router = createBrowserRouter([
  {
    element: <MainLayoud></MainLayoud>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/adminPanel", element: <AdminPanel></AdminPanel>},
      { path: "/authorForm", element: <AuthorForm></AuthorForm>},
      { path: "/authorProfile", element: <AuthorProfile></AuthorProfile>},
      { path: "/chapter", element: <Chapter></Chapter>},
      { path: "/chapterForm", element: <ChapterForm></ChapterForm>},
      { path: "/companyForm", element: <CompanyForm></CompanyForm>},
      { path: "/companyProfile", element: <CompanyProfile></CompanyProfile>},
      { path: "/editAuthor", element: <EditAuthor></EditAuthor>},
      { path: "/editCompany", element: <EditCompany></EditCompany>},
      { path: "/editChapter", element: <EditChapter></EditChapter>},
      { path: "/favourites", element: <Favourites></Favourites>},
      { path: "/manager", element: <Manager></Manager>},
      { path: "/mangaForm", element: <MangaForm></MangaForm>},
      { path: "/mangas", element: <Mangas></Mangas>},
      { path: "/newRole", element: <NewRole></NewRole>},
      { path: "/signIn", element: <SignIn></SignIn>},
      { path: "/signUp", element: <SignUp></SignUp>}
    ]},{
    element: <SecondLayout></SecondLayout>,
    children: []
    }
  
  ]);

function App() {
  return (

    <RouterProvider router={router}></RouterProvider>

  );
}

export default App;