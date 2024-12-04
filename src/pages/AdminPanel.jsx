import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminPanel,
    toggleStatus,
} from "../store/actions/adminPanelActions";

function AdminPanel() {
    const dispatch = useDispatch();
    const { teams, authors, loading, error } = useSelector((state) => state.adminPanel);
    const [activeTab, setActiveTab] = useState("companies");

    useEffect(() => {
        dispatch(fetchAdminPanel());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    const handleToggle = async (id, type) => {
        try {
            await dispatch(toggleStatus({ id, type })).unwrap();
            dispatch(fetchAdminPanel());
        } catch (err) {
            console.error('Error toggling status:', err);
        }
    };

    const TableHeader = () => (
        <div className="box-border flex flex-row items-center w-[777px] h-[53px] gap-[13px] bg-[#F9F9FC] border-b border-[#4338CA]">
            <button
                onClick={() => setActiveTab("companies")}
                className={`flex justify-center items-center w-[382px] h-[53px] font-roboto font-bold text-[20px] leading-[95.19%] ${activeTab === "companies"
                    ? "bg-[#4338CA] text-white"
                    : "text-[#4338CA]"
                    }`}
            >
                Companies
            </button>
            <button
                onClick={() => setActiveTab("authors")}
                className={`flex justify-center items-center w-[382px] h-[53px] font-roboto font-bold text-[20px] leading-[95.19%] ${activeTab === "authors"
                    ? "bg-[#4338CA] text-white"
                    : "text-[#4338CA]"
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
            <div className="w-[24px] h-[14px] bg-[#4338CA] rounded-[30px] relative">
                <div className={`absolute w-[10px] h-[10px] bg-white rounded-full top-[2px] transition-all duration-200
                   ${isActive ? 'left-[12px]' : 'left-[2px]'}`}
                />
            </div>
        </label>
    );

    const AuthorRow = ({ author }) => {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };

        const fullName = `${author.name} ${author.lastName || ''}`;

        return (
            <div className="flex h-[36px] items-center border-b border-[#EEEEF2] bg-[#F9F9FC]">
                <div className="w-[220px] flex items-center pl-[20px] gap-2">
                    <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                        <img
                            src={author.avatar}
                            alt={fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC41IDExLjVjMCAyLjQ4NS0yLjAxNSA0LjUtNC41IDQuNXMtNC41LTIuMDE1LTQuNS00LjUgMi4wMTUtNC41IDQuNS00LjUgNC41IDIuMDE1IDQuNSA0LjV6bS0yLjE1NyA2LjY2N2MtLjQ4NC0uNDgtMS4xMzctLjc4Mi0xLjg0OC0uNzgyLS43MTQgMC0xLjM3LjMwNS0xLjg1NS43ODhoLTIuMTQyYy0yLjIwNiAwLTQtMS43OTQtNC00di0yLjExM2MwLTIuMjA2IDEuNzk0LTQgNC00aDZjMi4yMDYgMCA0IDEuNzk0IDQgNHYyLjExM2MwIDIuMjA2LTEuNzk0IDQtNCA0aC0uMTU1eiIvPjwvc3ZnPg=='
                            }}
                        />
                    </div>
                    <span className="text-[16px] leading-[16px] text-[#484964] font-roboto">{fullName}</span>
                </div>
                <div className="w-[195px] pl-[54px] text-[16px] leading-[16px] text-[#484964] font-roboto">
                    {formatDate(author.date)}
                </div>
                <div className="w-[97px] pl-[11px] text-[16px] leading-[16px] text-[#484964] font-roboto">
                    {author.city}
                </div>
                <div className="w-[195px] pl-[67.5px] text-[16px] leading-[16px] text-[#484964] font-roboto">
                    {author.country}
                </div>
                <div className="w-[70px] flex justify-center">
                    <ToggleButton
                        isActive={author.isActive}
                        onChange={() => handleToggle(author.id, 'author')}
                    />
                </div>
            </div>
        );
    };

    const CompanyRow = ({ team }) => (
        <div className="flex h-[36px] items-center border-b border-[#EEEEF2] bg-[#F9F9FC]">
            <div className="w-[220px] flex items-center pl-[20px] gap-2">
                <img
                    src={team.photo}
                    alt={team.name}
                    className="w-[25px] h-[25px] rounded-full object-cover"
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC41IDExLjVjMCAyLjQ4NS0yLjAxNSA0LjUtNC41IDQuNXMtNC41LTIuMDE1LTQuNS00LjUgMi4wMTUtNC41IDQuNS00LjUgNC41IDIuMDE1IDQuNSA0LjV6bS0yLjE1NyA2LjY2N2MtLjQ4NC0uNDgtMS4xMzctLjc4Mi0xLjg0OC0uNzgyLS43MTQgMC0xLjM3LjMwNS0xLjg1NS43ODhoLTIuMTQyYy0yLjIwNiAwLTQtMS43OTQtNC00di0yLjExM2MwLTIuMjA2IDEuNzk0LTQgNC00aDZjMi4yMDYgMCA0IDEuNzk0IDQgNHYyLjExM2MwIDIuMjA2LTEuNzk0IDQtNCA0aC0uMTU1eiIvPjwvc3ZnPg=='
                    }}
                />
                <span className="text-[16px] leading-[16px] text-[#484964] font-roboto">{team.name}</span>
            </div>
            <div className="w-[243.5px] pl-[20px] text-[16px] leading-[16px] text-[#484964] font-roboto">{team.website}</div>
            <div className="w-[243.5px] pl-[20px] text-[16px] leading-[16px] text-[#484964] font-roboto truncate">{team.description}</div>
            <div className="w-[70px] flex justify-center">
                <ToggleButton
                    isActive={team.isActive}
                    onChange={() => handleToggle(team.id, 'company')}
                />
            </div>
        </div>
    );

    return (
        <div className="relative w-[1440px] h-[1024px] bg-[#EBEBEB]">
            {/* Banner */}
            <div className="absolute w-[1440px] h-[721px] left-0 top-[-2px]">
                <img
                    src="https://s3-alpha-sig.figma.com/img/ca8a/5039/085206b8c835b5fa5af23f8414bac827?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XBguAgknSY1d-7qSJOpJALqTQeEnRGOES5JSsXbrZa21DhqLawbI1sgfgQFMZBpVE9vClEu22YiX5-0YRFR~O7zCBMC5L0zPFXiUYct1gkVp2rI3iKOG7grZ052ROTPEBXRBXc4CjkzOB~HehvzCm~0cBx1b1QvAm99MVzFBmppFmVlWfi6gOrKIn2UlyRcWnRtcRqw7SNKyTEmXom9SPdk2gdMrwdCpugQ76arucInVFXkT5tScNJgOYs3ZczjqKOCXqjCt8SpE9LM42o-JXatL-oElLcxJTUFzC~AJb0h3plIXReELHEkHW-i91MVRyj9Pw3mR4JRlXYu3P5KDrg__"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                    <h1 className="text-white text-[64px] leading-[95.19%] font-semibold font-roboto">Panel</h1>
                </div>
            </div>

            {/* Panel Principal */}
            <div className="absolute w-[1348px] h-[897px] left-[46px] top-[475px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.05)] rounded-[16px]">
                <div className="absolute w-[955px] h-[388px] left-[197px] top-[94px] flex flex-col items-center">
                    {/* Título Entities */}
                    <div className="mb-8">
                        <h2 className="text-[32px] font-bold font-roboto leading-[38px] text-[#4338CA] text-center">
                            Entities
                            <div className="w-[109px] h-0 mt-2 border-[9px] border-[#4338CA] mx-auto" />
                        </h2>
                    </div>

                    {/* Tabla */}
                    <div className="box-border w-[777px] h-[197px] bg-white border border-[rgba(0,0,0,0.1)] shadow-[4px_5px_8px_-1px_rgba(0,0,0,0.03)] rounded-[5px]">
                        <TableHeader />
                        <div className="w-[777px] h-[144px] overflow-y-auto">
                            {activeTab === "companies"
                                ? teams?.map(team => <CompanyRow key={team.id} team={team} />)
                                : authors?.map(author => <AuthorRow key={author.id} author={author} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;