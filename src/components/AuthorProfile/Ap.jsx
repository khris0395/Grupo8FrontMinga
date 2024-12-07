import React from "react";

const UserProfile = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            
            {/* Cards Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                    {
                        title: "Komi Can't Communicate",
                        image: "https://via.placeholder.com/100", // Imagen de ejemplo
                    },
                    {
                        title: "Boruto",
                        image: "https://via.placeholder.com/100",
                    },
                    {
                        title: "Evangelion",
                        image: "https://via.placeholder.com/100",
                    },
                    {
                        title: "Kaguya-sama: Love is war",
                        image: "https://via.placeholder.com/100",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow rounded-lg p-2 flex flex-col items-center space-y-2"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-24 sm:h-32 md:h-36 lg:h-40 rounded-lg object-cover"
                        />
                        <p className="text-sm font-medium text-gray-700 text-center">{item.title}</p>
                    </div>
                ))}
            </div>

            {/* Manage Button */}
            <div className="mt-6">
                <button className="w-full bg-indigo-500 text-white py-2 rounded-lg shadow hover:bg-indigo-600">
                    Manage!
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
