import { Outlet } from 'react-router-dom'

function SecondLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default SecondLayout