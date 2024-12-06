import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuthor } from "../store/actions/authorActions";
import { commentReducer } from "../store/reducer/commentsReducer";
import {
    fetchChapter,
    createComment,
    fetchComments
} from "../store/actions/chapterActions";

const Chapter = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Captura el ID del capítulo desde la URL

    // Extraer el capítulo y los comentarios del estado
    const { chapter, loading, error } = useSelector((state) => state.chapter);
    const { comments } = useSelector((state) => state.chapter.comments);
    // const { authors } = useSelector((state) => state.authors);
    const { comment } = useSelector((state) => state.comment);

    console.log("Estado actual del capítulo:", chapter);
    console.log("Comentarios actuales:", comments);
    console.log("comentarios", comment);


    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const maxButtons = 5; // Máximo de botones visibles

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                if (id) {
                    await Promise.all([
                        dispatch(fetchComments(id)),
                        dispatch(fetchChapter(id)),
                        dispatch(fetchAuthor()),
                        dispatch(commentReducer())
                    ]);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [dispatch, id]);



    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (chapter?.pages?.length && currentPage < chapter.pages.length - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const getPaginationRange = () => {
        if (!chapter?.pages) return [];
        const totalPages = chapter.pages.length;
        const start = Math.max(0, currentPage - Math.floor(maxButtons / 2));
        const end = Math.min(totalPages, start + maxButtons);
        return Array.from({ length: end - start }, (_, i) => i + start);
    };

    const handleCreateComment = () => {
        if (newComment.trim()) {
            dispatch(
                createComment({
                    id,
                    commentData: {
                        text: newComment,
                        author: "User123",
                        avatar: "/default-avatar.png",
                        timestamp: new Date().toISOString(),
                    },
                })
            );
            setNewComment("");
        }
    };

    if (isLoading || !chapter) return <div className="text-center p-4">Loading...</div>;

    if (loading)
        return <div className="text-center p-4">Loading chapter...</div>;
    if (error)
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    if (!chapter)
        return <div className="text-center p-4">No chapter data available</div>;

    return (
        <div className="bg-[#ebebeb] min-h-screen">
            {/* Navbar */}
            <div className="bg-[#4338ca] p-4 flex justify-center text-white items-center">
                <h1 className="text-lg font-bold">
                    {chapter.order} -  {chapter.title}
                </h1>
            </div>

            {/* Page Viewer */}
            <div className="relative flex justify-center items-center bg-black h-[90vh] md:h-[80vh]">
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-3xl"
                    onClick={handlePreviousPage}
                >
                    🡠
                </button>
                <img
                    src={chapter.pages[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    className="max-h-full"
                />
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-3xl"
                    onClick={handleNextPage}
                >
                    🡢
                </button>
            </div>


            {/* Comments Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className=" relative bg-white rounded-lg w-11/12 max-w-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Comments</h2>
                        <div className="max-h-[50vh] overflow-y-auto space-y-4">
                            {comments?.map((comment, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 bg-gray-50 p-2 rounded"
                                >
                                    <img
                                        src={comment.avatar}
                                        alt={comment.author}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{comment.author}</p>
                                        <p className="text-sm text-gray-500">{comment.message}</p>
                                        <p className="text-xs text-gray-400">
                                            {comment.updatedAt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 border border-gray-300 rounded p-2"
                            />
                            <button
                                onClick={handleCreateComment}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Post
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 z-10 bg-transparent text-gray-500 hover:text-gray-800 text-xl"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
            <div className="flex justify-center gap-10 sm:gap-20 items-center h-[10vh]">
                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50"
                    >
                        🡠
                    </button>
                    {getPaginationRange().map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1 rounded-full ${page === currentPage
                                ? "bg-[#4338ca] text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === chapter.pages.length - 1}
                        className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50"
                    >
                        🡢
                    </button>
                </div>

                <div className="flex justify-center gap-20 items-center h-[10vh]">
                    <div>
                        <button
                            className="text-blue-500 text-center text-4xl shadow-2xl"
                            onClick={() => setIsModalOpen(true)}
                        >
                            📝
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapter;




