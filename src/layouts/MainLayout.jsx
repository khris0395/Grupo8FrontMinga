import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col relative">

            <div className="relative z-10">
                <Navbar />
            </div>
            <main className="flex-grow"> {/* Agregar padding-top igual a la altura del navbar */} 
                <Outlet />
            </main>
            {/* El navbar tiene posición absolute y estará encima del contenido */}

            <div>
            <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
