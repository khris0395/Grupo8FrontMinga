import { useNavigate } from "react-router-dom"

export default function ButtonReadManga(mangaId, bgColor, textColor, hover) {
    const navigate = useNavigate()

    function detailsManga(mangaId) {
        const token = localStorage.getItem('token');
        
        if (!token) {
            Swal.fire({
                title: 'Access Denied!',
                text: 'You need to sign in to view this manga.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Go to Sign In',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Signin'); // Acción si confirma
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'You stayed on this page!', 'error');
                }
            });
    
            return;
        }
    
        navigate(`/Manga/${mangaId}`);
    }
    

    return (
        <button className={`mt-3 px-4 py-2 ${mangaId.bgColor} ${mangaId.textColor} ${mangaId.hover} text-sm font-semibold rounded-full w-20`} onClick={() => detailsManga(mangaId.mangaId)}>
            Read
        </button>
    )
}