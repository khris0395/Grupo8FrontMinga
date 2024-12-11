import { useDispatch } from "react-redux"
import { deleteManga } from "../../store/actions/mangaActions"
import { getManagerProfile } from "../../store/actions/managerActions"
import { deleteChapter, getAllChapters } from "../../store/actions/chapterActions";

export default function ButtonDeleteManga(mangaId, {setFormData}) {
   

    const dispatch = useDispatch()
    function deletedManga(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            background: '#f7f7f7',
            color: '#333',
        }).then((result) => {
            if (result.isConfirmed) {
            
                // Si el usuario confirma, se ejecutan los despachos
                dispatch(deleteManga(id));
                dispatch(getManagerProfile(mangaId.mangaId));

                Swal.fire(
                    'Deleted!',
                    'The manga has been deleted successfully.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your manga is safe :)',
                    'info'
                );
            }
        });
    }
    function deletedChapter(title, id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            background: '#f7f7f7',
            color: '#333',
        }).then((result) => {
            if (result.isConfirmed) {
    
                // Despacha deleteChapter y espera a que termine
                dispatch(deleteChapter(title))
                    .then(() => {
                        // Una vez eliminado el capítulo, actualiza la lista de capítulos
                        dispatch(getAllChapters(id));
    
                        // Despacha getAllChapters y espera a que termine
                        if (typeof setFormData === 'function') {
                            setFormData({
                                mangaName: '',
                                chapter: '',
                                date: '',
                                dataToEdit: ''
                            });
                        } 
                        
                    })
                    .catch((error) => {
                        console.error('Error al eliminar capítulo:', error);
                        Swal.fire(
                            'Error',
                            'There was a problem deleting the chapter.',
                            'error'
                        );
                    });
    
                Swal.fire(
                    'Deleted!',
                    'The chapter has been deleted successfully.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your chapter is safe :)',
                    'info'
                );
            }
        });
    }
    
    

    return (
        < >
            {window.location.href !== `http://localhost:5173/editChapter/${mangaId.mangaId}` ?


                (<button className="mt-3 px-4 py-2 bg-red-200 text-red-800 text-sm font-semibold rounded-full hover:bg-red-300 w-20" onClick={() => deletedManga(mangaId.mangaId)}>
                    Delete
                </button>)
                :
                (<button className="w-full h-[68px] bg-[#FBDDDC] rounded-[50000px] text-[#EE8380] font-bold text-2xl"
                    onClick={() => deletedChapter(mangaId.title, mangaId.mangaId)}>
                    Delete
                </button>)
            }
        </>

    )
}