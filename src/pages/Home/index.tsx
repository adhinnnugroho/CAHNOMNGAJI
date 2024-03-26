import AppLayout from "@/Layout/App"
import { retrieveDataSurah } from "@/lib/RestApi/SurahApi/Service"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"


const LastReadBackground = '/img/last_read.png'
const SurahNumberBackground = '/img/number_icons.png'

const HomeScreen = () => {

    const [surah, setSurah] = useState([])
    const [lastReadSurah, setLastReadSurah] = useState<any>([]);
    const [loadedDataCount, setLoadedDataCount] = useState(5);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [SearchParam, setSearchParam] = useState('');


    const getSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
        setTotalDataCount(responseSurah.length);
        setSurah(responseSurah.slice(0, loadedDataCount));
    }, [loadedDataCount]);

    useEffect(() => {
        getSurah();
    }, [getSurah]);

    const loadMoreData = async () => {
        setLoadedDataCount(prevCount => prevCount + 5);
    };

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < totalDataCount) {
            loadMoreData();
        } else if (scrollTop === 0 && loadedDataCount > 5) {
            setLoadedDataCount(5);
        }
    }, [loadedDataCount, totalDataCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const lastReadSurah = localStorage.getItem('lastRead');
        if (lastReadSurah) {
            setLastReadSurah(JSON.parse(lastReadSurah));
        }
    }, []);

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
        <AppLayout>
            <>
                <div className="ml-4 mr-4 mt-3 mb-32">
                    <Image src={LastReadBackground} priority={true} width={330} height={60} alt="ramadhan" className="w-screen h-44" />
                    <div className="flex flex-warp gap-1 -mt-40 ml-3">
                        <i className='bx bx-book-open text-2xl' />
                        <h5 className="text-white  font-semibold text-lg">
                            Last Read
                        </h5>
                    </div>
                    <div className="mt-5">
                        {lastReadSurah ? (
                            <div className="text-3xl text-white ml-3 mt-2 font-bold">
                                {lastReadSurah.surahName}
                            </div>
                        ) : (
                            <div className="text-3xl text-purple-600 font-bold">
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 ml-4 mr-4 mb-5">
                    <div className="grid grid-cols-3 gap-7">
                        <div
                            className="col-span-1 text-2xl text-purple-600 font-bold">
                            Surah
                        </div>
                        <div className="col-span-2 text-3xl text-right mr-3 relative">
                            <input type="text" className="bg-white border-none outline-none w-10 h-10 rounded-full p-2 
                            transition-width duration-500 search-input text-black" onChange={(e) => setSearchParam(e.target.value)} />
                            <i className='bx bx-search-alt-2 search-button absolute top-1 right-1 text-purple-600' onClick={toggleSearch}></i>
                            <i className='bx bx-x-circle bg-purple-600 rounded-full p-1 close-button hidden absolute top-0 right-0' onClick={toggleSearch}></i>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                        {surah && surah.filter((surah: any) => surah.namaLatin.toLowerCase().includes(SearchParam.toLowerCase())).map((surah: any, index: number) => {
                            return (
                                <div key={index}>
                                    <Link href={`/Surah/${surah.nomor}`}>
                                        <div className="col-span-1 border-b pb-1 border-b-gray-500">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2">
                                                    <div className="flex flex-wrap gap-3">
                                                        <div className="text-2xl mb-4">
                                                            <Image src={SurahNumberBackground} width={330} height={60} alt="ramadhan"
                                                                className="w-12" />
                                                            <div className="-mt-[40px] text-center text-[14px]">
                                                                {surah.nomor}
                                                            </div>
                                                        </div>
                                                        <div className="block">
                                                            <h5 className="text-xl font-bold">
                                                                {surah.namaLatin}
                                                            </h5>
                                                            <p className="text-lg">
                                                                {surah.tempatTurun} ({surah.jumlahAyat})
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 text-right text-2xl text-purple-500">
                                                    {surah.nama}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        </AppLayout>
    )
}

export default HomeScreen
