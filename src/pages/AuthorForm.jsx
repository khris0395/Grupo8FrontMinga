import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createAuthor } from '../store/actions/authorActions'

const AuthorForm = () => {
    const dispatch = useDispatch()
    const authorState = useSelector((state) => state.author) || {}
    const loading = authorState.loading || false
    const error = authorState.error

    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        city_country: '',
        date: '',
        photo: '',
        user_id: "674e8d017de330968c59d918",
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
                user_id: "674e8d017de330968c59d918",
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
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://s3-alpha-sig.figma.com/img/b8b4/c1ca/d91c01d1ff2a1a1341ce3c24609e0349?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqOlUaZrihLOcb8a3YFZ7Ab9cCdJgSozuary8Lfwzg~Qm2qbvbDU7onI-m8Wdue-ZUDzDAUmJ9BbtX6RUVGlUJLA-AZz~32HVTU7TcptrojKmmyc~IA~TEPcBiJP8gUvBfi1bctlKNkVBGklXo4n0gmdvoQwdmOARzm52LnXUUZQ0aXouvrCPWcePVswxYiZGXb36tHY0HccbIPF~SyUNto3ev7kZ1I2SZ4PtmrV2wvPGljVAdz-oGf4F-v0Stw68W2D9j2ycWUCLrwR06bmfID5lbvsWHvMYp7BULmbAqHLjBigaQdqyjOE-TRopZYkpOCjB0bYBsgHHqGxlaA1cg__')`,
                    filter: "brightness(0.6) saturate(1.5) sepia(0.7) hue-rotate(220deg)"
                }}
            />

            {/* Right side - Form */}
            <div className="bg-[#EBEBEB] flex flex-col items-center pt-20">
                <div className="w-full max-w-md px-4">
                    <h1 className="text-3xl font-bold mb-4">New Author</h1>
                    <p className="text-gray-600 mb-12">
                        Create a new author profile. Fill in the details below.
                    </p>

                    {/* Profile Image Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="w-[100px] h-[105px] relative">
                            <img
                                src="https://s3-alpha-sig.figma.com/img/1f46/b78f/285f261e619b3b7253ad628c64f0acc5?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iLKdnvNOvZ1Ef7nA1GjyEaGlwe-yQSSOZpKx~O3GXlUUMERzl3ZU3yiaX927p3h4FQhUOMKnoda1GniRqS84LThpPoxozoLx3gyStafMuyBhMv9vUlFhfZgw1afGJ9LNtGc4HlN5TUo1q-GxFZafoDyHO~L5yWyeQLakrXs0MUPH9Vc1jXzy1hZsjkkSMtbeZ9kJ1I04ZL-tR1rrFXOrs3zB8EJJRo88hu~fuRVfoAk63k9cS~fT9UZY5gjb-ETPTB0WiqRMr34kdzOR-a0eekiwzT9GtU~oOiGJruvJdtbtKFtBP90~~F1qzJcOd4HtMYgd3T-z9qme2QjwUgs3QQ__"
                                alt="Profile default"
                                className="absolute w-[88px] h-[88px] left-[6px] top-[6px] object-cover rounded-[50px]"
                            />
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
                            placeholder="Insert name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Insert last name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="city_country"
                            placeholder="Insert city and country"
                            value={formData.city_country}
                            onChange={handleChange}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="date"
                            name="date"
                            placeholder="Insert birth date"
                            value={formData.date}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none"
                        />

                        <input
                            type="text"
                            name="photo"
                            placeholder="Insert profile image URL"
                            value={formData.photo}
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

export default AuthorForm