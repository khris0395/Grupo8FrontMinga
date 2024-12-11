import { useNavigate } from "react-router-dom"

export default function ButtonEditManga(mangaId) {
    
    const navigate = useNavigate()

    function editManga(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to edit this manga!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica para editar el manga
                navigate(`/editChapter/${id}`)
                
            }
        });
    }
    

    return (
        <button className="mt-3 px-4 py-2 bg-purple-200 text-purple-800 text-sm font-semibold rounded-full hover:bg-purple-300 w-20" onClick={() => editManga(mangaId.mangaId)}>
            Edit
        </button>
    )
}