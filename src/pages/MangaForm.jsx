import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createManga } from '../store/actions/mangaActions';

function NewManga() {
    const dispatch = useDispatch();
    const mangaStore = useSelector((state) => state.mangaStore);
    const { loading, error } = mangaStore || {};

    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        cover_photo: '',
        description: '',
        author_id: '674a404f2c593fb14a0d09b4', // Cambiado de author a author_id viene de la creación de la autor
        company_id: '674a404f2c593fb14a0d09b6' // Cambiado de company a company_id viene de la creación de la company
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(createManga(formData));
            setSuccessMessage('Manga successfully created!');
            setFormData({
                title: '',
                category_id: '',
                cover_photo: '',
                description: '',
                author_id: '674a404f2c593fb14a0d09b4', // Cambiado de author a author_id viene de la creación de la autor
                company_id: '674a404f2c593fb14a0d09b6' // Cambiado de company a company_id viene de la creación de la company
            });

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            console.error('Error creating manga:', err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#EBEBEB] flex flex-col items-center pt-20">
            <h1 className="text-3xl font-bold mb-16">New Manga</h1>

            {successMessage && (
                <div className="w-full max-w-md text-center bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg mb-8">
                    {successMessage}
                </div>
            )}

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
                        <option value="674a404f2c593fb14a0d09b7">Shonen</option>
                        <option value="674a404f2c593fb14a0d09b8">Shoujo</option>
                        <option value="674a404f2c593fb14a0d09b9">Seinen</option>
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