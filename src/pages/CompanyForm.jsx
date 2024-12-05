import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createCompany } from '../store/actions/companyActions'

const CompanyForm = () => {
    const dispatch = useDispatch()
    const companyState = useSelector((state) => state.company) || {}
    const loading = companyState.loading || false
    const error = companyState.error
    const createSuccess = companyState.createSuccess

    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        photo: '',
        description: '',
        user_id: "674a404d2c593fb14a0d09af", // ID temporal para pruebas
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
            await dispatch(createCompany(formData))
            setSuccessMessage('Company successfully created!')
            setFormData({
                name: '',
                website: '',
                photo: '',
                description: '',
                user_id: "674a404d2c593fb14a0d09af",
                active: true
            })
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        } catch (err) {
            console.error('Error creating company:', err)
        }
    }

    return (
        <div className="relative w-[430px] h-[932px] rounded-[10px] mx-auto">
            <div className="flex flex-col items-center">
                <h1 className="absolute w-[207px] h-[42px] left-[111px] top-[179px] font-roboto font-normal text-[36px] leading-[42px] text-black whitespace-nowrap">
                    New Company
                </h1>

                {/* Profile Image Circle */}
                <div className="absolute top-[240px] left-[175px] w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                </div>

                <form onSubmit={handleSubmit} className="absolute w-[280px] left-[75px] top-[360px] flex flex-col gap-[28px]">
                    {successMessage && (
                        <div className="absolute top-[-40px] left-0 right-0 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg text-center">
                            {successMessage}
                        </div>
                    )}

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                    />

                    <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                    />

                    <input
                        type="text"
                        name="photo"
                        placeholder="URL Profile Image"
                        value={formData.photo}
                        onChange={handleChange}
                        className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full pb-1 border-b border-[#424242] text-[#424242] font-roboto text-[16px] leading-[19px] focus:outline-none bg-transparent"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-[280px] h-[68px] bg-[#4F46E5] rounded-[50000px] text-white font-bold text-2xl mt-8 flex justify-center items-center"
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CompanyForm