function EditAuthor() {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="w-full bg-cover bg-center h-60 bg-[url('https://c.wallhere.com/photos/49/47/manga_anime_games-1950769.jpg!d')]">
          <h1 className="text-white text-4xl font-bold text-center pt-16">Profile</h1>
        </div>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 -translate-y-12 flex flex-col lg:flex-row-reverse items-center">
          <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
            <img
              src="https://i.blogs.es/9f417c/dragon-ball/1366_2000.jpeg"
              alt="User"
              className="rounded-full w-32 h-32 object-cover border-4 border-teal-500"
              onError={(e) => (e.target.src = '/default-user-photo.jpg')}
            />
          </div>
          <div className="lg:w-2/3 w-full">
            <form className="space-y-6">
              {["First Name", "Last Name", "Location", "Date of Birth", "URL Profile Image"].map(
                (field, index) => (
                  <div
                    key={index}
                    className="relative border-b border-gray-300 focus-within:border-teal-500"
                  >
                    <input
                      type={field === "Date of Birth" ? "date" : "text"}
                      id={field.toLowerCase().replace(/ /g, "-")}
                      placeholder=" "
                      className="block w-full appearance-none focus:outline-none bg-transparent focus:ring-0 peer text-gray-800 pt-6 pb-2"
                    />
                    <label
                      htmlFor={field.toLowerCase().replace(/ /g, "-")}
                      className="absolute left-0 text-gray-600 text-lg top-0 transform origin-[0] scale-100 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:translate-y-0 peer-focus:scale-90 peer-focus:text-teal-500 transition-all duration-200"
                    >
                      {field}
                    </label>
                  </div>
                )
              )}
              <button
                type="submit"
                className="w-full bg-teal-400 text-white rounded-lg py-2 mt-4 hover:bg-teal-600"
              >
                Save
              </button>
              <button
                type="button"
                className="w-full bg-red-400 text-white rounded-lg py-2 mt-4 hover:bg-red-600"
                onClick={() => window.confirm("Are you sure you want to delete your account?")}
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default EditAuthor;
  