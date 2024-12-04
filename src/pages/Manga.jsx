import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMangaDetails, fetchChapters } from "../store/actions/mangaActions";
import Reactions from "../components/Reactions";
import Statistics from "../components/Statistics";

function Manga() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const loading = useSelector((state) => state.mangas.loading);
    const error = useSelector((state) => state.mangas.error);
    const manga = useSelector((state) => state.mangas.selectedManga);
    const chapters = useSelector((state) => state.mangas.chapters);
    // const chapter = useSelector((state) => state.chapter.fetchChapter);

    const [activeTab, setActiveTab] = useState("description"); // "description" o "chapters"

    useEffect(() => {
        if (id) {
            dispatch(fetchMangaDetails(id));
            dispatch(fetchChapters(id));

            console.log("Dispatching fetchMangaDetails and fetchChapters");
        }
    }, [dispatch, id]);

    if (!manga) {
        return <p>Selecciona un manga para ver más detalles.</p>;
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log("Capítulos disponibles:", chapters);
    return (
        
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col items-center py-10 px-4">
                {/* Información del Manga */}
                <div className="w-4/5 bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={manga.cover_photo} alt={manga.title} className="w-full h-80 object-cover" />
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4 text-center">{manga.title}</h1>
                        <div className="flex flex-row md:m-10 items-center justify-between">
                            <span
                                className="px-4 py-2 bg-green-200 text-green-800 text-sm font-semibold rounded-full w-auto"
                            >
                                {manga.category_id}
                            </span>
                            <p className="text-sm text-gray-500">{manga.author_id}</p>
                        </div>
                        <Reactions mangaId={manga.id} />
                    </div>
                </div>
                {/* Cuadro de estadísticas */}
                <Statistics manga={manga} />

                {/* Botones para cambiar entre Descripción y Capítulos */}
                <div className="flex justify-center mt-4">
                    <button
                        className={`p-3 w-40 sm:w-60 lg:w-80 -mr-10 rounded-full ${activeTab === "description"
                            ? "bg-blue-500 z-10 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setActiveTab("description")}
                    >
                        Manga
                    </button>
                    <button
                        className={`p4 w-40 sm:w-60 lg:w-80 rounded-full ${activeTab === "chapters"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setActiveTab("chapters")}
                    >
                        Chapters
                    </button>
                </div>
                {/* Contenido dinámico */}
                <div className="w-4/5 bg-white shadow-md rounded-lg mt-4 p-6">
                    {activeTab === "description" ? (
                        <p>{manga.description || "No hay descripción disponible."}</p>
                    ) : (
                        <div>
                            {chapters && chapters.length > 0 ? (
                                chapters.map((chapter) => (
                                    <div key={chapter._id} className="flex items-center gap-4 mb-4 border-b pb-2">
                                        <img
                                            src={chapter.cover_photo}
                                            alt={chapter.title}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-bold">{chapter.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {chapter.pages.length} páginas
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay capítulos disponibles.</p>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Manga;
