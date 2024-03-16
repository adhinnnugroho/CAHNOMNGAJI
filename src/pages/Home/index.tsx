import AppLayout from "@/Layout/App"
import SurahService from "@/Services/Surah"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


const LastReadBackground = '/img/last_read.png'
const SurahNumberBackground = '/img/number_icons.png'

const HomeScreen = () => {

    const [surah, setSurah] = useState([])
    const [lastReadSurah, setLastReadSurah] = useState<any>([]);


    useEffect(() => {
        const getSurah = async () => {
            const surah = await SurahService.getAllSurah();
            setSurah(surah.data.data);
        }
        getSurah();
    })

    useEffect(() => {
        const lastReadSurah = localStorage.getItem('lastRead');
        if (lastReadSurah) {
            setLastReadSurah(JSON.parse(lastReadSurah));
        }
    }, []);

    return (
        <AppLayout>
            <div className="mt-5 ml-5 font-semibold text-2xl">
                Asslamualaikum
            </div>
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
                                    <div className="col-span-1">
                                        <div className="flex">
                                            <div className="text-2xl mb-6">
                                                <Image src={SurahNumberBackground} width={330} height={60} alt="ramadhan"
                                                    className="w-16" />
                                                <div className="-mt-[45px] text-center text-xl">
                                                    {surah.nomor}
                                                </div>
                                            </div>
                                            <div className="text-2xl ml-5">
                                                {surah.namaLatin} <br />
                                                {surah.arti}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>

        </AppLayout>
    )
}

export default HomeScreen
