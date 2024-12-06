import { useNavigate } from "react-router-dom"

export default function ButtonReadManga(mangaId) {
    console.log(mangaId);
    
    const navigate = useNavigate()

    function detailsManga(id) {
        navigate(`/MangaDetails/${id}`)
    }

    return (
        <button className="mt-3 px-4 py-2 bg-green-200 text-green-800 text-sm font-semibold rounded-full hover:bg-green-300 w-20" onClick={() => detailsManga(mangaId)}>
            Read
        </button>
    )
}