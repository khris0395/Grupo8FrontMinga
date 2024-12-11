import { useNavigate } from "react-router-dom"

export default function ButtonAddChapter(mangaId) {
    const navigate = useNavigate()
    console.log(mangaId.mangaId);
    

    function detailsManga(id) {
         navigate(`/ChapterForm/${id}`)
    }

    return (
        <button
            onClick={() => detailsManga(mangaId.mangaId)}
            className="bg-white hover:bg-gray-200 text-black border border-black font-bold text-sm w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
            +
        </button>

    )
}