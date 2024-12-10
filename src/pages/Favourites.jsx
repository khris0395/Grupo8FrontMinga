import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedReactions = JSON.parse(localStorage.getItem("userReactions") || "{}");
        const mangaList = Object.entries(savedReactions)
            .filter(([_, reaction]) => reaction === "liked" || reaction === "love")
            .map(([mangaId, reaction]) => {
                const mangaData = JSON.parse(localStorage.getItem("mangaData") || "{}");
                const mangaInfo = mangaData[mangaId] || {};
                return {
                    mangaId,
                    title: mangaInfo.title || "Unknown Title",
                    cover_photo: mangaInfo.cover_photo || "",
                    reaccion: reaction,
                };
            });
        setFavorites(mangaList);
    }, []);

    console.log(favorites);
    
    const handleNavigateToManga = (mangaId) => {
        navigate(`/manga/${mangaId}`);
    };

    const removeFavorite = (mangaId) => {
        // Eliminar la reacción del localStorage
        const savedReactions = JSON.parse(localStorage.getItem("userReactions") || "{}");
        delete savedReactions[mangaId];
        localStorage.setItem("userReactions", JSON.stringify(savedReactions));

        // Actualizar la lista de favoritos
        setFavorites(favorites.filter((favorite) => favorite.mangaId !== mangaId));
    };

    if (!favorites.length) {
        return <div className="text-center p-4 mt-24">No favorites yet!</div>;
    }

    return (
        <div className="container mx-auto px-4 py-4 md:py-8 mt-16 md:mt-24">
            <h1 className="text-3xl font-bold text-center">Your Favorites</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite) => (
                    <div
                        key={favorite.mangaId}
                        className="bg-white p-4 rounded-xl shadow-lg space-y-4"
                    >
                        <img
                            src={favorite.cover_photo}
                            alt={favorite.title}
                            className="w-full h-[200px] object-cover rounded-xl"
                        />
                        <h2 className="text-xl font-semibold text-[#222222]">{favorite.title}</h2>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleNavigateToManga(favorite.mangaId)}
                                className="px-6 py-2.5 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors"
                            >
                                View Manga
                            </button>
                            <button
                                onClick={() => removeFavorite(favorite.mangaId)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
