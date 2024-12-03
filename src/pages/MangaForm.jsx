import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { createManga } from '../store/actions/mangaActions'

const MangaForm = () => {
    const dispatch = useDispatch()
    const mangaState = useSelector((state) => state.manga) || {}
    const loading = mangaState.loading || false
    const error = mangaState.error
    const createSuccess = mangaState.createSuccess

    const [formData, setFormData] = useState({
        author_id: "674a4a5ffc126ff778fbbbe8",
        title: '',
        category_id: '',
        cover_photo: '',
        description: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validaciones
        if (formData.title.length < 3) {
            alert('Title must have at least 3 characters')
            return
        }
        if (formData.description.length < 8) {
            alert('Description must have at least 8 characters')
            return
        }

        console.log('Datos a enviar:', formData)
        await dispatch(createManga(formData))
    }

    return (
        <>
            <Navbar menuColor="#4338CA" />
            <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)] mt-[200px] md:mt-[80px] bg-[#FAFCFC]">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center px-4 md:px-0">
                    <h1 className="text-3xl md:text-4xl font-roboto font-normal mb-10 md:mb-20">New Manga</h1>

                    <form onSubmit={handleSubmit} className="w-full max-w-[280px] flex flex-col gap-7">
                        {error && <div className="text-red-500">{error}</div>}
                        {createSuccess && <div className="text-green-500">Manga created successfully!</div>}

                        <input
                            type="text"
                            name="title"
                            placeholder="Insert title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                            minLength={3}
                        />

                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                        >
                            <option value="">Insert category</option>
                            <option value="674a49b12bfb83c9ace71353">Action</option>
                            <option value="674a49b12bfb83c9ace71354">Adventure</option>
                            <option value="674a49b12bfb83c9ace71355">Comedy</option>
                            <option value="674a49b12bfb83c9ace71356">Drama</option>
                        </select>

                        <input
                            type="text"
                            name="cover_photo"
                            placeholder="Insert cover photo"
                            value={formData.cover_photo}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Insert description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                            minLength={8}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[68px] bg-[#4F46E5] rounded-[50000px] text-white font-bold text-2xl mt-8"
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>

                <div className="hidden md:flex w-1/2 h-full flex-col items-center mt-10 md:mt-0">
                    <p className="text-xl font-roboto mb-10">Cover Preview</p>
                    <div className="w-[564px] h-[450px] bg-gray-100 rounded-[5px] drop-shadow-[7px_4px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                        {formData.cover_photo ? (
                            <img
                                src={formData.cover_photo}
                                alt="Cover preview"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <p className="text-gray-400">No image selected</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MangaForm