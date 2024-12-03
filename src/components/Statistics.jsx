import React from "react";

function Statistics({ manga }) {
    
  return (
    <div className="w-4/5 bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-lg font-bold mb-4">Estatistics</h2>
      <p className="text-sm text-gray-500 mb-2">Chapters: {manga.chapters?.length || 0}</p>
      <p className="text-sm text-gray-500 mb-2">Rating: 4.5/5</p>
      <p className="text-sm text-gray-500">language: english</p>
    </div>
  );
}

export default Statistics;
