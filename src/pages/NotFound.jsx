import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBEBEB] px-4">
            <div className="max-w-md w-full relative rounded-2xl shadow-lg overflow-hidden">
                {/* Background Image Container */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('https://ih1.redbubble.net/image.930023365.6198/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 space-y-6">
                    {/* Title */}
                    <div className="relative pb-6">
                        <h1 className="text-[#4338CA] text-8xl font-bold text-center font-manga tracking-wider 
                                     drop-shadow-lg">
                            404
                        </h1>
                        <span className="block text-xl text-[#4338CA] font-bold text-center mt-2 
                                       drop-shadow-lg">
                            ページが見つかりません
                        </span>
                        <span className="block text-sm text-gray-900 font-semibold text-center mt-1 
                                       drop-shadow-lg">
                            Page Not Found
                        </span>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 text-center">
                        <p className="text-gray-900 font-semibold drop-shadow-lg">
                            The chapter you're looking for might be in another manga...
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link
                            to="/"
                            className="w-full sm:w-auto text-center px-6 py-2.5 bg-[#4338CA] text-white 
                                     rounded-lg hover:bg-[#382DC2] transition-all duration-300 shadow-lg"
                        >
                            ← Back Home
                        </Link>
                        <Link
                            to="/mangas"
                            className="w-full sm:w-auto text-center px-6 py-2.5 bg-white/80 text-[#4338CA] 
                                     border-2 border-[#4338CA] rounded-lg hover:bg-white transition-all 
                                     duration-300 shadow-lg font-semibold"
                        >
                            Browse Mangas
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;