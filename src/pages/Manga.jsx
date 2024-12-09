import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchMangaDetails,
    fetchChapters,
    fetchCategories,
    fetchAuthors,
    createReaction
} from "../store/actions/mangaActions";

const getReactionType = (emoji) => {
    switch (emoji) {
        case '👍': return 'liked';
        case '👎': return 'disliked';
        case '😮': return 'surprised';
        case '😍': return 'love';
        default: return 'liked';
    }
};

const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl text-[#424242] font-poppins">{value}</span>
        <span className="text-xs text-[#9D9D9D] font-poppins">{label}</span>
    </div>
);

const TabButton = ({ active, onClick, text }) => (
    <button
        className={`px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 ${active
            ? "bg-[#4338CA] text-white shadow-md"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
        onClick={onClick}
    >
        {text}
    </button>
);

const ReactionButton = ({ emoji, mangaId, onReact, selectedReaction }) => {
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const reactionData = {
                manga_id: mangaId,
                reaccion: getReactionType(emoji)
            };
            await dispatch(createReaction(reactionData)).unwrap();
            onReact(getReactionType(emoji));
        } catch (error) {
            console.error('Error creating reaction:', error);
        }
    };

    const isSelected = selectedReaction === getReactionType(emoji);

    return (
        <button
            onClick={handleClick}
            className={`w-[72px] h-[72px] rounded-full shadow-md border flex items-center justify-center text-4xl
                ${isSelected ? 'bg-[#4338CA] text-white border-[#4338CA]' : 'bg-white border-gray-200'} 
                hover:bg-gray-50 transition-colors duration-300`}
        >
            {emoji}
        </button>
    );
};

function Manga() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("description");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReaction, setSelectedReaction] = useState(() => {
        const savedReactions = JSON.parse(localStorage.getItem('userReactions') || '{}');
        return savedReactions[id] || null;
    });

    const loading = useSelector((state) => state.mangas.loading);
    const error = useSelector((state) => state.mangas.error);
    const manga = useSelector((state) => state.mangas.selectedManga);
    const chapters = useSelector((state) => state.mangas.chapters);
    const categories = useSelector((state) => state.mangas.categories);
    const authors = useSelector((state) => state.mangas.authors);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                if (id) {
                    await Promise.all([
                        dispatch(fetchCategories()),
                        dispatch(fetchAuthors()),
                        dispatch(fetchMangaDetails(id)),
                        dispatch(fetchChapters(id))
                    ]);
                    const savedReactions = JSON.parse(localStorage.getItem('userReactions') || '{}');
                    if (savedReactions[id]) {
                        setSelectedReaction(savedReactions[id]);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [dispatch, id]);

    const handleReaction = async (reactionType) => {
        try {
            const savedReactions = JSON.parse(localStorage.getItem('userReactions') || '{}');
            if (savedReactions[manga._id] === reactionType) {
                delete savedReactions[manga._id];
                setSelectedReaction(null);
            } else {
                savedReactions[manga._id] = reactionType;
                setSelectedReaction(reactionType);
            }
            localStorage.setItem('userReactions', JSON.stringify(savedReactions));
            if (reactionType === 'liked' || reactionType === 'love') {
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const existingIndex = favorites.findIndex(f => f.mangaId === manga._id);

                if (existingIndex === -1) {
                    favorites.push({
                        mangaId: manga._id,
                        title: manga.title,
                        cover_photo: manga.cover_photo,
                        reaccion: reactionType,
                        timestamp: new Date().toISOString()
                    });
                } else {
                    favorites[existingIndex] = {
                        ...favorites[existingIndex],
                        reaccion: reactionType,
                        timestamp: new Date().toISOString()
                    };
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    };

    const handleChapter = (chapter) => {
        navigate(`/chapter/${chapter._id}`);
    };

    if (isLoading || !categories || !authors) {
        return <div className="text-center p-4 mt-24">Loading...</div>;
    }

    if (!manga) {
        return <div className="text-center p-4 mt-24">Select a manga to view details</div>;
    }

    if (error) {
        return <div className="text-center p-4 mt-24 text-red-500">Error: {error}</div>;
    }

    const categoryName = categories.find(c => c._id === manga.category_id)?.name;
    const authorName = authors.find(a => a._id === manga.creator_id)?.name;

    return (
        <main className="bg-[#EBEBEB] min-h-screen">
            <div className="container mx-auto px-4 py-4 md:py-8 mt-16 md:mt-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-4 space-y-4 md:space-y-6">
                            <img
                                src={manga.cover_photo}
                                alt={manga.title}
                                className="w-full h-[300px] md:h-[500px] object-cover rounded-xl md:rounded-2xl shadow-lg"
                            />

                            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
                                <div className="flex justify-between">
                                    <StatItem value="4.5/5" label="Rating" />
                                    <div className="w-px bg-[#9D9D9D]" />
                                    <StatItem value={chapters?.length || 0} label="Chapters" />
                                    <div className="w-px bg-[#9D9D9D]" />
                                    <StatItem value="Eng" label="Language" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-2 md:gap-4">
                                    <ReactionButton
                                        emoji="👍"
                                        mangaId={manga._id}
                                        onReact={handleReaction}
                                        selectedReaction={selectedReaction}
                                    />
                                    <ReactionButton
                                        emoji="👎"
                                        mangaId={manga._id}
                                        onReact={handleReaction}
                                        selectedReaction={selectedReaction}
                                    />
                                    <ReactionButton
                                        emoji="😮"
                                        mangaId={manga._id}
                                        onReact={handleReaction}
                                        selectedReaction={selectedReaction}
                                    />
                                    <ReactionButton
                                        emoji="😍"
                                        mangaId={manga._id}
                                        onReact={handleReaction}
                                        selectedReaction={selectedReaction}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-8">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-6">
                                <div className="space-y-3 md:space-y-4">
                                    <h1 className="text-3xl md:text-5xl font-bold text-[#222222]">{manga.title}</h1>
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#FFE0DF] rounded-full text-[#EF8481] text-sm md:text-base font-medium">
                                            {categoryName || 'Category'}
                                        </span>
                                        <span className="text-[#9D9D9D] text-sm md:text-lg">
                                            {authorName || 'Author'}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full md:w-fit bg-gray-100 p-1.5 md:p-2 rounded-full flex gap-1 md:gap-2 justify-between md:justify-start">
                                    <TabButton
                                        active={activeTab === "description"}
                                        onClick={() => setActiveTab("description")}
                                        text="Manga"
                                    />
                                    <TabButton
                                        active={activeTab === "chapters"}
                                        onClick={() => setActiveTab("chapters")}
                                        text="Chapters"
                                    />
                                </div>

                                <div className="mt-4 md:mt-6">
                                    {activeTab === "description" ? (
                                        <p className="text-base md:text-lg leading-relaxed text-[#424242]">
                                            {manga.description}
                                        </p>
                                    ) : (
                                        <div className="grid gap-3 md:gap-4">
                                            {chapters?.map((chapter) => (
                                                <div
                                                    key={chapter._id}
                                                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
                                                        <img
                                                            src={chapter.cover_photo}
                                                            alt={chapter.title}
                                                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg md:text-xl font-semibold">
                                                                {chapter.title}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-[#9D9D9D]">
                                                                {chapter.pages?.length || 0} pages
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors"
                                                        onClick={() => handleChapter(chapter)}
                                                    >
                                                        Read
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="mt-4 px-6 py-3 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors"
                        onClick={() => navigate("/favourites")}
                    >
                        Go to Favourites
                    </button>
                </div>
            </div>
        </main>
    );
}
export default Manga;