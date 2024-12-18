import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthor, updateAuthor, deleteAuthor } from "../../store/actions/edithAuthorAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Navbar from '../../components/Navbar/Navbar'
import AuthorProfile from "../../pages/AuthorProfile";
import './EdithAuthor.css'

const EditProfile = () => {

  const userl = useSelector((state) => state.authors.authors); // Accede al usuario desde Redux
  const idpa = userl[0]?._id;

  const { id } = useParams();
  const dispatch = useDispatch()

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
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "date" ? format(new Date(value), "yyyy-MM-dd") : value,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.last_name || !formData.city) {
      alert("Please fill out all required fields.");
      return;
    }
  
    let token = localStorage.getItem("token");
    if (!token){
      alert("No token found. please log in.");
      return;
    }

    dispatch(
      updateAuthor({
        author: {...formData },
        token,
        id,
      }))
      .then((response) => {
        console.log("Payload sent to server:", { ...formData, });
        if (response.meta.requestStatus === "fulfilled") {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile: " + (response.error.message || "Unknown error"));
        }
      })
      .catch((err) => {
        console.error("Error during profile update:", err);
        alert("An error occurred: " + err.message);
      });
  };
  

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteAuthor(id))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            alert("Account deleted successfully.");
            navigate("/"); // Redirige al usuario después de la eliminación
          } else {
            alert("Failed to delete account: " + response.payload);
          }
        });
    }
  };

  const formattedDate = formData.date ? format(new Date(formData.date), "yyyy-MM-dd") : "N/A";


  return (
    <>
      <Navbar menuColor="#4338CA" />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Background Section */}
        <div
          className="hidden md:block bg-cover bg-center h-[50vh] lg:h-[638px] relative"
          style={{ backgroundImage: "url('https://s3-alpha-sig.figma.com/img/10b2/d5ee/20210b0eea83b4ff7cf04e7d9e72c1a2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NK823jbakqxJ4VAwfZgCsQQt-aRhdKMwp65SMiVSLkGTgB~sPwtwJj~j78wYc7nHw1F0Q7DxN3tIYcojpUCr2tqdEk21fJLQNmK7TwYeDTjXfOLS361su3033WsKOylILzA8DOtvjQU9Bq3xuYKnwdMqiDWdm6YSq9YTMS8D3r6jZbKXZgen3af9JxpjgMzxB-lLNGCgL817~4Zak~2fMJsKSWb264wJXr7q4uOx1DtSCYHqs1qPi4JFY4fwsw9iPksACL9iPW0YEtWXn2Nzy9DYTRFp8VOVU~u9v1E0CQzvikTjTp~9k3WpJV353y~l1mxB45HKhxJU1TxaCsUm~A__')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl text-white font-roboto text-[64px] font-bold">Profile</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 md:-mt-[176px] relative bg-white rounded-t-2xl p-8 flex flex-col md:flex-row gap-8">
            {/* Profile Image for Small Screens */}
            <div className="md:hidden flex justify-center mt-8">
              <img
                src={formData.photo}
                alt="Profile"
                className="w-[71px] h-[71px] rounded-full"
              />
            </div>

            {/* Form Section */}
            <div className="lg:p-[30px] lg:w-[437px] lg:mx-auto lg:pt-[54px] lg:pl-[121px]">
              <div className="bg-white lg:w-[377px]  lg:pt-[54px] lg:px-[25px] w-full max-w-md mx-auto p-6 md:p-8">

                <div className="w-full max-w-[280px] lg:p-8">

                  <div className="mb-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="First Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full font-roboto border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full font-roboto border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="w-full font-roboto border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="date"
                      name="date"
                      value={formattedDate}
                      onChange={handleChange}
                      placeholder="Birth Date"
                      required
                      className="w-full font-roboto border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      placeholder="URL Profile Image"
                      required
                      className="w-full font-roboto border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full font-roboto py-5 px-12 bg-[#34D399] text-white rounded-full mb-5"
                  >
                    Save
                  </button>

                  

                  <button
                    onClick={handleDelete}
                    className="w-full font-roboto py-5 px-12 bg-[#FBDDDC] text-[#EE8380] font-bold rounded-full"
                  >
                    Delete Account
                  </button>
                </div>

              </div>
            </div>


            {/* Profile Display Section for Large Screens */}
            <div className="hidden md:flex flex-1 flex-col items-center justify-center">

              <div>
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-[179px] h-[178px] rounded-full border-4 border-gray-100 shadow-lg mb-4"
                />
              </div>


              <div className="flex flex-col items-center justify-center px-[30px] ">
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

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
