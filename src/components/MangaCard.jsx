import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../store/actions/mangaActions.js"
import React, { useEffect } from "react";
import ButtonReadManga from "./buttons/buttonReadManga.jsx";
import ButtonEditManga from "./buttons/ButtonEditManga.jsx";
import ButtonDeleteManga from "./buttons/ButtonDeleteManga.jsx";
import ButtonAddChapter from "./buttons/buttonAddChapter.jsx";
import ButtonEdit2Manga from "./buttons/buttonEdit2Manga.jsx";
import { get_categories, setSelectedCategories } from "../store/actions/categoryActions.js";

export default function MangaCard({ mangas, isManager }) {
    const dispatch = useDispatch(); // Necesario para despachar la acción
    const { loading, search, error } = useSelector((state) => state.mangas)
    const { categories, categorySelet } = useSelector((state) => state.categories)


    // Cambiar las categorías seleccionadas
    const handleCategoryChange = (category) => {
        const newCategories = categorySelet.includes(category)
            ? categorySelet.filter(cat => cat !== category)
            : [...categorySelet, category];

        dispatch(setSelectedCategories(newCategories));
    }

    const filteredMangas = categorySelet.length === 0
        ? mangas // Si no hay categorías seleccionadas, muestra todos los mangas.
        : mangas.filter(manga =>
            categorySelet.some(category => manga.category_id.name.includes(category))
        );

    useEffect(() => {
        // Despachar la acción fetchMangas
        dispatch(fetchMangas(search));
        dispatch(get_categories())
    }, [dispatch, search]); // Dependencia de dispatch, esto asegura que se ejecute solo una vez
    if (!mangas) return null;
    return (
        <div className="w-full h-full mx-auto mt-5 -translate-y-24  bg-gray-300 flex justify-center items-center">

            <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">

                <div className="flex flex-wrap gap-4 justify-start  my-3 w-full">
                    {categories.map((category, index) => (
                        <label
                            key={index}
                            className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all select-none duration-300 ${category.bg}   ${category.text}  ${category.hover} ${category.checked} `}
                        >
                            <input
                                type="checkbox"
                                onChange={() => handleCategoryChange(category.name)}
                                value={category.name}
                                className='hidden'
                            />
                            {category.name}
                        </label>
                    ))}
                </div>

                <div className="flex justify-center items-center flex-wrap">
                    {error && <div className="error-message">{error}</div>}
                    {loading && filteredMangas.length === 0 ? <div className="loading-indicator">Loading...</div> : filteredMangas.length === 0 && !loading ? <p>No mangas found for this author/company.</p> : filteredMangas.map((manga, index) => (

                        <div className="w-full h-44  mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm" key={index}>


                            {/* Contenido de la tarjeta */}

                            <div className={`p-4 w-2/3 border-l-4 ${manga.category_id.border}`}>
                                <div className="flex gap-4">
                                    {isManager && <ButtonAddChapter mangaId={manga._id} />}
                                    {isManager && <ButtonEdit2Manga mangaId={manga._id}></ButtonEdit2Manga>}
                                </div>

                                <h3 className="text-lg mb-3 font-bold text-gray-800">{manga.title}</h3>
                                <p className={`text-sm ${manga.category_id.text}`}>{manga.category_id.name}</p>
                                {/* Si es Manager, mostrar botones adicionales */}
                                {isManager ? (
                                    <>
                                        <ButtonEditManga mangaId={manga._id} />
                                        <ButtonDeleteManga mangaId={manga._id} />

                                    </>
                                ) : (
                                    <ButtonReadManga mangaId={manga._id} bgColor={manga.category_id.bg} textColor={manga.category_id.text} hover={manga.category_id.hover} />
                                )}
                            </div>
                            {/* Imagen del Manga */}

                            <div className="w-2/3 relative">
                                <img
                                    src={manga.cover_photo ? manga.cover_photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo79b2l7teWYiI5GuEHf1XohsdANW1y5X9jA&s'}
                                    alt={manga.title}
                                    className="object-cover rounded-l-full w-full h-auto"
                                />
                            </div>
                        </div>

                    ))
                    }


                </div>
            </div>
        </div>
    );
}