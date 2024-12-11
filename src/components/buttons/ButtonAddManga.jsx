import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export default function ButtonAddManga(  ) {

    const navigate = useNavigate()

    const goToAddManga = ()=> {
        
        navigate('/MangaForm')
    }
    return (
        <>
           { <button
                className="w-28 bg-gray-200 flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-center hover:bg-gray-300"
                onClick={goToAddManga}>
                Add Manga
            </button>}
        </>
    )
}