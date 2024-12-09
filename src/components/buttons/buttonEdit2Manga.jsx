import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ButtonEdit2Manga(mangaId) {

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
        <button 
            onClick={() => editManga(mangaId.mangaId) }
            className="w-4 h-4 bg-white text-black border border-black rounded-full flex items-center justify-center shadow-sm hover:bg-gray-200"
        >
            <FaPencilAlt className="w-2 h-2" />
        </button>
    );
}