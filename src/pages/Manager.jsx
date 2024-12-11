import { useDispatch, useSelector } from "react-redux";
import MangaCard from "../components/MangaCard";
import { useEffect } from "react";
import { getManagerProfile } from "../store/actions/managerActions";
import { useNavigate } from "react-router-dom";


export default function Manager() {

    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {profile, mangas, role, loading, error} = useSelector((state) => state.manager)
    console.log('data Redux: ', profile);
    
    

    useEffect(() => {
        if(!token){
            navigate('/Signin')
        }
        dispatch(getManagerProfile())
    },[dispatch])
    

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
                            <h1 className="text-white text-4xl font-bold ">{profile.name}</h1>
                        </div>
                      
                    </div>
                </div>

                {/* Contenido debajo de la imagen */} 

                {/* Filtros por categoria*/}
               
                <MangaCard profile={profile} mangas={mangas} isManager={true}/>

            </div>
        </>
    );
}