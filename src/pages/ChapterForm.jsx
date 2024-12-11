import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createChapter } from '../store/actions/edithChapterActions'
import { useParams } from 'react-router-dom'

const ChapterForm = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const chapterState = useSelector((state) => state.chapter) || {}
    const loading = chapterState.loading || false
    const [formData, setFormData] = useState({
        manga_id: id, // viene de la URL
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
        e.preventDefault();

        if (formData.title.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Title',
                text: 'Title must have at least 3 characters'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `
                <strong>Title:</strong> ${formData.title} <br/>
                <strong>Order:</strong> ${formData.order} <br/>
                <strong>Pages:</strong> ${formData.pages.join(', ')} <br/>
                <strong>Cover Photo:<img src="${formData.cover_photo}" alt="Cover Photo" style="width: 100%; max-height: 200px; object-fit: contain;" /> </strong> 
                <p>Are you sure you want to create this chapter?</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await dispatch(createChapter(formData)).unwrap(); // Utilizar unwrap para manejar errores

                Swal.fire({
                    icon: 'success',
                    title: 'Chapter Created!',
                    text: 'The chapter was successfully created!',
                    showConfirmButton: true
                });

                setFormData({
                    manga_id: id,
                    title: '',
                    order: '',
                    pages: [],
                    cover_photo: ''
                });
            } catch (err) {
                // Manejar los errores desde el backend
                const errorMessage = Array.isArray(err.message)
                    ? err.message.join(', ')
                    : err.message;

                Swal.fire({
                    icon: 'error',
                    title: 'Error Creating Chapter',
                    text: errorMessage || 'Something went wrong. Please try again.'
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cancelled',
                text: 'The chapter was not created.'
            });
        }
    };



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

   
    )
}

export default ChapterForm