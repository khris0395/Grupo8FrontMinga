import MangaCard from "../components/MangaCard";
import MangaInputSearch from '../components/MangaInputSearch'



function Mangas() {
    const inputs =
        [
            { label: 'Todos', bgColor: 'bg-gray-400', textColor: 'text-white' },
            { label: 'Shōnen', bgColor: 'bg-red-200', textColor: 'text-red-600' },
            { label: 'Seinen', bgColor: 'bg-orange-200', textColor: 'text-orange-600' },
            { label: 'Shōjo', bgColor: 'bg-green-200', textColor: 'text-green-600' },
            { label: 'Kodomo', bgColor: 'bg-purple-200', textColor: 'text-purple-600' },
        ]

   

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
              <MangaInputSearch/>
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
}

export default Mangas;
