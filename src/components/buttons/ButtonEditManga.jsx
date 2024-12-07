import { useNavigate } from "react-router-dom"

export default function ButtonEditManga(manga) {
    const navigate = useNavigate()

    function detailsManga(id) {
        // navigate(`/MangaDetails/${id}`)
    }

    return (
        <button className="mt-3 px-4 py-2 bg-purple-200 text-purple-800 text-sm font-semibold rounded-full hover:bg-purple-300 w-20" onClick={() => detailsManga(manga._id)}>
            Edit
        </button>
    )
}