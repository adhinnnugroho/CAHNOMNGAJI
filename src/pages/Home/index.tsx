import SurahCard from "@/components/card/SurahCard"
import SearchInput from "@/components/input/SearchInput"
import { retrieveDataSurah } from "@/core/utils/SurahUtils"
import MainLayouts from "@/layouts/MainLayout"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

const LastReadBackground = '/img/last_read.png'


const HomeScreen = () => {
    const [surah, setSurah] = useState([]);
    const [loadedDataCount, setLoadedDataCount] = useState(5);
    const [totalDataCount, setTotalDataCount] = useState(0);


    const getSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
        setTotalDataCount(responseSurah.length);
        setSurah(responseSurah.slice(0, loadedDataCount));
    }, [loadedDataCount]);

    useEffect(() => {
        getSurah();
    }, [getSurah]);





    return (
        <MainLayouts>
            <div className="ml-4 mr-4 mt-3">
                <div className="mb-44">
                    <Image src={LastReadBackground} priority={true} width={330} height={60} alt="ramadhan"
                        className="w-screen h-44" />
                    <div className="flex flex-warp gap-1 -mt-40 ml-3">
                        <i className='bx bx-book-open text-2xl' />
                        <h5 className="text-white  font-semibold text-2xl drop-shadow">
                            Last Read
                        </h5>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-7 mt-5 items-center">
                    <div className="col-span-1 text-2xl text-purple-600 font-bold flex items-center">
                        Surah
                    </div>
                    <div className="col-span-2 text-3xl text-right mr-3">
                        <SearchInput />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                    {surah.map((surah: any, index: number) => {
                        return (
                            <div key={"surah" + index}>
                                <SurahCard SurahNumber={surah.nomor} SurahNameLatin={surah.namaLatin} tempatTurun={surah.tempatTurun}
                                    link={`/Surah/${surah.nomor}`} jumlahAyat={surah.jumlahAyat} SurahNameTransliteration={surah.nama} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </MainLayouts>
    )
}

export default HomeScreen