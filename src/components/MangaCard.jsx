import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../store/actions/mangaActions.js"
import React, { useEffect } from "react";
import ButtonReadManga from "./buttons/buttonReadManga.jsx";
import ButtonEditManga from "./buttons/ButtonEditManga.jsx";
import ButtonDeleteManga from "./buttons/ButtonDeleteManga.jsx";
import ButtonAddChapter from "./buttons/buttonAddChapter.jsx";
import { get_categories, setSelectedCategories } from "../store/actions/categoryActions.js";

export default function MangaCard({ mangas, isManager }) {
   const dispatch = useDispatch();
   const {loading, search, error} = useSelector((state) => state.mangas)
   const {categories, categorySelet} = useSelector((state) => state.categories)

   const handleCategoryChange = (category) => {
       const newCategories = categorySelet.includes(category)
           ? categorySelet.filter(cat => cat !== category)
           : [...categorySelet, category];
       dispatch(setSelectedCategories(newCategories));
   };

   const filteredMangas = categorySelet.length === 0
       ? mangas
       : mangas.filter(manga => 
           categorySelet.some(category => manga.category_id?.name?.includes(category))
       );
   
   useEffect(() => {
       dispatch(fetchMangas(search));
       dispatch(get_categories())
   }, [dispatch, search]);

   return (
       <div className="w-full h-full mx-auto mt-5 -translate-y-24 bg-gray-300 flex justify-center items-center">
           <div className="w-11/12 bg-white h-full px-4 mx-4 my-3 -translate-y-12 rounded-xl flex flex-col justify-around items-center">
               <div className="flex flex-wrap gap-4 justify-start ml-40 my-3 w-full">
                   {categories.map((category, index) => (
                       <label
                           key={index}
                           className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category?.text || 'text-gray-500'}`}
                       >
                           <input
                               type="checkbox"
                               checked={categorySelet.includes(category.name)}
                               onChange={() => handleCategoryChange(category.name)}
                               value={category.name}
                               className="hidden"
                           />
                           {category.name}
                       </label>
                   ))}
               </div>

               <div className="flex justify-center items-center flex-wrap">
                   {error && <div className="error-message">{error}</div>}
                   {loading ? (
                       <div className="loading-indicator">Loading...</div>
                   ) : filteredMangas.length === 0 ? (
                       <p>No mangas found for this author/company.</p>
                   ) : (
                       filteredMangas.map((manga, index) => (
                           <div className="w-full h-40 mx-6 mt-4 flex items-center bg-white shadow-md rounded-xl overflow-hidden max-w-sm" key={index}>
                               <div className={`p-4 w-2/3 border-l-4 ${manga.category_id?.text ? `border-${manga.category_id.text}-500` : 'border-gray-500'}`}>
                                   <h3 className="text-lg mb-3 font-bold text-gray-800">{manga.title}</h3>
                                   <p className={`text-sm ${manga.category_id?.text || 'text-gray-500'}`}>
                                       {manga.category_id?.name || 'Uncategorized'}
                                   </p>
                                   {isManager ? (
                                       <>
                                           <ButtonEditManga mangaId={manga._id} />
                                           <ButtonDeleteManga mangaId={manga._id} />
                                           <ButtonAddChapter mangaId={manga._id} />
                                       </>
                                   ) : (
                                       <ButtonReadManga 
                                           mangaId={manga._id} 
                                           bgColor={manga.category_id?.bg || 'bg-gray-100'} 
                                           textColor={manga.category_id?.text || 'text-gray-500'}
                                       />
                                   )}
                               </div>
                               <div className="w-2/3 relative">
                                   <img
                                       src={manga.cover_photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo79b2l7teWYiI5GuEHf1XohsdANW1y5X9jA&s'}
                                       alt={manga.title}
                                       className="object-cover rounded-l-full w-full h-auto"
                                   />
                               </div>
                           </div>
                       ))
                   )}
               </div>
           </div>
       </div>
   );
}