import { useNavigate } from "react-router-dom"

export default function ButtonEditManga(mangaId) {
    const navigate = useNavigate()

    function editManga(id) {
         navigate(`/editChapter/ ${id}`)
    }

    return (
        <button className="mt-3 px-4 py-2 bg-purple-200 text-purple-800 text-sm font-semibold rounded-full hover:bg-purple-300 w-20" onClick={() => editManga(mangaId.mangaId)}>
            Edit
        </button>
    )
}