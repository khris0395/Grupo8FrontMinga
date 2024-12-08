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
        user_id: "674a404d2c593fb14a0d09af",
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
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Background Image */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cd7b/cfec/c07083cef0707bd5864b287bac613f2b?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Aa72~qaQ-Re8JBUPxzkxXnEmKnF~Nksubt4JQlzlSyaNzCKI0yOFHb4M3jaIdNjawWVO7VvkTsBWhTN03z4KsmZA8WhV2jMxWVM2PJAnD0piJN30WPlc~QnVykKFP4CwvEbbwihCfqj9VoAAHWocAqPpcZDmnlZvtbifXp5LaI6iv8fUVn5-MuCjlzaYt1mRYVISghahbU3i2vVtbPt5V7gYm5Kq6vJX4et7u36v8lwqsnUviMfvNVJlj3t1c8l6vYcPmsBFDMzEU~6r3HAvc-IIchLyEBooDoJHVTy9IaK2pFeS-Gwe3nW6UApCQiKHRAitgbRjVrp7MqrZqRXw4g__')`,
                    filter: "brightness(0.6) saturate(1.5) sepia(0.7) hue-rotate(220deg)"
                }}
            />

            {/* Right side - Form */}
            <div className="bg-[#EBEBEB] flex flex-col items-center pt-20">
                <div className="w-full max-w-md px-4">
                    <h1 className="text-3xl font-bold mb-4">New Company</h1>
                    <p className="text-gray-600 mb-12">
                        Create a new company profile. Fill in the details below.
                    </p>

                    {/* Profile Image Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="text-center bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg mb-8">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="website"
                            placeholder="Website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="photo"
                            placeholder="URL Profile Image"
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

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
        </main>
    )
}

export default CompanyForm