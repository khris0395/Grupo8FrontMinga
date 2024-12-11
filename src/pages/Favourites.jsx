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









// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Favorites = () => {
//     const [favorites, setFavorites] = useState([]);
//     const navigate = useNavigate();

//     // Cargar favoritos desde localStorage
//     useEffect(() => {
//         const savedFavorites = JSON.parse(localStorage.getItem("userReactions") || "[]");
//         const favoriteMangas = savedFavorites.filter((fav) => fav.reaccion === 'liked' || fav.reaccion === 'love');
//         setFavorites(favoriteMangas);
//     }, []);

//     const handleNavigateToManga = (mangaId) => {
//         navigate(`/manga/${mangaId}`);
//     };

//     const removeFavorite = (mangaId) => {
//         const updatedFavorites = favorites.filter((fav) => fav.mangaId !== mangaId);
//         setFavorites(updatedFavorites);

//         // Actualizar localStorage
//         localStorage.setItem("userReactions", JSON.stringify(updatedReactions));
//     };

//     if (favorites.length === 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-gray-500 text-lg font-medium">
//                     You don't have any favorites yet. Start exploring!
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen">
//             {/* Contenedor principal con imagen de fondo */}
//             <div className="relative w-full h-64">
//                 <img
//                     src="https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyxAb8N79rL9NSkepNcxqeXuYtfih-IS1wST3CCQu7z~hYQmYxziuJ~7Cp1IVxXsHUlUIuBk9RfDZ-OlKLupLMgv5nW7Mln34gFAiytq4ldsghnB7vx5iyx2N1xhrdHw9DoFkRlqeui8ABraxf16c1SjbmAHQsT4CX6UGiDG20GUu6vFhmQRMBybWiDoQvWwSOjMST~DbKuKHCUOm2WGgN5Wud6OVd3P1HUcHHlDsRmZBJIpctgH8yjd9l3ADiSiUjAqheUsoba8vJchCqGByl-1esHW8Serp6dY2G-uj2fuOHv3hYvFcBoKawzkR-fLbFjM4bdpn5vDkZGHHkn-Eg__"
//                     alt="Favourites Background"
//                     className="w-full h-full object-cover object-center"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <h1 className="text-white text-4xl font-bold">Favorites</h1>
//                 </div>
//             </div>

//             {/* Contenedor de cards */}
//             <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {favorites.map((favorite) => (
//                     <div
//                         key={favorite.mangaId}
//                         className="relative bg-white shadow-md rounded-lg overflow-hidden"
//                     >
//                         {/* Botón para eliminar */}
//                         <button
//                             onClick={() => removeFavorite(favorite.mangaId)}
//                             className="absolute top-2 left-2 text-black w-8 h-8 flex items-center justify-center rounded-full hover:text-gray-400 transition"
//                             title="Remove from Favorites"
//                         >
//                             ⊗
//                         </button>

//                         {/* Imagen */}
//                         <img
//                             src={favorite.cover_photo}
//                             alt={favorite.title}
//                             className="w-full h-48 object-cover"
//                         />

//                         {/* Contenido de la card */}
//                         <div className="p-4 flex flex-col">
//                             <h2 className="text-lg font-semibold">{favorite.title}</h2>
//                             <button
//                                 onClick={() => handleNavigateToManga(favorite.mangaId)}
//                                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                             >
//                                 View Details
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Favorites;

















// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";


// // const Favorites = () => {
// //     const [favorites, setFavorites] = useState([]);
// //     const navigate = useNavigate();


// //     useEffect(() => {
// //         const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
// //         setFavorites(savedFavorites);
// //     }, []);

// //     const handleNavigateToManga = (mangaId) => {
// //         navigate(`/manga/${mangaId}`);
// //     };

// //     const removeFavorite = (mangaId) => {
// //         const updatedFavorites = favorites.filter((fav) => fav.mangaId !== mangaId);
// //         setFavorites(updatedFavorites);

// //         // Actualizar localStorage
// //         localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
// //     };


// //     if (favorites.length === 0) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center">
// //                 <p className="text-gray-500 text-lg font-medium">
// //                     You don't have any favorites yet. Start exploring!
// //                 </p>
// //             </div>
// //         );
// //     }

// //     return (
// //         <>
// //             <div className="min-h-screen relative">
// //                 {/* Contenedor de la imagen con posición relativa */}
// //                 <div className="relative">
// //                     {/* Imagen de fondo */}
// //                     <div className="w-full h-screen">
// //                         <img
// //                             src="https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyxAb8N79rL9NSkepNcxqeXuYtfih-IS1wST3CCQu7z~hYQmYxziuJ~7Cp1IVxXsHUlUIuBk9RfDZ-OlKLupLMgv5nW7Mln34gFAiytq4ldsghnB7vx5iyx2N1xhrdHw9DoFkRlqeui8ABraxf16c1SjbmAHQsT4CX6UGiDG20GUu6vFhmQRMBybWiDoQvWwSOjMST~DbKuKHCUOm2WGgN5Wud6OVd3P1HUcHHlDsRmZBJIpctgH8yjd9l3ADiSiUjAqheUsoba8vJchCqGByl-1esHW8Serp6dY2G-uj2fuOHv3hYvFcBoKawzkR-fLbFjM4bdpn5vDkZGHHkn-Eg__"
// //                             alt="Mangas"
// //                             className="w-full h-full object-cover object-center"
// //                         />
// //                     </div>

// //                     {/* Título e input superpuestos */}
// //                     <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center bg-black bg-opacity-50">


// //                         <div className="my-20">
// //                             <h1 className="text-white text-4xl font-bold ">Favourites</h1>
// //                         </div>

// //                     </div>
// //                 </div>

// //                 <div className="flex justify-center items-center flex-wrap">
// //                     <div className="w-full h-40  mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm">


// //                         {/* Contenido de la tarjeta */}

// //                         <div className={`p-4 w-2/3 border-l-4`}>

// //                         {favorites.map((favorite) => (
// //                                 <div
// //                                 key={favorite.mangaId}
// //                                     className="relative bg-white shadow-lg rounded-lg overflow-hidden"
// //                                 >
// //                                     {/* Botón para eliminar de favoritos */}
// //                                     <button
// //                                         onClick={() => removeFavorite(favorite.mangaId)}
// //                                         className="absolute top-2 left-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
// //                                         title="Remove from Favorites"
// //                                     >
// //                                         &times;
// //                                     </button>

// //                                     {/* Imagen del manga */}
// //                                     <img
// //                                         src={favorite.cover_photo}
// //                                         alt={favorite.title}
// //                                         className="w-full h-48 object-cover"
// //                                     />
// //  <button
// //                                     onClick={() => handleNavigateToManga(favorite.mangaId)}
// //                                     className="mt-4 px-4 py-2 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition"
// //                                 >
// //                                     View Details
// //                                 </button>
// //                                 </div>

// //                             ))}
// //                         </div>




// //                     </div>


// //                 </div>

// //             </div>

// //         </>
// //     )
// // }

// // export default Favorites;
