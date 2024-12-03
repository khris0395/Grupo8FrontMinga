import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas, Setsearch } from "../../store/actions/mangaActions";

function Mangas() {
    const dispatch = useDispatch(); // Necesario para despachar la acción
    const mangas = useSelector((state) => state.mangas.mangas)
    const loading = useSelector((state) => state.mangas.loading)
    const search = useSelector((state) => state.mangas.search)
    const error = useSelector((state) => state.mangas.error)

    const inputs =
        [
            { label: 'Todos', bgColor: 'bg-gray-400', textColor: 'text-white' },
            { label: 'Shōnen', bgColor: 'bg-red-200', textColor: 'text-red-600' },
            { label: 'Seinen', bgColor: 'bg-orange-200', textColor: 'text-orange-600' },
            { label: 'Shōjo', bgColor: 'bg-green-200', textColor: 'text-green-600' },
            { label: 'Kodomo', bgColor: 'bg-purple-200', textColor: 'text-purple-600' },
        ]

    const handleTextChange = (e) => {
        dispatch(Setsearch(e.target.value));
        
    };
        console.log(search);

    useEffect(() => {
        // Despachar la acción fetchMangas
        dispatch(fetchMangas(search));
    }, [search]); // Dependencia de dispatch, esto asegura que se ejecute solo una vez

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="min-h-screen relative">
            {/* Contenedor de la imagen con posición relativa */}
            <div className="relative">
                {/* Imagen de fondo */}
                <div className="w-full h-screen">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/f0d0/3e80/2ae29b0afaf84c3dc0f77973947cfb6b?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jM4YzCS2maTpYLKMLSX7l3-HbMuW6kkY3prbqcR2D3X~W4yKcLlQs~O1XgA~DP7X2-6HvXTgmCTdp1ZzChQvLzzWIvki1FjUETKsL6KEoQhs-RuTSWXela6gcgTLsmBVx5sg9wtD585MquSDbR0uuDRgjJFOXrD7cLXhjXCChCV3nLEDw1BRiFr7bV8ZyQ-WXXc41BzB242phZNuOyURY8WRGTiuoeoKrIiT9t0rQJsIp1dPwQIpByamNfMKIvIzF2aKscBdIE2D-5J1pn5RIglF3EkbQurznjo~vWOfvoX8VFEyaCYlbcljHy-IWBFHu0U0M6sy~d~H5ITi3HXG2g__"
                        alt="Mangas"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Título e input superpuestos */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">
                    <div className="my-20">
                        <h1 className="text-white text-4xl font-bold ">Manga</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for manga..."
                        className="my-6 px-4 py-2 w-3/5 bg-white           rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleTextChange}
                    />
                </div>
            </div>

            {/* Contenido debajo de la imagen */}

            <div className="w-full h-full mx-auto mt-5 -translate-y-24  bg-gray-300 flex justify-center items-center">

                <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">

                    <div className="flex gap-4 justify-start ml-40 my-3 w-full">
                        {inputs.map((category, index) => (
                            <label
                                key={index}
                                className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category.bgColor} ${category.textColor}`}
                            >
                                <input
                                    type="checkbox"
                                    name="category"
                                    value={category.label}
                                    className="hidden"
                                />
                                <span>{category.label}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-center items-center flex-wrap">
                        {mangas.map((manga, index) => (

                            <div className="w-full h-40  mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm" key={index}>


                                {/* Contenido de la tarjeta */}

                                <div className="p-4 w-2/3 border-l-4 border-violet-500">

                                    <h3 className="text-lg mb-3 font-bold text-gray-800">{manga.title}</h3>
                                    <p className="text-sm text-violet-500">Type</p>
                                    <button className="mt-3 px-4 py-2 bg-green-200 text-green-800 text-sm font-semibold rounded-full hover:bg-green-300 w-20">
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mangas;
