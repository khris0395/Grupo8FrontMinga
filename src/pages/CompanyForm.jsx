import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createCompany } from '../store/actions/companyActions'
import { findCompany, updateRole } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom'
import registro2Img from "../assets/images/registros2.jpg"



const CompanyForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, token } = useSelector((state) => state.authStore);
    const { loading, error, successMessage } = useSelector((state) => state.company) || {};

    const [formData, setFormData] = useState({
        name: '',
        website: '',
        description: '',
        photo: '',
        user_id: "",
        active: true
    })

    useEffect(() => {
        if (user && user._id) {
            setFormData((prevData) => ({
                ...prevData,
                user_id: user._id,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form data before dispatch:", formData);

        try {
            
            await dispatch(
                createCompany({
                    companyData: formData,
                    token,
                })
            ).unwrap();

            if (user && user._id) {

                console.log("entrando a role");
                
                await dispatch(
                    updateRole({
                        userId: user._id,
                        role: 2,
                        token,
                    })
                ).unwrap();

                let user_id= user._id


                await dispatch(findCompany({user_id, token})).unwrap()
            }

            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Background Image */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{
                    backgroundImage: `url(${registro2Img})`,
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