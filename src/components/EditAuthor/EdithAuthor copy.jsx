import React, { useState } from "react";
import './EdithAuthor.css'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "Lucas Ezequiel",
    lastname: "Silva",
    city: "Caseros, Buenos Aires",
    birthdate: "28/12/2022",
    profileImage: "https://s3-alpha-sig.figma.com/img/d771/e8ee/4d516f000e29670bda6ceb5a6c836183?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eLwYCN-8mR4Gid6w2ArEj9XNZ6~SkEYnz-44vxHXmD0sVFWCopHO-AS0ILvEg6QDmhi9~yFMorE8l2gN7Nx8FsQ85JGguAVYJCHccKR-68oAA6t5L53hh-Wqxax1fnNNBVk2SKmzbLcpMLdwDMmNgAUbtJQX~KrVRwpTjRa1YvTbsUx-MvzFXLLdhLBcaEcQjTuHnfG70gTotrQmr5TWRK1cjcFlRfjGeW44g4Q3mV01JXvsbLoGY8umEiX-5~MeEhA9CytZnDBnA5R~KvBsQKo8CbdRDlJQTJkwGFAWGwXkSeDWdFw9woVhKymqDQ3JRoe~aoSDkUuSOCjKiaJSyQ__", // Imagen por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
    console.log("Saved data:", formData);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted.");
      console.log("Account deleted.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Section (Visible only on large screens) */}
      <div
        className="hidden md:block bg-cover bg-center h-64 relative"
        style={{ backgroundImage: "url('https://s3-alpha-sig.figma.com/img/10b2/d5ee/20210b0eea83b4ff7cf04e7d9e72c1a2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NK823jbakqxJ4VAwfZgCsQQt-aRhdKMwp65SMiVSLkGTgB~sPwtwJj~j78wYc7nHw1F0Q7DxN3tIYcojpUCr2tqdEk21fJLQNmK7TwYeDTjXfOLS361su3033WsKOylILzA8DOtvjQU9Bq3xuYKnwdMqiDWdm6YSq9YTMS8D3r6jZbKXZgen3af9JxpjgMzxB-lLNGCgL817~4Zak~2fMJsKSWb264wJXr7q4uOx1DtSCYHqs1qPi4JFY4fwsw9iPksACL9iPW0YEtWXn2Nzy9DYTRFp8VOVU~u9v1E0CQzvikTjTp~9k3WpJV353y~l1mxB45HKhxJU1TxaCsUm~A__')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Profile</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto md:-mt-16 relative bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Profile Image for Small Screens */}
        <div className="block md:hidden flex justify-center mb-4 mt-16">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <div className="mb-4">
            
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder=""
              className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="text"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              placeholder="Birth Date"
              className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
            />
          </div>
          <div className="mb-6">
            
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="URL Profile Image"
              className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none text-gray-700 py-2"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded-md mb-4 hover:bg-green-600 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-300 text-red-700 py-2 rounded-md hover:bg-red-400 transition duration-200"
          >
            Delete Account
          </button>
        </div>

        {/* Profile Display Section for Large Screens */}
        <div className="hidden md:flex flex-1 flex-col items-center mt-40">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg mb-4"
          />
          <h2 className="text-xl font-bold">{`${formData.firstname} ${formData.lastname}`}</h2>
          <p className="text-gray-600 mb-2">
            <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
            {formData.city}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-calendar-alt text-gray-400 mr-2"></i>
            {formData.birthdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
