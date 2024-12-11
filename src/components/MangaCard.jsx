import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../store/actions/mangaActions.js"
import React, { useEffect } from "react";
import ButtonReadManga from "./buttons/buttonReadManga.jsx";
import ButtonEditManga from "./buttons/ButtonEditManga.jsx";
import ButtonDeleteManga from "./buttons/ButtonDeleteManga.jsx";
import ButtonAddChapter from "./buttons/ButtonAddChapter.jsx";
import ButtonEdit2Manga from "./buttons/buttonEdit2Manga.jsx";
import { get_categories, setSelectedCategories } from "../store/actions/categoryActions.js";
import imgNotFound from '../assets/images/noResulsFoundimg.jpg'
import ButtonAddManga from "./buttons/buttonAddManga.jsx";

export default function MangaCard({ mangas, isManager, profile }) {
    const dispatch = useDispatch(); // Necesario para despachar la acción
    const { loading, search, error } = useSelector((state) => state.mangas)
    const { categories, categorySelet } = useSelector((state) => state.categories)
    
    console.log('data prop: ', profile);
    
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
        <div className="w-full h-full mx-auto mt-3 -translate-y-24  bg-gray-300 flex justify-center items-center">

            <div className="w-11/12 bg-white h-full px-4 mx-4 -translate-y-12 rounded-xl flex flex-col justify-around items-center">

                <div className="flex justify-around   py-3 w-full">
                    <div className="flex flex-wrap gap-4 py-3 w-full">
                    {categories.map((category, index) => (
                        <label
                            key={index}
                            className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category.bg}   ${category.text}  ${category.hover} ${category.checked} `}
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
                    <div className="flex justify-center items-center">
                       { isManager && <ButtonAddManga profile={profile} />}
                    </div>
                </div>

                <div className="flex justify-center items-center flex-wrap">
                    {error && <div className="error-message">{error}</div>}
                    {loading && filteredMangas.length === 0 ? <img
                        className="w-screen h-60 object-cover p-5" 
                        src="https://i.pinimg.com/736x/e2/23/8a/e2238a219d32d5407855d0e33066599c.jpg" 
                        alt="loading" /> : filteredMangas.length === 0 && !loading ? <img
                            className="w-screen h-96 object-center object-cover p-5"
                            src={imgNotFound}
                            alt="notFound" />
                        : filteredMangas.map((manga, index) => (

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
                                            <ButtonDeleteManga mangaId={manga._id} isEditChapter={false} />

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