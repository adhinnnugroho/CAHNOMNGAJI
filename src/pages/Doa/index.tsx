import MobileNavigations from "@/UI/Navigations/MobileNavigations"
import { retrieveAllDoa } from "@/lib/Doa/DoaLib";
import { useCallback, useEffect, useState } from "react";

const DoaScreen = () => {
    const [Doa, setDoa] = useState([])
    const [loadedDataCount, setLoadedDataCount] = useState(5);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const getSurah = useCallback(async () => {
        const responseSurah = await retrieveAllDoa();
        setTotalDataCount(responseSurah.length);
        setDoa(responseSurah.slice(0, loadedDataCount));
    }, [loadedDataCount]);

    const [SearchParam, setSearchParam] = useState('');

    const toggleSearch = () => {
        const closeButton = document.querySelector('.close-button');
        const SearchButton = document.querySelector('.search-button');
        const inputField = document.querySelector('.search-input');
        closeButton?.classList.toggle('hidden');
        SearchButton?.classList.toggle('hidden');
        inputField?.classList.toggle('w-56');
        inputField?.classList.toggle('w-10');
        inputField?.classList.toggle('rounded-lg');
        inputField?.classList.toggle('rounded-full');
        inputField?.classList.toggle('p-5');
        inputField?.classList.toggle('p-2');
    };

    useEffect(() => {
        return () => {
            const searchButton = document.querySelector('.search-button');
            const searchInput = document.querySelector('.search-input');
            searchButton?.removeEventListener('click', toggleSearch);
            searchInput?.removeEventListener('keydown', toggleSearch);
        };

    }, []);

    return (
        <>
            <div className="mt-5 ml-4 mr-4 mb-5">
                <div className="grid grid-cols-3 gap-7">
                    <div
                        className="col-span-1 text-2xl text-purple-600 font-bold">
                        Doa
                    </div>
                    <div className="col-span-2 text-3xl text-right mr-3 relative">
                        <input type="text" className="bg-white border-none outline-none w-10 h-10 rounded-full p-2 
                            transition-width duration-500 search-input text-black" onChange={(e) => setSearchParam(e.target.value)} />
                        <i className='bx bx-search-alt-2 search-button absolute top-1 right-1 text-purple-600' onClick={toggleSearch}></i>
                        <i className='bx bx-x-circle bg-purple-600 rounded-full p-1 close-button hidden absolute top-0 right-0' onClick={toggleSearch}></i>
                    </div>
                </div>
            </div>



            <MobileNavigations />
        </>
    )
}

export default DoaScreen