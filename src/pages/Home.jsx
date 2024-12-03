import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_categories } from "../store/actions/categoryActions";
import { useNavigate } from 'react-router-dom';
import { setUser } from "../store/actions/authActions";
import Navbar from "../components/Navbar/Navbar"
import axios from 'axios';

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

function Home() {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
  
          localStorage.setItem("token", token);
    
          loginWithToken(token).then((user) => {
            dispatch(setUser({ user, token }));
          });
          
        }
        navigate("/")
      }, [dispatch,navigate]);

    const categories = useSelector(state => {
        return state?.categories?.categories || []
    });

    const routes = [

        { to: "/", text: "Home", unrequireAuth: false },
        { to: "/editAuthor", text: "Sing In", unrequireAuth: true },
        { to: "/singUp", text: "Sing Up", unrequireAuth: true },

    ]

    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        dispatch(get_categories())
    }, [dispatch])

    useEffect(() => {
        if (categories.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide(prev =>
                    prev === categories.length - 1 ? 0 : prev + 1
                )
            }, 5000)

            return () => clearInterval(timer)
        }
    }, [categories])

    const nextSlide = () => {
        setCurrentSlide(prev =>
            prev < categories.length - 1 ? prev + 1 : prev
        )
    }

    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0))
    }

    return (
        <div className="min-h-screen w-full bg-[#EBEBEB] overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[644px] overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/9e1b/0909/605c4919d06e9e4c2973cbfcca57c35d?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GQSFmbbIfg2OKcXHveX4vlqfuxaetKTeavDnSRC8E9oTS4WVdouy3p7PmtfaUcNXdZo6TStVtjp~ZaRxzh4l3olr1P-ftY1andYm6N4ZknuAfyyQp12ODAHr6BLBOuabjCrsAxwPdHfT8Uxw442JPt8j6BtbX8sblDmibVvfc67tY0njvtfa2uVHfYbuDH1WGGCeziB7iGH~BrJVrled2JNf1La7KwgOvJbVCRvq91C7wpn6RbKoDYd9LGz63PnlkFv5vhPPU9S33xYzkPfy9Db7EvgDUEg8KuWHdJgPI2ukTJNPwByQGP6pBw14YiHwsupW4Ja50vrz-YM4DCfTrA__"
                        alt="Comic Books Background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* Navbar */}
                <div className="relative z-20 px-12 pt-8">
                    <Navbar />
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <div className="max-w-[723px] w-full">
                        <h1 className="text-[48px] leading-[56px] font-bold font-roboto mb-4">
                            Your favorite comic book store ✨
                        </h1>
                        <p className="max-w-[456px] mx-auto text-[24px] leading-[28px] font-roboto mb-8">
                            Explore our catalog to live the adventure of your life
                        </p>
                        <button className="w-[240px] h-[55px] bg-gradient-to-r from-[#4338CA] to-[#5E52F3] rounded-[6px] font-roboto font-medium text-[24px] hover:opacity-90 transition-opacity mx-auto">
                            Let's go!
                        </button>
                    </div>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="w-full py-14 px-4 flex justify-center">
                <div className="max-w-[1258px] w-full h-[265px] bg-gradient-to-r from-[#4338CA] to-[#5E52F3] rounded-[6px] flex items-center px-8">
                    <button
                        onClick={prevSlide}
                        className="w-[26.5px] h-[26.5px] flex items-center justify-center bg-white/50 backdrop-blur-[16px] rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.1)] hover:bg-white/60 transition-colors"
                        disabled={currentSlide === 0}
                    >
                        <svg className="w-[10px] h-[9px] rotate-180" viewBox="0 0 10 9" fill="none">
                            <path d="M1 4.5L9 4.5M9 4.5L5.5 1M9 4.5L5.5 8" stroke="#333333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {Array.isArray(categories) && categories.length > 0 && (
                        <div className="flex-1 grid grid-cols-3 gap-6 px-12">
                            <div className="relative">
                                <img
                                    src={categories[currentSlide].character_photo}
                                    alt={categories[currentSlide].name}
                                    className="w-[276px] h-[255px] object-cover absolute -top-[75px]"
                                />
                            </div>

                            <div className="relative">
                                <img
                                    src={categories[currentSlide].cover_photo}
                                    alt={categories[currentSlide].name}
                                    className="w-[180px] h-[255px] object-cover absolute -top-[75px] left-1/2 -translate-x-1/2"
                                />
                            </div>

                            <div className="text-white pt-[75px]">
                                <h2 className="text-[24px] font-medium font-roboto mb-[10px]" style={{ color: categories[currentSlide].hover }}>
                                    {categories[currentSlide].name}:
                                </h2>
                                <p className="text-[14px] leading-[95.19%] font-roboto max-w-[356px]">
                                    {categories[currentSlide].description}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={nextSlide}
                        className="w-[26.5px] h-[26.5px] flex items-center justify-center bg-white/50 backdrop-blur-[16px] rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.1)] hover:bg-white/60 transition-colors"
                        disabled={currentSlide === categories.length - 1}
                    >
                        <svg className="w-[10px] h-[9px]" viewBox="0 0 10 9" fill="none">
                            <path d="M1 4.5L9 4.5M9 4.5L5.5 1M9 4.5L5.5 8" stroke="#333333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    )
}


export default Home