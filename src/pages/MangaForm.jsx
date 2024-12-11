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
        author_id: '674a404f2c593fb14a0d09b4',
        company_id: '674a404f2c593fb14a0d09b6'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createManga(formData));
            setSuccessMessage('Manga successfully created!');
            setFormData({
                title: '',
                category_id: '',
                cover_photo: '',
                description: '',
                author_id: '674a404f2c593fb14a0d09b4',
                company_id: '674a404f2c593fb14a0d09b6'
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            console.error('Error creating manga:', err);
        }
    };

    return (
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Form */}
            <div className="bg-[#EBEBEB] flex flex-col items-center pt-20">
                <div className="w-full max-w-md px-4">
                    <h1 className="text-3xl font-bold mb-4">New Manga</h1>
                    <p className="text-gray-600 mb-12">
                        Share your manga with the community. Fill in the details below to create a new manga entry.
                    </p>

                    {successMessage && (
                        <div className="text-center bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg mb-8">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
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
            </div>

            {/* Right side - Background Image */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://s3-alpha-sig.figma.com/img/5d98/eac1/025f012e94a72840af6fc1f67a349f61?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MtGJF7E0D6~8zP9qJDOh~vl~H-KfvC-43eCh-x0l1DphvRvw-q4VjRKc2pvAyU07MpdMI8DnytXVjzZ2sLz7qxUEJFsWD4pJd3VQqkPJmCr-ucqj2OuyAfiYHd8j7zWEzIm8AqrsMcLVWAsQ9E1juZy3ZGgxL5iJZwG5Neuvn~oU-pdeDLybUkdtBxbWN5-VvYmeeteKMPy9WaRQaByX-g4ieNpvdeCUqZngEkVytLr4tbYBe55HhSMhQGvxwwlXEYfkFT9LRvwVOfkCgum2tY4Ry2S~9lVhZTdjAMc~zXjodSKPWOFHggoN4GrSA-qAkaaGbQi0J2xdcEuop1nJkA__')`,
                    filter: "brightness(0.6) saturate(1.5) sepia(0.7) hue-rotate(220deg)"
                }}
            />
        </main>
    );
}

export default NewManga;