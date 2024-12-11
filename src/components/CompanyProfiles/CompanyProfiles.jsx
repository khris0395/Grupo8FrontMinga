import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { fetchAuthor, updateAuthor, deleteAuthor } from "../../store/actions/edithAuthorAction";
import { fetchCompany } from "../../store/actions/edithCompanyAction"

import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Navbar from '../../components/Navbar/Navbar'
import AuthorProfile from "../../pages/AuthorProfile";
import EdithAuthor from "../../pages/EditAuthor"
import Swal from "sweetalert2";
import ToggleSwitch from "./ToggleSwitch";


const CompanyProfiles = () => {
    const { companyId } = useParams(); // Captura la ID desde la URL
    const dispatch = useDispatch();
    const company = useSelector((state) => state.authStore.user.company); // Ajusta según tu store
    const token = useSelector((state) => state.authStore.token);

    console.log("Token en Redux:", token);
    useEffect(() => {
        if (companyId && token) {
            dispatch(fetchCompany(companyId && token));
        }
    }, [companyId, token, dispatch]);


    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || "",
                website: company.website || "",
                description: company.description || "",
                photo: company.photo || "",
            });
        }
    }, [company]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "date" ? format(new Date(value), "yyyy-MM-dd") : value,
        });
    };


    const [formData, setFormData] = useState({
        name: "Toei Animation",
        description: "Toei Animation Co., Ltd is a Japanese animation studio owned by the Toei Company, Limited...",
        city: "United States",
        website: "https://corp.toei-anim.co.jp/en/index.html",
        profileImage: "https://s3-alpha-sig.figma.com/img/d771/e8ee/4d516f000e29670bda6ceb5a6c836183?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eLwYCN-8mR4Gid6w2ArEj9XNZ6~SkEYnz-44vxHXmD0sVFWCopHO-AS0ILvEg6QDmhi9~yFMorE8l2gN7Nx8FsQ85JGguAVYJCHccKR-68oAA6t5L53hh-Wqxax1fnNNBVk2SKmzbLcpMLdwDMmNgAUbtJQX~KrVRwpTjRa1YvTbsUx-MvzFXLLdhLBcaEcQjTuHnfG70gTotrQmr5TWRK1cjcFlRfjGeW44g4Q3mV01JXvsbLoGY8umEiX-5~MeEhA9CytZnDBnA5R~KvBsQKo8CbdRDlJQTJkwGFAWGwXkSeDWdFw9woVhKymqDQ3JRoe~aoSDkUuSOCjKiaJSyQ__", // Imagen por defecto
    });




    return (
        <>
            <div className="  flex container ">

                {/* Content Section */}
                <div className="flex-grow flex items-center justify-evenly">

                    <div className=" flex flex-col items-center justify-center bg-white gap-8">

                        <div className="flex justify-center items-center">
                            <img
                                src={formData.photo}
                                alt="Profile"
                                className="w-[71px] h-[71px] rounded-full"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center ">
                            <div>
                                <div className="flex gap-[5px] justify-center items-center">
                                    <div>
                                        <div className="flex items-center justify-center gap-[5px]">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.9107 9.66073L14.9652 8.71515C14.8226 8.57265 14.7041 8.40811 14.6139 8.22785L13.7139 6.42775C13.6087 6.21732 13.3282 6.1718 13.1618 6.33817C12.9848 6.5152 12.7257 6.58234 12.485 6.51356L11.4242 6.21049C11.0214 6.09539 10.6033 6.33687 10.5017 6.74333C10.4257 7.04718 10.549 7.36597 10.8095 7.5397L11.2985 7.86566C11.7907 8.19383 11.8597 8.89029 11.4414 9.30862L11.2746 9.47541C11.0988 9.65123 11 9.88968 11 10.1383V10.4807C11 10.8205 10.9076 11.1539 10.7328 11.4453L9.63728 13.2712C9.31946 13.8009 8.74703 14.125 8.1293 14.125C7.64368 14.125 7.25 13.7313 7.25 13.2457V12.2694C7.25 11.5027 6.78322 10.8133 6.07136 10.5285L5.52624 10.3105C4.70812 9.98325 4.22825 9.1305 4.37311 8.26135L4.37897 8.22616C4.41765 7.99413 4.49964 7.77144 4.62066 7.56973L4.69517 7.44555C5.10286 6.76607 5.89368 6.41624 6.67069 6.57164L7.65223 6.76795C8.13113 6.86373 8.60334 6.5758 8.73751 6.1062L8.91125 5.49812C9.03519 5.06434 8.8326 4.6038 8.42909 4.40204L7.875 4.125L7.79917 4.20083C7.44754 4.55246 6.97063 4.75 6.47335 4.75H6.32258C6.11603 4.75 5.91746 4.83254 5.77141 4.97859C5.53519 5.21481 5.17345 5.27423 4.87465 5.12483C4.47027 4.92264 4.32361 4.41899 4.55622 4.03131L5.7328 2.07033C5.8502 1.87467 5.93041 1.66006 5.97044 1.43728M15.9107 9.66073C15.9695 9.28243 16 8.89477 16 8.5C16 4.35786 12.6421 1 8.5 1C7.61236 1 6.76073 1.1542 5.97044 1.43728M15.9107 9.66073C15.3528 13.2517 12.2474 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 5.24551 3.07291 2.47517 5.97044 1.43728" stroke="#9D9D9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <a
                                                className="text-base font-normal font-roboto underline solid text-[#9e9e9e]"
                                                href="{`${formData.website} `}">TOEI ANIMATION</a>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h2 className="text-xl font-normal font-roboto">{`${formData.name} `}</h2>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center ">
                                        <Link to={`/editCompany/:companyId`}>
                                            <svg
                                                width="24"
                                                height="25"
                                                viewBox="0 0 24 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11 5.5H6C4.89543 5.5 4 6.39543 4 7.5V18.5C4 19.6046 4.89543 20.5 6 20.5H17C18.1046 20.5 19 19.6046 19 18.5V13.5M17.5858 4.08579C18.3668 3.30474 19.6332 3.30474 20.4142 4.08579C21.1953 4.86683 21.1953 6.13316 20.4142 6.91421L11.8284 15.5H9L9 12.6716L17.5858 4.08579Z"
                                                    stroke="#9e9e9e"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <h3 className="w-[385px] mt-[16px] text-base font-normal font-roboto text-[#9e9e9e]">{`${formData.description} `}</h3>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="flex justify-center mt-[1px]">
                <div className="h-px w-[385px] bg-black " />
            </div>


            <div className="flex justify-center items-center mt-[17px]">

                <ToggleSwitch />
            </div>

            <div className=" min-h-screen p-4">

                {/* Cards Section */}
                <div className="lg:mx-40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                            className="bg-white rounded-lg p-2 flex flex-col items-center space-y-2"
                        >
                            <div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-[173.87px] h-[273.23px] rounded-lg object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 text-center">{item.title}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Manage Button */}
                <div className="mt-4 flex justify-center">
                    <button className="w-[194.63px] bg-indigo-500 text-white py-2 rounded-[20px] shadow hover:bg-indigo-600">
                        Manage!
                    </button>
                </div>
            </div>


        </>

    );
};

export default CompanyProfiles;