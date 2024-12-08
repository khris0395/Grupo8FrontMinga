import { useNavigate } from "react-router-dom"

export default function ButtonReadManga(mangaId, bgColor, textColor) {
    const navigate = useNavigate()

    function detailsManga(mangaId) {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/Signin')
            return
        }
        navigate(`/Manga/${mangaId}`)
    }

    return (
        <button className={`mt-3 px-4 py-2 ${mangaId.bgColor} ${mangaId.textColor} text-sm font-semibold rounded-full w-20`} onClick={() => detailsManga(mangaId.mangaId)}>
            Read
        </button>
    )
}