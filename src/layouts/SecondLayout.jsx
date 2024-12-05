import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function SecondLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="relative z-10">
                <Navbar />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default SecondLayout