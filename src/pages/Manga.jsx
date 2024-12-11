import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    fetchMangaDetails,
    fetchChapters,
    fetchCategories,
    fetchAuthors,
    createReaction
} from "../store/actions/mangaActions";
import loading from '../assets/images/loading.jpg'

const getReactionType = (emoji) => {
    switch (emoji) {
        case '👍': return 'liked';
        case '👎': return 'disliked';
        case '😮': return 'surprised';
        case '😍': return 'love';
        default: return 'liked';
    }
};

const ReactionButton = ({ emoji, mangaId, onReact }) => {
    const dispatch = useDispatch();

    const isActive = useMemo(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.some(f =>
            f.mangaId === mangaId &&
            f.reaccion === getReactionType(emoji)
        );
    }, [mangaId, emoji]);

    const handleClick = async () => {
        try {
            const reactionData = {
                manga_id: mangaId,
                author_id: "674a404f2c593fb14a0d09b4",
                company_id: "674a404f2c593fb14a0d09b6",
                reaccion: getReactionType(emoji)
            };
            await dispatch(createReaction(reactionData)).unwrap();
            onReact();
        } catch (error) {
            console.error('Error creating reaction:', error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`w-[72px] h-[72px] rounded-full shadow-md border flex items-center justify-center text-4xl
                ${isActive ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200'} hover:bg-gray-50 transition-colors`}
        >
            {emoji}
        </button>
    );
};

const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl text-[#424242] font-poppins">{value}</span>
        <span className="text-xs text-[#9D9D9D] font-poppins">{label}</span>
    </div>
);

const TabButton = ({ active, onClick, text }) => (
    <button
        className={`pb-4 px-4 text-lg font-medium relative ${active
            ? "text-[#4338CA]"
            : "text-[#9D9D9D] hover:text-gray-700"
            }`}
        onClick={onClick}
    >
        {text}
        {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4338CA]" />}
    </button>
);

function Manga() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = useSelector((state) => state.mangas.loading);
    const error = useSelector((state) => state.mangas.error);
    const manga = useSelector((state) => state.mangas.selectedManga);
    const chapters = useSelector((state) => state.mangas.chapters);
    const categories = useSelector((state) => state.mangas.categories);
    const authors = useSelector((state) => state.mangas.authors);
    const [activeTab, setActiveTab] = useState("description");
    const [isLoading, setIsLoading] = useState(true);

    const handleChapter = (chapter) => {
        navigate(`/chapter/${chapter._id}`);
    };

    const ChapterCard = ({ chapter }) => (
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-6">
                <img
                    src={chapter.cover_photo}
                    alt={chapter.title}
                    className="w-20 h-20 object-cover rounded-lg shadow"
                />
                <div>
                    <h3 className="text-xl font-semibold">{chapter.title}</h3>
                    <p className="text-[#9D9D9D]">{chapter.pages?.length || 0} pages</p>
                </div>
            </div>
            <button
                className="px-8 py-3 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors"
                onClick={() => handleChapter(chapter)}
            >
                Read
            </button>
        </div>
    );

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
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [dispatch, id]);

    if (isLoading || !categories || !authors) return <div className="text-center p-4">
        <img
            className="w-screen h-1/2 object-cover p-5"
            src="https://i.pinimg.com/736x/e2/23/8a/e2238a219d32d5407855d0e33066599c.jpg"
            alt="loading" /></div>;
    if (!manga) return <div className="text-center p-4">Select a manga to view details</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

    const categoryName = categories.find(c => c._id === manga.category_id)?.name;
    const authorName = authors.find(a => a._id === manga.author_id)?.name;

    const handleReaction = () => {
        console.log('Reaction handled');
    };

    return (
        <div className="bg-[#EBEBEB] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <img
                                src={manga.cover_photo}
                                alt={manga.title}
                                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                            />

                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="flex justify-between">
                                    <StatItem value="4.5/5" label="Rating" />
                                    <div className="w-px bg-[#9D9D9D]" />
                                    <StatItem value="265" label="Chapters" />
                                    <div className="w-px bg-[#9D9D9D]" />
                                    <StatItem value="Eng" label="Language" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <ReactionButton
                                        emoji="👍"
                                        mangaId={manga?._id}
                                        onReact={handleReaction}
                                    />
                                    <ReactionButton
                                        emoji="👎"
                                        mangaId={manga?._id}
                                        onReact={handleReaction}
                                    />
                                    <ReactionButton
                                        emoji="😮"
                                        mangaId={manga?._id}
                                        onReact={handleReaction}
                                    />
                                    <ReactionButton
                                        emoji="😍"
                                        mangaId={manga?._id}
                                        onReact={handleReaction}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                                <div className="space-y-4">
                                    <h1 className="text-5xl font-bold text-[#222222]">{manga.title}</h1>
                                    <div className="flex items-center gap-4">
                                        <span className="px-4 py-2 bg-[#FFE0DF] rounded-full text-[#EF8481] font-medium">
                                            {categoryName || 'Category'}
                                        </span>
                                        <span className="text-[#9D9D9D] text-lg">{authorName || 'Author'}</span>
                                    </div>
                                </div>

                                <div className="border-b border-gray-200">
                                    <div className="flex gap-8">
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
                                </div>

                                <div className="mt-6">
                                    {activeTab === "description" ? (
                                        <p className="text-lg leading-relaxed text-[#424242]">
                                            {manga.description}
                                        </p>
                                    ) : (
                                        <div className="grid gap-4">
                                            {chapters?.map((chapter) => (
                                                <ChapterCard key={chapter._id} chapter={chapter} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manga;