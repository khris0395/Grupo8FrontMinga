import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthor, updateAuthor, deleteAuthor } from "../../store/actions/edithAuthorAction";
import ToggleSwitch from "./ToggleSwitch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import EdithAuthor from "../../pages/EditAuthor"



const AuthorProfiles = () => {

    const userl = useSelector((state) => state.authors.authors); // Accede al usuario desde Redux
    const userId = userl[0]?._id;
    
   
    const { id } = useParams();
    const dispatch = useDispatch();

    const author = useSelector((state) => state.editAuthor.data);
    const status = useSelector((state) => state.editAuthor.loading);
    const error = useSelector((state) => state.editAuthor.error);


    useEffect(() => {
        if (id) {
            dispatch(fetchAuthor(id));
        }
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        city: "",
        date: "",
        photo: "https://via.placeholder.com/100",
    });

    useEffect(() => {
        if (author) {
            setFormData({
                name: author.name || "",
                last_name: author.last_name || "",
                city: author.city || "",
                date: author.date || "",
                photo: author.photo || "",
            });
        }
    }, [author]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedAuthor = {
            ...formData,
            id: author._id,
        };
        dispatch(updateAuthor(updatedAuthor));
    };

    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            dispatch(deleteAuthor(author._id));
            navigate("/")
        }
    };
    const formattedDate = formData.date ? format(new Date(formData.date), "yyyy-MM-dd") : "N/A";
    return (
        <>
            <div className="mt-[98px]  flex container ">

                {/* Content Section */}
                <div className="flex-grow flex items-center justify-evenly">

                    <div className=" flex items-center justify-center bg-white gap-8">

                        <div className="flex justify-center items-center">
                            <img
                                src={formData.photo}
                                alt="Profile"
                                className="w-[71px] h-[71px] rounded-full"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center ">
                            <div>

                                <h2 className="text-xl font-bold">{`${formData.name} ${formData.last_name}`}</h2>

                                <div className="font-roboto flex items-center  ">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.7712 10.6046C10.2494 11.1263 9.25189 12.1239 8.41377 12.962C7.63273 13.743 6.36723 13.7431 5.58618 12.962C4.76379 12.1396 3.78304 11.1589 3.22872 10.6046C1.14593 8.52177 1.14593 5.14489 3.22872 3.0621C5.31152 0.979301 8.6884 0.979301 10.7712 3.0621C12.854 5.14489 12.854 8.52177 10.7712 10.6046Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.99996 6.83333C8.99996 7.9379 8.10453 8.83333 6.99996 8.83333C5.89539 8.83333 4.99996 7.9379 4.99996 6.83333C4.99996 5.72876 5.89539 4.83333 6.99996 4.83333C8.10453 4.83333 8.99996 5.72876 8.99996 6.83333Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="ml-1">
                                        {formData.city}</span>
                                </div>

                                <div className="font-roboto flex items-center">
                                    <svg width="14" height="15" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.75 12.1594C15.3578 12.1594 14.9656 12.2729 14.625 12.5C13.9438 12.9542 13.0562 12.9542 12.375 12.5C11.6938 12.0458 10.8062 12.0458 10.125 12.5C9.44375 12.9542 8.55625 12.9542 7.875 12.5C7.19375 12.0458 6.30625 12.0458 5.625 12.5C4.94375 12.9542 4.05625 12.9542 3.375 12.5C3.03438 12.2729 2.64219 12.1594 2.25 12.1594M6.75 5V6.5M9 5V6.5M11.25 5V6.5M6.75 2.75H6.7575M9 2.75H9.0075M11.25 2.75H11.2575M15.75 16.25V11C15.75 10.1716 15.0784 9.5 14.25 9.5H3.75C2.92157 9.5 2.25 10.1716 2.25 11V16.25H15.75ZM13.5 9.5V8C13.5 7.17157 12.8284 6.5 12 6.5H6C5.17157 6.5 4.5 7.17157 4.5 8V9.5H13.5Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    


                                    <span className="ml-1">
                                        {formattedDate}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="flex justify-center items-center">
                        <Link to={`/editAuthor`}>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 5.5H6C4.89543 5.5 4 6.39543 4 7.5V18.5C4 19.6046 4.89543 20.5 6 20.5H17C18.1046 20.5 19 19.6046 19 18.5V13.5M17.5858 4.08579C18.3668 3.30474 19.6332 3.30474 20.4142 4.08579C21.1953 4.86683 21.1953 6.13316 20.4142 6.91421L11.8284 15.5H9L9 12.6716L17.5858 4.08579Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Link>
                        </div>

                    </div>

                </div>

            </div>

            <div className="flex justify-center mt-[61px]">
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

export default AuthorProfiles;