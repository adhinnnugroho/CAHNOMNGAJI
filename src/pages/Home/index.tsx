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

    const getSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
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

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < 150) {
            loadMoreData();
        } else if (scrollTop === 0 && loadedDataCount > 5) {
            setLoadedDataCount(5);
        }
    }, [loadedDataCount]);

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
                    <div className="grid grid-cols-4 gap-7">
                        <div
                            className="col-span-1 text-2xl text-purple-600 border-2 dark:border-black border-gray-100 
                    dark:border-b-purple-600 border-b-purple-600 font-bold">
                            Surah
                        </div>
                        <div className="col-span-1 text-2xl">
                            Para
                        </div>
                        <div className="col-span-1 text-2xl">
                            Page
                        </div>
                        <div className="col-span-1 text-2xl">
                            Hijb
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                        {surah && surah.map((surah: any, index: number) => {
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
