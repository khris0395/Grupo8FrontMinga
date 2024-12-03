import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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
import ChapterForm from './pages/ChapterForm'
import AuthorForm from './pages/AuthorForm'
import CompanyForm from './pages/CompanyForm'
import AuthorProfile from './pages/AuthorProfile'
import CompanyProfile from './pages/CompanyProfile'
import Chapter from './pages/Chapter'
import Favourites from './pages/Favourites'

const router = createBrowserRouter([
  {
    element: <MainLayout> </MainLayout>,
    children: [
      {path: '/', element: <Home> </Home>},
      {path: '/Home', element: <Home> </Home>},
      {path: '/Mangas', element: <Mangas></Mangas>},
      {path: '/Manager', element: <Manager></Manager>},
      {path: '/EditChapter', element: <EditChapter></EditChapter>},
      {path: '/SignUp', element: <SignUp></SignUp>},
      {path: '/SignIn', element: <PrivateLogin><SignIn></SignIn></PrivateLogin>},
      {path: '/NewRole', element: <NewRole></NewRole>},
      {path: '/AdminPanel', element: <AdminPanel></AdminPanel>},
      {path: '/EditCompany', element: <EditCompany></EditCompany>},
      {path: '/EditAuthor', element: <EditAuthor></EditAuthor>},
      {path: '/MangaForm', element: <MangaForm></MangaForm>},
      {path: '/ChapterForm', element: <ChapterForm></ChapterForm>},
      {path: '/AuthorForm', element: <AuthorForm></AuthorForm>},
      {path: '/CompanyForm', element: <CompanyForm></CompanyForm>},
      {path: '/AuthorProfile', element: <AuthorProfile></AuthorProfile>},
      {path: '/CompanyProfile', element: <CompanyProfile></CompanyProfile>},
      {path: '/Chapter', element: <Chapter></Chapter>},
      {path: '/Favourites', element: <Favourites></Favourites>},
      {path: '/*', element: <NotFound> </NotFound>},
    ]
  }
])

export default function App() {

  
  // const token = localStorage.getItem("token");
  // const dispatch = useDispatch();

  // if(token){
  //   loginWithToken(token).then((user)=>{
  //     dispatch(setUser({user, token}));
  //   })
  // } 


  return (
    // 
    <>
      <RouterProvider router={router} />
    </>
  )
}

