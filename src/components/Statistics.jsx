import React from "react";

function Statistics({ manga }) {

  return (
    <div className="w-4/5 flex text-center justify-around bg-white shadow-md rounded-lg p-4 mt-6">
      <p className="text-sm grow text-gray-500 mb-2">Rating: 4.5/5</p>
      <p className="text-sm border-slate-300 border-l border-r grow text-gray-500 mb-2">Chapters: {manga.chapters?.length || 0}</p>
      <p className="text-sm grow text-gray-500">language: english</p>
    </div>
  );
}

export default Statistics;
