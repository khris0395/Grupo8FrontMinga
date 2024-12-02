    import React from "react";
    
    function EditChapter(){

        return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Contenedor Principal */}
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex">
        {/* Formulario (Izquierda) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Chapter</h2>
          <form className="space-y-4 min-h-min">
            {/* Campo: Nombre del Manga */}
            <div>
              <label
                htmlFor="mangaName"
                className="block text-sm font-medium text-gray-700"
              >
                Name of the manga
              </label>
              <input
                type="text"
                id="mangaName"
                placeholder="Enter manga name"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Campo: Seleccionar Capítulo */}
            <div>
              <label
                htmlFor="chapterSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select chapter
              </label>
              <select
                id="chapterSelect"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Choose a chapter</option>
                <option value="1">Chapter 1</option>
                <option value="2">Chapter 2</option>
                {/* Agrega más opciones si es necesario */}
              </select>
            </div>

            {/* Campo: Seleccionar Dato */}
            <div>
              <label
                htmlFor="dataSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select data
              </label>
              <select
                id="dataSelect"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Choose data</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
                {/* Agrega más opciones si es necesario */}
              </select>
            </div>

            {/* Campo: Dato a Editar */}
            <div>
              <label
                htmlFor="editData"
                className="block text-sm font-medium text-gray-700"
              >
                Data to edit
              </label>
              <input
                type="text"
                id="editData"
                placeholder="Enter new data"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col space-y-4 items-center">
                <button
                    type="submit"
                    className="px-6 py-2 text-2xl bg-green-400 text-white rounded-3xl hover:bg-green-600 w-1/2 h-14"
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="px-6 py-2 text-2xl bg-red-400 text-white rounded-3xl hover:bg-red-600 w-1/2 h-14"
                >
                    Delete
                </button>
                </div>

          </form>
        </div>

        {/* Vista Previa (Derecha) */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <img
            src="/naruto-cover.jpg"
            alt="Naruto Cover"
            className="w-64 h-auto shadow-lg rounded-md"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            Chapter #1 - Discover the Word
          </h3>
          <p className="text-sm text-gray-600">Masashi Kishimoto, Volume 1</p>
        </div>
      </div>
    </div>
        )

}

export default EditChapter