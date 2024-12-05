import MangaCard from "../components/MangaCard";

import EdithAuthor from "../components/EditAuthor/EdithAuthor copy";

export default function EditAuthor() {
    return (
        <>
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
            </div>

            {/* Contenido debajo de la imagen */}

            {/* Filtros por categoria*/}
            <div className="flex gap-4 justify-start ml-40 my-3 w-full">
               
            </div>
           <form action="">
            
           </form>

        </div>
            <EdithAuthor />
        </>
    );
}