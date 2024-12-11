import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { findAuthor, findCompany, setUser } from './store/actions/authActions'
import { useState, useRef } from "react";
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
import '@madzadev/audio-player/dist/index.css';
import AudioPlayer from "../src/components/AudioPlayer/AudioPlayer";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";


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
				path: '/authorProfile',
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
				path: '/editCompany',
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


	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null);

	let play = <FaRegStopCircle className="text-[#c35deb] hover:text-[#7b3497] text-4xl transition ease-in duration-200" />;
	let stop = <FaRegPlayCircle className="text-blue-400 hover:text-blue-700 text-4xl transition ease-in duration-200" />;


	return (
		<>
			{/* Play/Stop button in the top-left corner */}
			<div className="absolute top-[14px] right-20 sm:right-28 z-50">
				<button
					onClick={() => setIsPlaying(!isPlaying)}
					className="text-2xl focus:outline-none"
				>
					{isPlaying ? play : stop}
				</button>
			</div>

			{/* AudioPlayer */}
			<div
				ref={audioRef}
				className={`fixed z-10 duration-700 ease-in-out 
					sm:text-lg transition-all -translate-x-2/4 
					right-[-90px] top-[70px] md:-right-[170px] md:-top-[-80px]
          			${isPlaying ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
				}`}
				style={{
					pointerEvents: isPlaying ? "auto" : "none",
				}}
			>
				<AudioPlayer />
			</div>

			<RouterProvider router={router} />
		</>
	)
}

