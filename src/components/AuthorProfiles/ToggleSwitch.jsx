import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isNew, setIsNew] = useState(true);

  const toggleSwitch = () => setIsNew(!isNew);

  return (
    <div className="flex items-center space-x-4">
      {/* Etiqueta "new" */}
      <span className={`text-sm font-medium ${isNew ? "text-gray-800" : "text-gray-400"}`}>
        new
      </span>

      {/* Toggle */}
      <div
        className={`w-14 h-8 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer ${
          isNew ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
            isNew ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>

      {/* Etiqueta "old" */}
      <span className={`text-sm font-medium ${!isNew ? "text-gray-800" : "text-gray-400"}`}>
        old
      </span>
    </div>
  );
};

export default ToggleSwitch;
