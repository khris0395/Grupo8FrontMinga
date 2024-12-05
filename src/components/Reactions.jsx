import React, { useState } from "react";

function Reactions({ mangaId }) {
  const [selectedReaction, setSelectedReaction] = useState(null);

  const reactions = [
    { type: "like", label: "👍", bgColor: "bg-blue-500" },
    { type: "dislike", label: "👎", bgColor: "bg-red-500" },
    { type: "surprised", label: "😲", bgColor: "bg-yellow-500" },
    { type: "love", label: "❤️", bgColor: "bg-pink-500" },
  ];

  const handleReaction = (type) => {
    setSelectedReaction(type);
    console.log(`Reacción seleccionada para manga ${mangaId}: ${type}`);
  };

  return (
    <div className="flex gap-4 mt-4 justify-center md:justify-end">
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          className={`p-2 text-white text-2xl rounded-full ${
            selectedReaction === reaction.type ? reaction.bgColor : "bg-gray-300"
          }`}
          onClick={() => handleReaction(reaction.type)}
        >
          {reaction.label}
        </button>
      ))}
    </div>
  );
}

export default Reactions;
