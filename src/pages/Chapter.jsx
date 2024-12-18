import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import {
    getChapter,
    createComment,
    fetchCommentFromChapter,
    updateComment,
    deleteComment
} from "../store/actions/chapterActions";

const Chapter = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const maxButtons = 3;

    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, token } = useSelector((state) => state.authStore);
    const role = user?.role;
    const idAuthor = user?.author?._id || "";
    const idCompany = user?.company?._id || "";
    const { chapter, loading, error } = useSelector((state) => state.chapter);
    const { comments } = useSelector((state) => state.chapter);

    useEffect(() => {
        if (!id) return;

        const loadData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    dispatch(getChapter(id)).unwrap(),
                    dispatch(fetchCommentFromChapter(id)).unwrap()
                ]);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        loadData();
    }, [dispatch, id]);

    if (isLoading || !chapter?.pages) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    const handleCreateComment = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !token || !chapter?._id) return;

        const commentData = {
            chapter_id: chapter._id,
            message: newComment.trim(),
            author_id: user.role === 1 ? user.author?._id : null,
            company_id: user.role === 2 ? user.company?._id : null,
        };

        dispatch(createComment({
            commentData,
            chapterId: chapter._id
        }))
            .unwrap()
            .then(() => {
                setNewComment("");
                dispatch(fetchCommentFromChapter(id));
            })
            .catch((error) => console.error(error));
    };

    const handleEditClick = (commentId, currentMessage) => {
        setIsEditing(true);
        setEditingCommentId(commentId);
        setEditedComment(currentMessage);
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        if (!editedComment.trim()) return;

        try {
            await dispatch(updateComment({
                commentId: editingCommentId,
                updatedMessage: editedComment.trim(),
                token
            })).unwrap();

            setIsEditing(false);
            setEditingCommentId(null);
            setEditedComment("");
            dispatch(fetchCommentFromChapter(id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClick = async (commentId) => {
        try {
            await dispatch(deleteComment({
                id: commentId,
                token
            })).unwrap();
            dispatch(fetchCommentFromChapter(id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingCommentId(null);
        setEditedComment("");
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < chapter.pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const getPaginationRange = () => {
        const totalPages = chapter.pages.length;
        const start = Math.max(0, currentPage - Math.floor(maxButtons / 2));
        const end = Math.min(totalPages, start + maxButtons);
        return Array.from({ length: end - start }, (_, i) => i + start);
    };

    return (
        <div className="bg-[#ebebeb] min-h-screen">
            <div className="bg-[#4338ca] p-4 flex justify-center text-white items-center">
                <h1 className="text-lg font-bold w-9/12 sm:w-auto">
                    {chapter.order} - {chapter.title}
                </h1>
            </div>

            <div className="relative flex justify-center items-center bg-black h-[90vh] md:h-[80vh]">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-3xl hover:w-10"
                >
                    🡠
                </button>
                <img
                    src={chapter.pages[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    className="max-h-full"
                />
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === chapter.pages.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-3xl hover:w-10"
                >
                    🡢
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-[#ebebeb] rounded-lg w-11/12 max-w-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Comments</h2>
                        <div className="max-h-[50vh] overflow-y-auto space-y-4">
                            {comments?.map((comment) => {
                                const isEditing = editingCommentId === comment._id;
                                return (
                                    <div key={comment._id} className="flex flex-col items-start space-x-4 gap-3 bg-white p-2 rounded mb-4">
                                        <div className="flex gap-5 items-center mb-5">
                                            <img
                                                src={comment?.author_id?.photo || "https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg"}
                                                alt={comment?.author_id?.name || "Camilo"}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <p className="font-medium">{comment?.author_id?.name || "Camilo"}</p>
                                        </div>
                                        <div className="flex flex-col w-96 text-center gap-2">
                                            {isEditing ? (
                                                <form onSubmit={handleUpdateComment} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        className="flex-1 border border-gray-300 rounded px-2 py-1"
                                                    />
                                                    <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                        Save
                                                    </button>
                                                    <button onClick={handleCancelEdit} className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-gray-500">{comment.message}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                    </p>
                                                    {(idAuthor === comment?.author_id?._id || idCompany === comment?.company_id?._id) &&
                                                        ((role === 1 || role === 2) || role === 3) && (
                                                            <div className="w-full space-x-4">
                                                                <button
                                                                    onClick={() => handleEditClick(comment._id, comment.message)}
                                                                    className="text-blue-500 hover:underline"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteClick(comment._id)}
                                                                    className="text-red-500 hover:underline"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {((role === 1 || role === 2) || role === 3) && (
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Say something here..."
                                        className="w-full border ps-6 border-gray-300 rounded pl-4 pr-10 py-4"
                                    />
                                    <button
                                        onClick={handleCreateComment}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#9d9d9d] me-8 hover:text-blue-600"
                                    >
                                        <IoIosSend size={35} />
                                    </button>
                                </div>
                            </div>
                        )}

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
                            className={`px-3 py-1 rounded-full ${page === currentPage ? "bg-[#4338ca] text-white" : "bg-gray-200 text-gray-800"
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

                <div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-500 text-center text-4xl shadow-2xl"
                    >
                        📝
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chapter;