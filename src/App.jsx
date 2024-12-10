import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { findAuthor, findCompany, setUser } from './store/actions/authActions'
import axios from 'axios'
import MainLayout from './layouts/MainLayout'
import {
  PrivateLogin,
  PrivateAdmin,
  PrivateManager,
  PrivateProfileAuthor,
  PrivateProfileCompany,
  PrivateroleNoToken,
  PrivateRoles
} from './components/PrivateRoutes'
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
import { Navigate } from 'react-router-dom';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/mangas',
        element: <Mangas />

      },
      {
        path: '/manga/:id',
        element: <PrivateroleNoToken><Manga /></PrivateroleNoToken>

      },
      {
        path: '/manager',
        element: <PrivateManager><Manager /></PrivateManager>

      },
      {
        path: '/authorProfile/:id',
        element: <PrivateProfileAuthor><AuthorProfile /></PrivateProfileAuthor>

      },
      {
        path: '/companyProfile',
        element: <PrivateProfileCompany><CompanyProfile /></PrivateProfileCompany>

      },
      {
        path: '/favourites',
        element: <PrivateroleNoToken><Favourites /></PrivateroleNoToken>

      }
    ]
  },
  {
    element: <SecondLayout />,
    children: [
      {
        path: '/chapter/:id',
        element: <PrivateroleNoToken><Chapter /></PrivateroleNoToken>
      },
      {
        path: '/signUp',
        element: <PrivateLogin><SignUp /></PrivateLogin>
      },
      {
        path: '/signIn',
        element: <PrivateLogin><SignIn /></PrivateLogin>
      },
      {
        path: '/newRole',
        element: <PrivateRoles><NewRole /></PrivateRoles>
      },
      {
        path: '/adminPanel',
        element: <PrivateAdmin><AdminPanel /></PrivateAdmin>
      },
      {
        path: '/editChapter/:id',
        element: <EditChapter />
      },
      {
        path: '/editChapter',
        element: <PrivateManager><EditChapter /></PrivateManager>
      },
      {
        path: '/editCompany/:id',
        element: <PrivateProfileCompany><EditCompany /></PrivateProfileCompany>
      },
      {
        path: '/editAuthor',
        element: <PrivateProfileAuthor><EditAuthor /></PrivateProfileAuthor>
      }, {
        path: '/mangaForm',
        element: <PrivateManager><MangaForm /></PrivateManager>
      },
      {
        path: '/chapterForm',
        element: <PrivateManager><ChapterForm /></PrivateManager>
      },
      {
        path: '/authorForm',
        element: <PrivateRoles><AuthorForm /></PrivateRoles>
      },
      {
        path: '/companyForm',
        element: <PrivateRoles><CompanyForm /></PrivateRoles>
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
      if (user.role === 1) {
        dispatch(findAuthor({ user_id: user._id, token }))
      } else if (user.role === 2) {
        dispatch(findCompany({ user_id: user._id, token }))
      }

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

