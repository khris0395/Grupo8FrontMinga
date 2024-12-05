import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createChapter } from '../store/actions/edithChapterActions'

const ChapterForm = () => {
    const dispatch = useDispatch()
    const chapterState = useSelector((state) => state.chapter) || {}
    const loading = chapterState.loading || false
    const error = chapterState.error
    const createSuccess = chapterState.createSuccess

    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        manga_id: "674a4ad09bfc2a1b87eea87d", // TODO: Este ID vendrá del autor seleccionado cuando se implemente la autenticación
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

        console.log('Datos a enviar:', formData)
        try {
            await dispatch(createChapter(formData))
            setSuccessMessage('Chapter successfully created!')
            setFormData({
                manga_id: "674a4ad09bfc2a1b87eea87d",// TODO: Este ID vendrá del autor seleccionado cuando se implemente la autenticación
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
        <div className="relative w-[430px] h-[932px] rounded-[10px] mx-auto">
            {/* Contenedor principal del formulario */}
            <div className="flex flex-col items-center">
                {/* Título */}
                <h1 className="absolute w-[207px] h-[42px] left-[111px] top-[179px] font-roboto font-normal text-[36px] leading-[42px] text-black whitespace-nowrap">
                    New Chapter
                </h1>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="absolute w-[280px] left-[75px] top-[308px] flex flex-col gap-[28px]">
                    {/* Mensaje de éxito */}
                    {successMessage && (
                        <div className="absolute top-[-40px] left-0 right-0 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg text-center">
                            {successMessage}
                        </div>
                    )}

                    {/* Inputs */}
                    <div className="relative h-[23px]">
                        <input
                            type="text"
                            name="title"
                            placeholder="Insert title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="relative h-[23px]">
                        <input
                            type="number"
                            name="order"
                            placeholder="Insert order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="relative h-[23px]">
                        <input
                            type="text"
                            name="pages"
                            placeholder="Insert pages"
                            value={formData.pages.join(', ')}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="relative h-[23px]">
                        <input
                            type="text"
                            name="cover_photo"
                            placeholder="Insert cover photo"
                            value={formData.cover_photo}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none bg-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-[280px] h-[68px] absolute left-0 top-[243px] bg-[#4338CA] rounded-[50000px] text-white font-bold text-2xl flex justify-center items-center"
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChapterForm