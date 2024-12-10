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

    const handleNavigateToManga = (mangaId) => {
        navigate(`/manga/${mangaId}`);
    };

    const handleRemoveFavorite = (mangaId) => {
        const userReactions = JSON.parse(localStorage.getItem("userReactions") || "{}");
        delete userReactions[mangaId];
        localStorage.setItem("userReactions", JSON.stringify(userReactions));

        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const updatedFavorites = storedFavorites.filter(favorite => favorite.mangaId !== mangaId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        setFavorites(updatedFavorites);
    };

    console.log(favorites);


    if (!favorites.length) {
        return <div className="text-center p-4 mt-24">No favorites yet!</div>;
    }

    return (
        <div className="min-h-screen relative">
            <div className="relative flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold absolute top-60 text-center z-20">Favourites</h1>
            </div>
            <div className="relative">
                <div className="w-full h-screen">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qxbNGaT5-bW02GCx8ckcxSi3jM4pdUPNL~MAyT0wMpdMDd90S9tLm6KHdzYissk0FqHDczvbUF7JdHNh3B49AjnMkTvNV99XG2IH-x-oNdOyb~Petkn~r11VFzoOphhYk1Q6CwMd3OvB4AyVofVPsOM0mx9wBMqgqeuMoWP7dQ1~C9BmeJlAR~gc2Snw91HzSoBPcpQmXdabcZdFyF4K7H7T-7x6tgZK7owzCVs-GKlG~feC6D0YMHImKJ3rbm~KIRLjZ7bkPm2iC1RlfbRWl9GvW0ZpUcpzKOjYinHxkxGXaSO4P4SdvkVMiA~5P9RkZPpLIm~RhCDlo-uMOIGbDg__"
                        alt="Mangas"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                
                <div className="w-full h-full mx-auto mt-5 -translate-y-24 bg-gray-300 flex justify-center items-center">
                    <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">
                        <div className="flex justify-center items-center flex-wrap">

                            {favorites.map((favorite) => (
                                <div
                                    key={favorite.mangaId}
                                    className="w-full h-40 mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm"
                                >
                                    <div className={`p-4 w-2/3 border-l-4 ${favorite.category_id?.text ? `border-${favorite.category_id.text}-500` : 'border-gray-500'}`}>
                                        <h3 className="text-lg mb-3 font-bold text-gray-800">{favorite.title}</h3>
                                    </div>
                                    <div className="w-2/3 relative">
                                        <img
                                            src={favorite.cover_photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo79b2l7teWYiI5GuEHf1XohsdANW1y5X9jA&s'}
                                            alt={favorite.title}
                                            className="object-cover rounded-l-full w-full h-auto"
                                        />
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => handleNavigateToManga(favorite.mangaId)}
                                            className="px-6 py-2.5 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors"
                                        >
                                            View Manga
                                        </button>
                                        <button
                                            onClick={() => handleRemoveFavorite(favorite.mangaId)}
                                            className="px-4 py-2 text-black hover:text-gray-400"
                                        >
                                            ⊗
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
