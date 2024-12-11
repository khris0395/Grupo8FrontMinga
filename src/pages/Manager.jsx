import { useDispatch, useSelector } from "react-redux";
import MangaCard from "../components/MangaCard";
import { useEffect } from "react";
import { getManagerProfile } from "../store/actions/managerActions";
import { useNavigate } from "react-router-dom";
import managerImg from "../assets/images/manager.jpg"


export default function Manager() {

    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {profile, mangas, role, loading, error} = useSelector((state) => state.manager)

    useEffect(() => {
        if(!token){
            navigate('/Signin')
        }
        dispatch(getManagerProfile())
    },[dispatch])
    
    useEffect

    return (
        <>
            <div className="min-h-screen relative">
                {/* Contenedor de la imagen con posición relativa */}
                <div className="relative">
                    {/* Imagen de fondo */}
                    <div className="w-full h-screen">
                        <img
                            src={managerImg}
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
               
                <MangaCard mangas={mangas} isManager={true}/>

            </div>
            
        </>
    );
}
