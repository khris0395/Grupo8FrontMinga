import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMangaDetails } from "../store/actions/mangaActions";
import Reactions from "../components/Reactions";
import Statistics from "../components/Statistics";
import Modal from "../components/Modal";

function Manga() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const loading = useSelector((state) => state.mangas.loading)
    const error = useSelector((state) => state.mangas.error)
    const manga = useSelector((state) => state.mangas.selectedManga); // Seleccionar manga actual desde Redux

    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("description"); // "description" o "chapters"

    useEffect(() => {
        // Despachar la acción para obtener los detalles del manga cuando el componente se monte
        if (id) {
            dispatch(fetchMangaDetails(id));
        }
    }, [dispatch, id]);

    if (!manga) {
        return <p>Selecciona un manga para ver más detalles.</p>;
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col items-center py-10 px-4">
                {/* Información del Manga */}
                <div className="w-4/5 bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={manga.cover_photo} alt={manga.title} className="w-full h-80 object-cover" />
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">{manga.title}</h1>
                        <p className="text-sm text-gray-500 mb-2">Categoría: {manga.category_id}</p>
                        <p className="text-sm text-gray-500 mb-4">Autor: {manga.author_id}</p>
                        <Reactions mangaId={manga.id} />
                    </div>
                </div>

                {/* Cuadro de estadísticas */}
                <Statistics manga={manga} />

                {/* Botón para abrir el modal */}
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Ver más detalles
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    manga={manga}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default Manga;
