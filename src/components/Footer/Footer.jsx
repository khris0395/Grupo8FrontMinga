import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="relative overflow-x-hidden w-full">
            {/* Contenedor de la imagen y la curva */}
            <div className="relative">
                {/* Imagen de fondo */}
                <div className="w-full h-[200px]">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/fcce/6712/353a5270e91eeb0d409a11fa6f598267?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IwS5A6iz-YJmkm7H1o8Xxl8AWB5CCGojk2a1w6D6obNW4z5Y71XKDBo~o6rI8y9jZBtxYVKVGQlkxAh842gqwEL~00d1QSo5mH9uI87IWaxQIIEdVjWd2-zyoNVzKBThlmG~OR3Sj-v9xUM17a2DLbiLktMORW4x3S1FAwdEcUjePpb4rbyevYrzWRy3EnalgW5hBq4vrRuIW4gDC34q2n4jKVjpjTlYz2NMgjvjHh0XvFzZQUluykS2e6PRWA1FdClvfWHOJQ9IPn-LStxUddI29glRnHmAHBS~4NYUXYDsp3W-PyaM-M~JeDGpLUeT~rcl1sfBDPvdm5rJXlXF~Q__"
                        alt="Footer Banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Curva blanca */}
                <div className="absolute w-full bottom-0">
                    <svg viewBox="0 0 1440 160" className="w-full h-24 block" preserveAspectRatio="none">
                        <path
                            d="M0,160 L1440,160 L1440,0 C1040,100 400,100 0,0 Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>

            {/* Contenido del footer */}
            <div className="bg-white">
                <div className="max-w-[1200px] mx-auto px-4 py-8 flex justify-between items-center">
                    {/* Links */}
                    <div className="flex gap-8">
                        <Link to="/" className="text-black">Home</Link>
                        <Link to="/mangas" className="text-black">Mangas</Link>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="https://s3-alpha-sig.figma.com/img/9459/009f/2d9d5cb548675533c3d48e332a694b5a?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cnNf-POFHBBNf1RnAwQAox-EGKHwzmimIpp-leCWLaWqUD8vnztcSSI3f2p6bUFQmqbj~9ALB~AtvHXi38fjCbw5XB4YPIp0AWMpSXLI9GO2tKRKhH-5vWwA2C2yTyyAKcHhzg83-7KoRwoiX1L33VI8UN0GqV~KBPDl2CApEa2aPKRqECP2hXfZzBGL83-O9~KY32Cpo6sNuo56UjcP-GhWrVbk6kx9ZcQdopazwPpsmmbh1bEmOoI6FJUYW0zssqY9AuPuHGt6D394NbXBbWW0LycBfus6o~w6zcr7-1LczAun7xqrcOxNX6WKZp71ZDqPSw~CfKr698Qm8CRukA__" alt="Minga Logo" className="h-8" />
                    </div>

                    {/* Redes sociales y botón */}
                    <div className="flex items-center gap-8">
                        <div className="flex gap-6">
                            <a href="#"><i className="fab fa-facebook text-black"></i></a>
                            <a href="#"><i className="fab fa-twitter text-black"></i></a>
                            <a href="#"><i className="fab fa-vimeo-v text-black"></i></a>
                            <a href="#"><i className="fab fa-youtube text-black"></i></a>
                        </div>
                        <button className="bg-[#4338CA] text-white px-6 py-2 rounded-full flex items-center gap-2">
                            Donate <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;