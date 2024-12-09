import { useDispatch } from "react-redux"
import { deleteManga } from "../../store/actions/mangaActions"
import { getManagerProfile } from "../../store/actions/managerActions"

export default function ButtonDeleteManga(idManga) {

    const dispatch = useDispatch()
    function deleted(id) {
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
                dispatch(getManagerProfile());
    
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
