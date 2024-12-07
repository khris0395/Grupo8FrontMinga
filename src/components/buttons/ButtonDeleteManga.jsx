import { useNavigate } from "react-router-dom"

export default function ButtonDeleteManga(idManga) {
    
    
    const navigate = useNavigate()

    function detailsManga(idManga) {
        // navigate(`/MangaDetails/${id}`)
        console.log(idManga);
    }

    return (
        <button className="mt-3 px-4 py-2 bg-red-200 text-red-800 text-sm font-semibold rounded-full hover:bg-red-300 w-20" onClick={() => detailsManga(idManga)}>
            Delete
        </button>
    )
}