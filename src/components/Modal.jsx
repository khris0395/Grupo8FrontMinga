import React from "react";

function Modal({ activeTab, setActiveTab, manga, onClose }) {
  const chapters = manga.chapters || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-4/5 bg-white rounded-lg shadow-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Tabs */}
        <div className="flex justify-around border-b mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "description" ? "text-blue-500 font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Descripción
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "chapters" ? "text-blue-500 font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("chapters")}
          >
            Capítulos
          </button>
        </div>

        {/* Contenido */}
        {activeTab === "description" ? (
          <p>{manga.description || "No hay descripción disponible."}</p>
        ) : (
          <div>
            {chapters.map((chapter) => (
              <div key={chapter.id} className="flex items-center justify-between mb-4">
                <img
                  src={chapter.cover_photo}
                  alt={chapter.title}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-bold">{chapter.title}</h3>
                  <p className="text-sm text-gray-500">{chapter.pages} páginas</p>
                </div>
                <button className="text-blue-500">Comentarios</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Leer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
