import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../store/actions/mangaActions.js"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MangaCard() {
    const dispatch = useDispatch(); // Necesario para despachar la acción
    const mangas = useSelector((state) => state.mangas.mangas)
    const loading = useSelector((state) => state.mangas.loading)
    const search = useSelector((state) => state.mangas.search)
    const error = useSelector((state) => state.mangas.error)
    const navigate = useNavigate()

    function detailsManga(id) {
        navigate(`/MangaDetails/${id}`)
    }

    useEffect(() => {
        // Despachar la acción fetchMangas
        dispatch(fetchMangas(search));
    }, [dispatch, search]); // Dependencia de dispatch, esto asegura que se ejecute solo una vez
    return (
        <div className="w-full h-full mx-auto mt-5 -translate-y-24  bg-gray-300 flex justify-center items-center">

            <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">



                <div className="flex justify-center items-center flex-wrap">
                    {error && <div className="error-message">{error}</div>}
                    {loading ? <div className="loading-indicator">Loading...</div> : mangas.map((manga, index) => (

                        <div className="w-full h-40  mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm" key={index}>


                            {/* Contenido de la tarjeta */}

                            <div className="p-4 w-2/3 border-l-4 border-violet-500">

                                <h3 className="text-lg mb-3 font-bold text-gray-800">{manga.title}</h3>
                                <p className="text-sm text-violet-500">Type</p>
                                <button className="mt-3 px-4 py-2 bg-green-200 text-green-800 text-sm font-semibold rounded-full hover:bg-green-300 w-20" onClick={() => detailsManga(manga.id)}>
                                    Read
                                </button>
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