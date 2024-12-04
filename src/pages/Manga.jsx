import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMangaDetails, fetchChapters, fetchCategories, fetchAuthors } from "../store/actions/mangaActions";

const ReactionButton = ({ emoji }) => (
    <button className="w-[72px] h-[72px] bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-4xl hover:bg-gray-50 transition-colors">
        {emoji}
    </button>
);

const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl text-[#424242] font-poppins">{value}</span>
        <span className="text-xs text-[#9D9D9D] font-poppins">{label}</span>
    </div>
);

function Manga() {
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

    if (isLoading || !categories || !authors) return <div className="text-center p-4">Loading...</div>;
    if (!manga) return <div className="text-center p-4">Select a manga to view details</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

    const categoryName = categories.find(c => c._id === manga.category_id)?.name;
    const authorName = authors.find(a => a._id === manga.author_id)?.name;

    return (
        <div className="bg-[#EBEBEB] min-h-screen">
            <div className="container mx-auto px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Left Column */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Cover Image */}
                            <img
                                src={manga.cover_photo}
                                alt={manga.title}
                                className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
                            />

                            {/* Stats Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl space-y-4">
                                <div className="flex justify-between">
                                    <StatItem value="4.5/5" label="Rating" />
                                    <div className="w-px bg-gray-300" />
                                    <StatItem value="265" label="Chapters" />
                                    <div className="w-px bg-gray-300" />
                                    <StatItem value="Eng" label="Language" />
                                </div>
                            </div>

                            {/* Reactions */}
                            <div className="grid grid-cols-4 gap-6">
                                <ReactionButton emoji="👍" />
                                <ReactionButton emoji="👎" />
                                <ReactionButton emoji="😮" />
                                <ReactionButton emoji="😍" />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-2xl shadow-xl p-10 space-y-8">
                                {/* Title & Meta */}
                                <div className="space-y-6">
                                    <h1 className="text-5xl font-bold text-[#222222]">{manga.title}</h1>
                                    <div className="flex items-center gap-6">
                                        <span className="px-6 py-2 bg-[#FFE0DF] rounded-full text-[#EF8481] font-medium">
                                            {categoryName || 'Category'}
                                        </span>
                                        <span className="text-[#9D9D9D] text-lg">{authorName || 'Author'}</span>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="border-b border-gray-300">
                                    <div className="flex gap-10">
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

                                {/* Content */}
                                <div className="mt-8">
                                    {activeTab === "description" ? (
                                        <p className="text-lg leading-relaxed text-[#424242]">
                                            {manga.description}
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-6">
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
        <button className="px-8 py-3 bg-[#4338CA] text-white rounded-lg hover:bg-[#5E52F3] transition-colors">
            Read
        </button>
    </div>
);


export default Manga;