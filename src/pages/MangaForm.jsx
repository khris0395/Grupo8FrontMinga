import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createManga } from '../store/actions/mangaActions';
import { useNavigate, useParams } from 'react-router-dom';
import { getManagerProfile } from '../store/actions/managerActions';

function NewManga() {
    const dispatch = useDispatch();
    const mangaStore = useSelector((state) => state.mangaStore);
    const { profile, mangas, role } = useSelector((state) => state.manager)

    const { loading, error } = mangaStore || {};
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        creator_id: profile._id, // id de author o company
        creator_type: role, // tipo de rol 
        title: '', //titilo del manda
        cover_photo: '', //foto del manga
        description: '', //descripcion del manga
        category_id: '' // categoria al que pertecenece el manga
    });
    console.log('esto se va enviar: ', formData);
    useEffect(() => {
        dispatch(getManagerProfile())
    }, [dispatch])

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Esto se va a enviar: ', formData);

    // Mostrar alerta de confirmación antes de enviar
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to create the manga "${formData.title}". Please confirm.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
        try {
            // Enviar datos al backend
            dispatch(createManga(formData));
            setSuccessMessage('Manga successfully created!');
            
            // Mostrar alerta de éxito
             Swal.fire({
                title: 'Manga Created!',
                text: `The manga "${formData.title}" was successfully created.`,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });

            // Restablecer formulario
            setFormData({
                creator_id: profile._id, // id de author o company
                creator_type: role, // tipo de rol 
                title: '', // título del manga
                cover_photo: '', // foto del manga
                description: '', // descripción del manga
                category_id: '' // categoría al que pertenece el manga
            });
        } catch (err) {
            console.error('Error creating manga:', err);

            // Mostrar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while creating the manga. Please try again.',
                icon: 'error'
            });
        }
    } else {
        // Alerta cuando el usuario cancela la operación
        Swal.fire({
            title: 'Cancelled',
            text: 'The manga creation was cancelled.',
            icon: 'info'
        });
    }
};


    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#EBEBEB] flex flex-col items-center pt-20">
            <h1 className="text-3xl font-bold mb-16">New Manga</h1>


            <form onSubmit={handleSubmit} className="w-full max-w-md px-4 space-y-8">
                <div>
                    <input
                        type="text"
                        placeholder="Insert title"
                        className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <select
                        className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none appearance-none"
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        required
                    >
                        <option value="">Insert category</option>
                        <option value="67551cb4236f01c0e94d6764">Shonen</option>
                        <option value="67551cb4236f01c0e94d6762">Shoujo</option>
                        <option value="67551cb4236f01c0e94d6763">Seinen</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Insert cover photo URL"
                        className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        value={formData.cover_photo}
                        onChange={(e) => setFormData({ ...formData, cover_photo: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Insert description"
                        className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#4338CA] text-white rounded-full hover:bg-opacity-90 transition-all mt-12"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
}

export default NewManga;