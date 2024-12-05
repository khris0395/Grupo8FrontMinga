import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 w-full z-20 bg-transparent">
            <div className="w-full">
                <div className="flex justify-between items-center h-16 px-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-[#4338CA]">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link to="/" className="flex items-center">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/9459/009f/2d9d5cb548675533c3d48e332a694b5a?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cnNf-POFHBBNf1RnAwQAox-EGKHwzmimIpp-leCWLaWqUD8vnztcSSI3f2p6bUFQmqbj~9ALB~AtvHXi38fjCbw5XB4YPIp0AWMpSXLI9GO2tKRKhH-5vWwA2C2yTyyAKcHhzg83-7KoRwoiX1L33VI8UN0GqV~KBPDl2CApEa2aPKRqECP2hXfZzBGL83-O9~KY32Cpo6sNuo56UjcP-GhWrVbk6kx9ZcQdopazwPpsmmbh1bEmOoI6FJUYW0zssqY9AuPuHGt6D394NbXBbWW0LycBfus6o~w6zcr7-1LczAun7xqrcOxNX6WKZp71ZDqPSw~CfKr698Qm8CRukA__"
                            alt="Minga Logo"
                            className="h-8"
                        />
                    </Link>
                </div>

                {isOpen && (
                    <div className="fixed top-0 left-0 w-full md:w-64 h-full bg-[#4338CA]">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-8">
                                <img
                                    src="https://i.pravatar.cc/150"
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <p className="text-white flex-1">mail@gmail.com</p>
                                <button onClick={() => setIsOpen(false)} className="text-white">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                <Link to="/" className="bg-white text-[#4338CA] py-4 px-6 rounded-lg text-xl">
                                    Home
                                </Link>
                                <Link to="/signUp" className="text-white text-xl px-6">
                                    Register
                                </Link>
                                <Link to="/signIn" className="text-white text-xl px-6">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;