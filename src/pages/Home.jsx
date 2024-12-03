import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_categories } from "../store/actions/categoryActions";
import Navbar from "../components/Navbar/Navbar";

function Home() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state?.categories?.categories || []);
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Detecta si el dispositivo es móvil
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Configuración inicial
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Obtiene las categorías desde el store
    useEffect(() => {
        dispatch(get_categories());
    }, [dispatch]);

    // Cambia de diapositiva automáticamente
    useEffect(() => {
        if (categories.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [categories]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev < categories.length - 1 ? prev + 1 : prev));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="min-h-screen bg-[#EBEBEB]">
            <div className="relative h-screen md:h-[644px]">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/9e1b/0909/605c4919d06e9e4c2973cbfcca57c35d?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GQSFmbbIfg2OKcXHveX4vlqfuxaetKTeavDnSRC8E9oTS4WVdouy3p7PmtfaUcNXdZo6TStVtjp~ZaRxzh4l3olr1P-ftY1andYm6N4ZknuAfyyQp12ODAHr6BLBOuabjCrsAxwPdHfT8Uxw442JPt8j6BtbX8sblDmibVvfc67tY0njvtfa2uVHfYbuDH1WGGCeziB7iGH~BrJVrled2JNf1La7KwgOvJbVCRvq91C7wpn6RbKoDYd9LGz63PnlkFv5vhPPU9S33xYzkPfy9Db7EvgDUEg8KuWHdJgPI2ukTJNPwByQGP6pBw14YiHwsupW4Ja50vrz-YM4DCfTrA__"
                        alt="Comic Books Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* Contenido principal */}
                <div className="relative h-full flex flex-col">
                    <div className="z-20 px-4 pt-8">
                        <Navbar
                            routes={[
                                { to: "/", text: "Home", unrequireAuth: false },
                                { to: "/editAuthor", text: "Sign In", unrequireAuth: true },
                                { to: "/signUp", text: "Sign Up", unrequireAuth: true },
                            ]}
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center text-white px-6 py-10 md:px-12 md:py-20">
                        <h1 className="text-3xl md:text-[48px] font-bold font-roboto mb-4">
                            {isMobile ? "Your favorite comic book store" : "Your favorite comic book store ✨"}
                        </h1>
                        <p className="text-base md:text-[24px] font-roboto mb-8">
                            {isMobile
                                ? "From classics to novelties, we have everything you need to immerse yourself in your favorite universes. Explore our catalog and live the adventure of your life."
                                : "Explore our catalog to live the adventure of your life."}
                        </p>
                        <button className="w-full md:w-[240px] h-[55px] bg-gradient-to-r from-[#4338CA] to-[#5E52F3] rounded-[6px] font-roboto font-medium text-xl">
                            {isMobile ? "Lets go!" : "Let's go!"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Carrusel (sólo para escritorio) */}
            <section className="hidden md:flex w-full py-14 px-4 justify-center h-[500px]">
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
    );
}

export default Home;
