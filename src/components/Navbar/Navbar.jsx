import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import '@madzadev/audio-player/dist/index.css';
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    // Define las rutas donde el botón será blanco
    const whiteButtonRoutes = [
        "/",
        "/chapter:id",
        "/mangas",
        "/favourites",
        "/home",
        "/manager",
        "/signIn"
    ];

    // Verifica si la ruta actual coincide con alguna de las rutas especificadas
    const WhiteButton = whiteButtonRoutes.some(route => 
        route.includes(":") 
            ? location.pathname.startsWith(route.split(":")[0]) 
            : location.pathname === route
    );
    

    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const user = useSelector((state) => state.authStore.user);
    const token = useSelector((state) => state.authStore.token);
    const menuRef = useRef(null);
    const audioRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="absolute top-0 left-0 w-full z-20 bg-transparent">
            <div className="w-full">
                <div className="flex justify-between items-center h-16 px-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={WhiteButton ? "text-white" : "text-[#4338CA]"}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex gap-20 items-center">
                        {/* Play/Stop button */}
                        <div className="bg-white rounded-lg pb-1 z-50">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="text-2xl focus:outline-none"
                            >
                                {isPlaying ? "⏹️" : "▶️"}
                            </button>
                        </div>
                        {/* AudioPlayer */}
                        <div
                            ref={audioRef}
                            className="fixed"
                            style={{
                                left: `750px`,
                                top: `-30px`,
                                zIndex: 40,
                                cursor: "no-drop",
                                display: isPlaying ? "block" : "none"  // Controla la visibilidad
                            }}
                        >
                            <AudioPlayer />
                        </div>
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/9459/009f/2d9d5cb548675533c3d48e332a694b5a?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cnNf-POFHBBNf1RnAwQAox-EGKHwzmimIpp-leCWLaWqUD8vnztcSSI3f2p6bUFQmqbj~9ALB~AtvHXi38fjCbw5XB4YPIp0AWMpSXLI9GO2tKRKhH-5vWwA2C2yTyyAKcHhzg83-7KoRwoiX1L33VI8UN0GqV~KBPDl2CApEa2aPKRqECP2hXfZzBGL83-O9~KY32Cpo6sNuo56UjcP-GhWrVbk6kx9ZcQdopazwPpsmmbh1bEmOoI6FJUYW0zssqY9AuPuHGt6D394NbXBbWW0LycBfus6o~w6zcr7-1LczAun7xqrcOxNX6WKZp71ZDqPSw~CfKr698Qm8CRukA__"
                                alt="Minga Logo"
                                className="h-8"
                            />
                        </Link>
                    </div>
                    {token && (
                        <div className='flex gap-2'>
                            <button
                                className="bg-slate-800 hover:bg-slate-500 text-white px-4 py-2 rounded"
                                onClick={() => dispatch(logOut(token))}
                            >
                                Sign Out
                            </button>
                            <img
                                src={user.photo}
                                alt="User profile"
                                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer object-cover"
                            />
                        </div>
                    )}
                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                                onClick={() => setIsOpen(false)}
                            />
                            <div
                                ref={menuRef}
                                className="fixed top-0 left-0 h-full bg-[#4338CA] w-full md:w-fit md:min-w-[256px] z-40"
                            >
                                <div className="p-6">
                                    {token ? (
                                        <div className="flex items-center gap-4 mb-8">
                                            <img
                                                src={user.photo}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <p className="text-white flex-1 truncate">{user.email}</p>
                                            <button onClick={() => setIsOpen(false)} className="text-white flex-shrink-0">
                                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 mb-8">
                                            <img
                                                src="https://i.pravatar.cc/150"
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full flex-shrink-0"
                                            />
                                            <p className="text-white flex-1 truncate">Guest User</p>
                                            <button onClick={() => setIsOpen(false)} className="text-white flex-shrink-0">
                                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-6">
                                        <Link to="/" className="bg-white text-[#4338CA] py-4 px-6 rounded-lg text-xl">
                                            Home
                                        </Link>
                                        {!token ? (
                                            <>
                                                <Link to="/signUp" className="text-white text-xl px-6">
                                                    Register
                                                </Link>
                                                <Link to="/signIn" className="text-white text-xl px-6">
                                                    Log in
                                                </Link>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
