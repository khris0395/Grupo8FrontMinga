import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './store/actions/authActions'
import axios from 'axios'
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
import SecondLayout from './layouts/SecondLayout'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/mangas', element: <Mangas /> },
      { path: '/manga/:id', element: <Manga /> },
      { path: '/manager', element: <Manager /> },
      { path: '/authorProfile', element: <AuthorProfile /> },
      { path: '/companyProfile', element: <CompanyProfile /> },
      { path: '/favourites', element: <Favourites /> }
    ]
  },
  {
    element: <SecondLayout />,
    children: [
      {
        path: '/chapter/:id',
        element: <Chapter />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: '/newRole',
        element: <NewRole />
      },
      {
        path: '/adminPanel',
        element: <AdminPanel />
      }, {
        path: '/editChapter/:id',
        element: <EditChapter />
      },
      {
        path: '/editCompany',
        element: <EditCompany />
      },
      {
        path: '/editAuthor',
        element: <EditAuthor />
      }, {
        path: '/mangaForm',
        element: <MangaForm />
      },
      {
        path: '/chapterForm',
        element: <ChapterForm />
      },
      {
        path: '/authorForm',
        element: <AuthorForm />
      },
      {
        path: '/companyForm',
        element: <CompanyForm />
      },
      {
        path: '/*',
        element: <NotFound />
      }
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

