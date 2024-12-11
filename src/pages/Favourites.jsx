import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reactionsById, deleteReaction } from "../store/actions/reactionsActions";
import MangaNotFound from "../assets/images/anime-girl.gif"
import Favourites from "../assets/images/Favourites.jpg"


const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authStore);
    const idUser = user?._id;

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!idUser || !token) return;

            try {
                const response = await dispatch(
                    reactionsById({ id: idUser, token })
                ).unwrap();

                const filteredReactions = response.reactions.filter(
                    (reaction) => reaction.reaccion === "liked" || reaction.reaccion === "love"
                );

                setFavorites(filteredReactions);

            } catch (error) {
                console.error("Error fetching reactions:", error);
            }
        };

        fetchFavorites();
    }, [dispatch, idUser, token]);

    const handleNavigateToManga = (mangaId) => {
        navigate(`/manga/${mangaId}`);
    };

    const handleRemoveFavorite = async (mangaId) => {
        try {
            await dispatch(deleteReaction({
                id: mangaId,
                token
            })).unwrap();

            setFavorites((prevFavorites) =>
                prevFavorites.filter((favorite) => favorite._id !== mangaId)
            );

        } catch (error) {
            console.error(error);
        }
    };

    if (!favorites.length) {
        return <div className="text-center p-4 mt-24">No favorites yet!</div>;
    }

    return (
        <div className="min-h-screen relative">
            <div className="relative flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold absolute top-40 md:top-20 text-center z-20">Favourites</h1>
            </div>
            <div className="relative">
                <div className="w-full h-[40vh] md:h-[50vh]">
                    <img
                        src={Favourites}
                        alt="Mangas"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="w-11/12 bg-white mx-auto -translate-y-12 rounded-xl py-8">
                    <div className="flex flex-wrap justify-center items-start gap-4">
                        {favorites.map((favorite) => {
                            if (!favorite?.manga_id) return null;

                            return (
                                <div
                                    key={favorite.manga_id._id}
                                    onClick={() => handleNavigateToManga(favorite.manga_id._id)}
                                    className="w-[280px] h-[90px] md:w-[325px] md:h-[120px] lg:w-[450px] lg:h-36 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center m-2 md:m-4 hover:-translate-y-1 cursor-pointer"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFavorite(favorite._id);
                                        }}
                                        className="absolute left-[12px] top-[8px] md:left-[18px] md:top-[9px] w-[12px] h-[12px] md:w-[13.9px] md:h-[13.9px] border border-[#222222] rounded-full flex items-center justify-center z-10"
                                    >
                                        <span className="transform rotate-45 text-[#222222] text-xs md:text-sm">+</span>
                                    </button>

                                    <div className="flex-1 p-3 md:p-4 pl-4 md:pl-6 flex flex-col justify-center h-full relative">
                                        <div className={`w-1 h-full absolute left-0 top-0 ${favorite.manga_id?.category_id?.bg || 'bg-gray-500'}`}></div>

                                        <h3 className="text-base md:text-lg font-bold text-gray-800 line-clamp-2">
                                            {favorite.manga_id?.title || 'Untitled'}
                                        </h3>
                                        <span className={`text-xs md:text-sm ${favorite.manga_id?.category_id?.text || 'text-gray-500'}`}>
                                            {favorite.manga_id?.category_id?.name || 'Category'}
                                        </span>
                                    </div>

                                    <div className="w-[80px]  md:w-[100px] lg:w-[120px] h-36 relative flex-shrink-0">
                                        <div className="w-[120px] h-[80px] md:w-[140px] md:h-[100px] lg:w-[160px] lg:h-[120px] overflow-hidden relative">
                                            <img
                                                src={favorite.manga_id?.cover_photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo79b2l7teWYiI5GuEHf1XohsdANW1y5X9jA&s'}
                                                alt={favorite.manga_id?.title || 'Manga'}
                                                className="absolute right-0 h-full w-full object-cover rounded-l-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;