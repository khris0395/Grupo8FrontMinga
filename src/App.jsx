import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './store/actions/authActions'
import MainLayout from './layouts/MainLayout'
import PrivateLogin from './components/PrivateLogin'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Mangas from './pages/Mangas'
import Manager from './pages/Manager'
import EditChapter from './pages/EditChapter'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NewRole from './pages/NewRole'
import AdminPanel from './pages/AdminPanel'
import EditCompany from './pages/EditCompany'
import EditAuthor from './pages/EditAuthor'
import MangaForm from './pages/MangaForm'
import Manga from './pages/Manga'
import ChapterForm from './pages/ChapterForm'
import AuthorForm from './pages/AuthorForm'
import CompanyForm from './pages/CompanyForm'
import AuthorProfile from './pages/AuthorProfile'
import CompanyProfile from './pages/CompanyProfile'
import Chapter from './pages/Chapter'
import Favourites from './pages/Favourites'
import MangaDetails from './pages/MangaDetails'

const router = createBrowserRouter([
  {
    element: <MainLayout> </MainLayout>,
    children: [
      {path: '/', element: <Home> </Home>},
      {path: '/home', element: <Home> </Home>},
      {path: '/mangas', element: <Mangas></Mangas>},
      {path: '/Manga/:id', element: <Manga></Manga>},
      {path: '/manager', element: <Manager></Manager>},
      {path: '/editChapter', element: <EditChapter></EditChapter>},
      {path: '/signUp', element: <SignUp></SignUp>},
      {path: '/signIn', element: <SignIn></SignIn>},
      {path: '/newRole', element: <NewRole></NewRole>},
      {path: '/adminPanel', element: <AdminPanel></AdminPanel>},
      {path: '/editCompany', element: <EditCompany></EditCompany>},
      {path: '/editAuthor', element: <EditAuthor></EditAuthor>},
      {path: '/mangaForm', element: <MangaForm></MangaForm>},
      {path: '/chapterForm', element: <ChapterForm></ChapterForm>},
      {path: '/authorForm', element: <AuthorForm></AuthorForm>},
      {path: '/companyForm', element: <CompanyForm></CompanyForm>},
      {path: '/authorProfile', element: <AuthorProfile></AuthorProfile>},
      {path: '/companyProfile', element: <CompanyProfile></CompanyProfile>},
      {path: '/chapter', element: <Chapter></Chapter>},
      {path: '/favourites', element: <Favourites></Favourites>},
      {path: '/*', element: <NotFound> </NotFound>},
    ]
  }
])

const loginWithToken = async (token) => {
  try {

    const response = await axios.get(
      "http://localhost:8080/api/users/validateToken",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.log("error", error);
  }
};

export default function App() {

  
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  if (token) {
    loginWithToken(token).then((user) => {
      dispatch(setUser({ user, token }));
    });
  }


  return (
    // 
    <>
      <RouterProvider router={router} />
    </>
  )
}

