import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createChapter } from '../store/actions/edithChapterActions'

const ChapterForm = () => {
    const dispatch = useDispatch()
    const chapterState = useSelector((state) => state.chapter) || {}
    const loading = chapterState.loading || false
    const error = chapterState.error

    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        manga_id: "674a4ad09bfc2a1b87eea87d", // id del manga 
        title: '',
        order: '',
        pages: [],
        cover_photo: ''
    })

    const handleChange = (e) => {
        if (e.target.name === 'pages') {
            const pagesArray = e.target.value.split(',').map(page => page.trim())
            setFormData({
                ...formData,
                pages: pagesArray
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.title.length < 3) {
            alert('Title must have at least 3 characters')
            return
        }

        try {
            await dispatch(createChapter(formData))
            setSuccessMessage('Chapter successfully created!')
            setFormData({
                manga_id: "674a4ad09bfc2a1b87eea87d", // id del manga
                title: '',
                order: '',
                pages: [],
                cover_photo: ''
            })
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        } catch (err) {
            console.error('Error creating chapter:', err)
        }
    }

    return (
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Form */}
            <div className="bg-[#EBEBEB] flex flex-col items-center pt-20">
                <div className="w-full max-w-md px-4">
                    <h1 className="text-3xl font-bold mb-4">New Chapter</h1>
                    <p className="text-gray-600 mb-12">
                        Create a new chapter for your manga. Fill in the details below.
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
                                name="title"
                                placeholder="Insert title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                name="order"
                                placeholder="Insert order"
                                value={formData.order}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="pages"
                                placeholder="Insert pages (comma-separated)"
                                value={formData.pages.join(', ')}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="cover_photo"
                                placeholder="Insert cover photo URL"
                                value={formData.cover_photo}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#4338CA] text-white rounded-full hover:bg-opacity-90 transition-all mt-12"
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
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
    )
}

export default ChapterForm