import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapter, createComment } from "../store/actions/chapterActions"
import { useParams } from "react-router-dom";

// import {fetchChapters}  from "../store/actions/mangaActions";
// import { fromJSON } from "postcss";



const Chapter = () => {
    const { chapterId } = useParams();
    const dispatch = useDispatch()


    // Extraer el capítulo y los comentarios del estado
    const { chapter, comments, loading, error } = useSelector((state) => state.chapter);

    console.log("Estado actual del capítulo:", chapter);
    console.log("Comentarios actuales:", comments);

    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (chapterId) {
            console.log("Desencadenando fetchChapter con ID:", chapterId);
            dispatch(fetchChapter(chapterId));
        }
    }, [dispatch, chapterId]);



    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (chapter?.pages?.length && currentPage < chapter.pages.length - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleCreateComment = () => {
        if (newComment.trim()) {
            dispatch(
                createComment({
                    chapterId,
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    Chapter {chapter.number}: {chapter.title}
                </h1>
                <button
                    className="text-blue-500"
                    onClick={() => setIsModalOpen(true)}
                >
                    💭 Comments
                </button>
            </div>

            {/* Page Viewer */}
            <div className="relative flex justify-center items-center bg-black h-[80vh]">
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                    onClick={handleNextPage}
                >
                    🡢
                </button>
            </div>

            {/* Comments Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-11/12 max-w-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Comments</h2>
                        <div className="max-h-[50vh] overflow-y-auto space-y-4">
                            {comments.map((comment, index) => (
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
                                        <p className="text-sm text-gray-500">{comment.text}</p>
                                        <p className="text-xs text-gray-400">
                                            {comment.timestamp}
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
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chapter;
