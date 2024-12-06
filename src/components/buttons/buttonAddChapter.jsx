import { useNavigate } from "react-router-dom"

export default function ButtonAddChapter() {
    const navigate = useNavigate()

    function detailsManga(id) {
        // navigate(`/MangaDetails/${id}`)
    }

    return (
        <button className="mt-3 px-4 py-2 bg-yellow-200 text-yellow-800 text-sm font-semibold rounded-full hover:bg-yellow-300 w-20" onClick={() => detailsManga(manga._id)}>
            Edit
        </button>
    )
}