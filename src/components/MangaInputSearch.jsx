import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/actions/mangaActions";
export default function MangaInputSearch() {

    const handleTextChange = (e) => {
        dispatch(setSearch(e.target.value));
    };
    const dispatch = useDispatch(); // Necesario para despachar la acción
    const search = useSelector((state) => state.mangas.search)

    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">


            <div className="my-20">
                <h1 className="text-white text-4xl font-bold ">Manga</h1>
            </div>
            <input
                type="text"
                placeholder="Search for manga..."
                className="my-6 px-4 py-2 w-3/5 bg-white           rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={handleTextChange}
            />
        </div>
    );
}