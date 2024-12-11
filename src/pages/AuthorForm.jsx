import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAuthor } from '../store/actions/authorActions';
import { findAuthor, updateRole } from '../store/actions/authActions';
import registro3Img from "../assets/images/registros3.jpg"

const AuthorForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.authStore);
    const { loading, error, successMessage } = useSelector((state) => state.author) || {};
  

    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        city_country: '',
        date: '',
        photo: '',
        user_id: '',
        active: true,
    });

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
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            await dispatch(
                createAuthor({
                    authorData: formData,
                    token,
                })
            ).unwrap();

            if (user && user._id) {
              
                await dispatch(
                    updateRole({
                        userId: user._id,
                        role: 1,
                        token,
                    })
                ).unwrap();
                
                let user_id= user._id
                

                await dispatch(findAuthor({user_id, token})).unwrap()
            }

            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <main className="h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Image */}
        <div 
            className="hidden md:block bg-cover bg-center"
            style={{
                backgroundImage: `url(${registro3Img})`,
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
                            src={user.photo}
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