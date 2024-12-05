import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createAuthor } from '../store/actions/authorActions'

const AuthorForm = () => {
    const dispatch = useDispatch()
    const authorState = useSelector((state) => state.author) || {}
    const loading = authorState.loading || false
    const error = authorState.error
    const createSuccess = authorState.createSuccess

    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        city_country: '',
        date: '',
        photo: '',
        user_id: "674e8d017de330968c59d918", // TODO: Este ID vendrá del autor seleccionado cuando se implemente la autenticación
        active: true
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await dispatch(createAuthor(formData))
            setSuccessMessage('Author successfully created!')
            setFormData({
                name: '',
                last_name: '',
                city_country: '',
                date: '',
                photo: '',
                user_id: "674e8d017de330968c59d918",// TODO: Este ID vendrá del autor seleccionado cuando se implemente la autenticación
                active: true
            })
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        } catch (err) {
            console.error('Error creating author:', err)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <div className="w-full md:max-w-md">
                {/* Título */}
                <h1 className="text-4xl text-center mb-12 font-roboto font-normal text-[#222222]">
                    New Author
                </h1>

                <div className="flex flex-col items-center gap-8">
                    {/* Profile Image Circle */}
                    <div className="w-[100px] h-[105px] relative">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/1f46/b78f/285f261e619b3b7253ad628c64f0acc5?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iLKdnvNOvZ1Ef7nA1GjyEaGlwe-yQSSOZpKx~O3GXlUUMERzl3ZU3yiaX927p3h4FQhUOMKnoda1GniRqS84LThpPoxozoLx3gyStafMuyBhMv9vUlFhfZgw1afGJ9LNtGc4HlN5TUo1q-GxFZafoDyHO~L5yWyeQLakrXs0MUPH9Vc1jXzy1hZsjkkSMtbeZ9kJ1I04ZL-tR1rrFXOrs3zB8EJJRo88hu~fuRVfoAk63k9cS~fT9UZY5gjb-ETPTB0WiqRMr34kdzOR-a0eekiwzT9GtU~oOiGJruvJdtbtKFtBP90~~F1qzJcOd4HtMYgd3T-z9qme2QjwUgs3QQ__"
                            alt="Profile default"
                            className="absolute w-[88px] h-[88px] left-[6px] top-[6px] object-cover rounded-[50px]"
                        />
                    </div>

                    {successMessage && (
                        <div className="w-full text-center bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full max-w-[280px] flex flex-col gap-7">
                        <input
                            type="text"
                            name="name"
                            placeholder="Insert name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Insert last name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                        />

                        <input
                            type="text"
                            name="city_country"
                            placeholder="Insert city and country"
                            value={formData.city_country}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                        />

                        <input
                            type="date"
                            name="date"
                            placeholder="Insert birth date"
                            value={formData.date}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                        />

                        <input
                            type="text"
                            name="photo"
                            placeholder="Insert profile image URL"
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[68px] bg-[#4338CA] rounded-[50000px] text-white font-bold text-[24px] leading-[28px] flex justify-center items-center mt-8"
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthorForm