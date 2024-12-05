import MangaCard from "../components/MangaCard";


export default function Manager() {
    const inputs =
        [
            { label: 'Todos', bgColor: 'bg-gray-400', textColor: 'text-white' },
            { label: 'Shōnen', bgColor: 'bg-red-200', textColor: 'text-red-600' },
            { label: 'Seinen', bgColor: 'bg-orange-200', textColor: 'text-orange-600' },
            { label: 'Shōjo', bgColor: 'bg-green-200', textColor: 'text-green-600' },
            { label: 'Kodomo', bgColor: 'bg-purple-200', textColor: 'text-purple-600' },
        ]
    return (
        <>
            <div className="min-h-screen relative">
                {/* Contenedor de la imagen con posición relativa */}
                <div className="relative">
                    {/* Imagen de fondo */}
                    <div className="w-full h-screen">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/6fbb/1740/a9480f18c06165fca03fd747dbab2cfe?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lU72pnNByYu1Zg0dlYtQSRHBlOPi-i5ESs5e55zj0a4TUI3tYshxNghwxCcgOWee4p1JE2WGn6zRZ8Fbv4-Tuc8zV2zNOSDckcEqvDoHjHbzwN9xdcDeF1WWzmbjNA3MMK6jnpBi10ZWRpL6Q-YTXCasMq5nvgBfeam82QWUPBgoHvVXz2v7kV3AgKrvlqJaLI2MSVwHEgThxauQGcoPCM9hX5tC3tEejJlMoYRnQw3DpaTGni451x5Q~3XLLVBxHQnokwyhskVQ6NCIAuuFJeIpgqJepDB9om38A9ekEcirEftjd7zXz8lEWC857Tnr3A2g1txqFMHfwHrLM4LAtw__"
                            alt="Mangas"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Título e input superpuestos */}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">


                        <div className="my-20">
                            <h1 className="text-white text-4xl font-bold ">Manga</h1>
                        </div>
                        <h3 className=" text-white">Company Or Author</h3>
                    </div>
                </div>

                {/* Contenido debajo de la imagen */}

                {/* Filtros por categoria*/}
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
                <MangaCard />

            </div>
            );
        </>
    );
}