import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas, setSearch } from "../store/actions/mangaActions";
import MangaInputSearch from "../components/MangaInputSearch";
import MangaCard from "../components/MangaCard";
import mangasImg from "../assets/images/mangas.jpg"

function Mangas() {
    const dispatch = useDispatch(); // Necesario para despachar la acción


    const mangas = useSelector((state) => state.mangas.mangas)
    const loading = useSelector((state) => state.mangas.loading)
    const search = useSelector((state) => state.mangas.search)
    const error = useSelector((state) => state.mangas.error)
    


    useEffect(() => {
        // Despachar la acción fetchMangas
        dispatch(fetchMangas(search));
    }, [search]); 
 
    return (
        <div className="min-h-screen relative">
            {/* Contenedor de la imagen con posición relativa */}
            <div className="relative">
                {/* Imagen de fondo */}
                <div className="w-full h-screen">
                    <img
                        src={mangasImg}
                        alt="Mangas"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Título e input superpuestos */}
                <MangaInputSearch></MangaInputSearch>
            </div>

            {/* Contenido debajo de la imagen */}
            <MangaCard mangas={mangas} isManager={false}/>
        </div>
    );
}

export default Mangas;
