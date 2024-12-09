import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchReactions } from "../store/actions/mangaActions";


export default function Manager() {

    const dispatch = useDispatch();
    const { reaction } = useSelector((state) => state.mangas)


    useEffect(() => {
        dispatch(fetchReactions())
    }, [dispatch])

    console.log(reaction);
    

    return (
        <>
            <div className="min-h-screen relative">
                {/* Contenedor de la imagen con posición relativa */}
                <div className="relative">
                    {/* Imagen de fondo */}
                    <div className="w-full h-screen">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyxAb8N79rL9NSkepNcxqeXuYtfih-IS1wST3CCQu7z~hYQmYxziuJ~7Cp1IVxXsHUlUIuBk9RfDZ-OlKLupLMgv5nW7Mln34gFAiytq4ldsghnB7vx5iyx2N1xhrdHw9DoFkRlqeui8ABraxf16c1SjbmAHQsT4CX6UGiDG20GUu6vFhmQRMBybWiDoQvWwSOjMST~DbKuKHCUOm2WGgN5Wud6OVd3P1HUcHHlDsRmZBJIpctgH8yjd9l3ADiSiUjAqheUsoba8vJchCqGByl-1esHW8Serp6dY2G-uj2fuOHv3hYvFcBoKawzkR-fLbFjM4bdpn5vDkZGHHkn-Eg__"
                            alt="Mangas"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Título e input superpuestos */}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center bg-black bg-opacity-50">


                        <div className="my-20">
                            <h1 className="text-white text-4xl font-bold ">Favourites</h1>
                        </div>

                    </div>
                </div>

                {/* Contenido debajo de la imagen */}

                {/* Filtros por categoria*/}
                <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">
                    <h1>hola</h1>
                </div>


            </div>

        </>
    );
}
