import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminPanel,
    toggleStatus,
} from "../store/actions/adminPanelActions";

function AdminPanel() {
    const dispatch = useDispatch();
    const { teams, authors, loading, error } = useSelector(
        (state) => state.adminPanel
    );
    const [activeTab, setActiveTab] = useState("companies");

    useEffect(() => {
        dispatch(fetchAdminPanel());
    }, [dispatch]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                Error: {error}
            </div>
        </div>
    );

    const handleToggleStatus = async (id, type) => {
        try {
            await dispatch(toggleStatus({ id, type })).unwrap();
            dispatch(fetchAdminPanel());
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const renderCompanies = () => (
        <div>
            {teams.map((team) => (
                <div
                    key={team.id}
                    className="grid grid-cols-12 sm:grid-cols-12 items-center p-4 border-t border-gray-100"
                >
                    <div className="col-span-1">
                        <img
                            src={team.photo}
                            alt={team.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                    <div className="col-span-3">{team.name}</div>
                    <div className="col-span-4 text-gray-500 text-sm">
                        {team.website}
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-500 truncate">
                            {team.description}
                        </p>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={team.isActive}
                                onChange={() => handleToggleStatus(team.id, 'company')}
                            />
                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderAuthors = () => (
        <div>
            {authors.map((author) => (
                <div
                    key={author.id}
                    className="grid grid-cols-12 sm:grid-cols-12 items-center p-4 border-t border-gray-100"
                >
                    <div className="col-span-1">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                    <div className="col-span-3">
                        {author.name} {author.lastName}
                    </div>
                    <div className="col-span-4 text-gray-500 text-sm">
                        {author.city}, {author.country}
                    </div>
                    <div className="col-span-2 text-gray-500 text-sm">
                        {new Date(author.date).toLocaleDateString()}
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={author.isActive}
                                onChange={() => handleToggleStatus(author.id, 'author')}
                            />
                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative">
            <div className="relative">
                <div className="w-full">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/ca8a/5039/085206b8c835b5fa5af23f8414bac827?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XBguAgknSY1d-7qSJOpJALqTQeEnRGOES5JSsXbrZa21DhqLawbI1sgfgQFMZBpVE9vClEu22YiX5-0YRFR~O7zCBMC5L0zPFXiUYct1gkVp2rI3iKOG7grZ052ROTPEBXRBXc4CjkzOB~HehvzCm~0cBx1b1QvAm99MVzFBmppFmVlWfi6gOrKIn2UlyRcWnRtcRqw7SNKyTEmXom9SPdk2gdMrwdCpugQ76arucInVFXkT5tScNJgOYs3ZczjqKOCXqjCt8SpE9LM42o-JXatL-oElLcxJTUFzC~AJb0h3plIXReELHEkHW-i91MVRyj9Pw3mR4JRlXYu3P5KDrg__"
                        alt="Admin Background"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">
                    <h1 className="text-white text-4xl font-bold mb-8">Panel</h1>
                </div>
            </div>

            <div className="w-full h-full mx-auto mt-3 sm:mt-5 -translate-y-24 bg-gray-300 flex justify-center items-center">
                <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl overflow-hidden">
                    <h2 className="text-indigo-600 text-2xl font-semibold text-center my-8">
                        Entities
                        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-2"></div>
                    </h2>

                    <div className="max-w-4xl mx-auto border rounded-lg overflow-hidden overflow-x-auto">
                        <div className="grid grid-cols-2">
                            <button
                                onClick={() => setActiveTab("companies")}
                                className={`py-4 text-center transition-colors ${activeTab === "companies"
                                        ? "bg-indigo-600 text-white"
                                        : "text-indigo-600 bg-gray-50"
                                    }`}
                            >
                                Companies
                            </button>
                            <button
                                onClick={() => setActiveTab("authors")}
                                className={`py-4 text-center transition-colors ${activeTab === "authors"
                                        ? "bg-indigo-600 text-white"
                                        : "text-indigo-600 bg-gray-50"
                                    }`}
                            >
                                Authors
                            </button>
                        </div>

                        {activeTab === "companies" ? renderCompanies() : renderAuthors()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;