import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminPanel,
    toggleStatus,
} from "../store/actions/adminPanelActions";
import BackgroundPanelImg from "../assets/images/BackgroundPanel.jpg"

function AdminPanel() {
    const dispatch = useDispatch();
    const { teams, authors, loading, error } = useSelector((state) => state.adminPanel);
    const [activeTab, setActiveTab] = useState("companies");

    useEffect(() => {
        dispatch(fetchAdminPanel());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    const handleToggle = async (id, type) => {
        try {
            const result = await dispatch(toggleStatus({ id, type })).unwrap();
            await dispatch(fetchAdminPanel());
        } catch (err) {
            console.error('Error toggling status:', err);
        }
    };

    const TableHeader = () => (
        <div className="flex flex-row items-center w-full h-[53px] border-b border-[#4338CA] bg-[#F9F9FC]">
            <button
                onClick={() => setActiveTab("companies")}
                className={`flex-1 h-full font-bold text-base md:text-xl ${activeTab === "companies" ? "bg-[#4338CA] text-white" : "text-[#4338CA]"
                    }`}
            >
                Companies
            </button>
            <button
                onClick={() => setActiveTab("authors")}
                className={`flex-1 h-full font-bold text-base md:text-xl ${activeTab === "authors" ? "bg-[#4338CA] text-white" : "text-[#4338CA]"
                    }`}
            >
                Authors
            </button>
        </div>
    );

    const ToggleButton = ({ isActive, onChange }) => (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isActive}
                onChange={onChange}
            />
            <div className={`w-[24px] h-[14px] rounded-[30px] relative ${isActive ? 'bg-[#4338CA]' : 'bg-[#E5E7EB]'}`}>
                <div className={`absolute w-[10px] h-[10px] bg-white rounded-full top-[2px] transition-all duration-200
                   ${isActive ? 'left-[12px]' : 'left-[2px]'}`}
                />
            </div>
        </label>
    );

    return (
        <div className="relative bg-[#EBEBEB] min-h-screen w-full pb-[200px]">
            <div className="relative h-[300px] md:h-[721px] w-full">
                <img
                    src={BackgroundPanelImg}
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                    <h1 className="text-white text-4xl md:text-[64px] font-semibold font-roboto">
                        Panel
                    </h1>
                </div>
            </div>

            <div className="relative -mt-20 mx-4 md:mx-auto max-w-7xl bg-white shadow-lg rounded-[16px] p-4 md:p-8 mb-8">
                <div className="flex flex-col items-center">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-[32px] font-bold text-[#4338CA] text-center">
                            Entities
                            <div className="w-[60px] md:w-[109px] h-0 mt-2 border-[4px] border-[#4338CA] mx-auto" />
                        </h2>
                    </div>

                    <div className="w-full max-w-[777px] bg-white border border-[rgba(0,0,0,0.1)] shadow-[4px_5px_8px_-1px_rgba(0,0,0,0.03)] rounded-[5px]">
                        <TableHeader />
                        <div className="max-h-[400px] overflow-y-auto">
                            {activeTab === "companies" ? (
                                teams?.map(team => (
                                    <div key={team.id} className="flex flex-col md:flex-row items-start md:items-center p-4 md:p-2 border-b border-[#EEEEF2] bg-[#F9F9FC] space-y-2 md:space-y-0">
                                        <div className="flex items-center gap-2 w-full md:w-[220px] md:pl-[20px]">
                                            <img
                                                src={team.photo}
                                                alt={team.name}
                                                className="w-[25px] h-[25px] rounded-full object-cover flex-shrink-0"
                                            />
                                            <span className="text-sm md:text-base text-[#484964]">{team.name}</span>
                                        </div>
                                        <div className="w-full md:w-[243.5px] md:pl-[20px] text-sm md:text-base text-[#484964]">
                                            {team.website}
                                        </div>
                                        <div className="w-full md:w-[243.5px] md:pl-[20px] text-sm md:text-base text-[#484964] truncate">
                                            {team.description}
                                        </div>
                                        <div className="w-full md:w-[70px] flex justify-start md:justify-center">
                                            <ToggleButton
                                                isActive={team.isActive || false}
                                                onChange={() => handleToggle(team.id, 'company')}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                authors?.map(author => (
                                    <div key={author.id} className="flex flex-col md:flex-row items-start md:items-center p-4 md:p-2 border-b border-[#EEEEF2] bg-[#F9F9FC] space-y-2 md:space-y-0">
                                        <div className="flex items-center gap-2 w-full md:w-[220px] md:pl-[20px]">
                                            <img
                                                src={author.avatar}
                                                alt={`${author.name} ${author.lastName}`}
                                                className="w-[25px] h-[25px] rounded-full object-cover flex-shrink-0"
                                            />
                                            <span className="text-sm md:text-base text-[#484964]">{`${author.name} ${author.lastName || ''}`}</span>
                                        </div>
                                        <div className="w-full md:w-[195px] md:pl-[54px] text-sm md:text-base text-[#484964]">
                                            {new Date(author.date).toLocaleDateString('es-ES')}
                                        </div>
                                        <div className="w-full md:w-[97px] md:pl-[11px] text-sm md:text-base text-[#484964]">
                                            {author.city}
                                        </div>
                                        <div className="w-full md:w-[195px] md:pl-[67.5px] text-sm md:text-base text-[#484964]">
                                            {author.country}
                                        </div>
                                        <div className="w-full md:w-[70px] flex justify-start md:justify-center">
                                            <ToggleButton
                                                isActive={author.isActive || false}
                                                onChange={() => handleToggle(author.id, 'author')}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;