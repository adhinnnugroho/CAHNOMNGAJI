import SurahCard from "@/Components/Card/SurahCard"
import SearchInput from "@/Components/Input/SearchInput"
import AppLayout from "@/Layout/App"
import LastReadSurah from "@/UI/Home/LastRead"
import { retrieveDataSurah } from "@/lib/RestApi/SurahApi/Service"
import { useCallback, useEffect, useState } from "react"

const HomeScreen = () => {

    const [surah, setSurah] = useState([])
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

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < totalDataCount) { loadMoreData(); } else if
            (scrollTop === 0 && loadedDataCount > 5) {
            setLoadedDataCount(5);
        }
    }, [loadedDataCount, totalDataCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const HandleRealtimeSearch = async (SearchValue: any) => {
        const responseSurah = await retrieveDataSurah();
        if (SearchValue === '') {
            setSearchParam(SearchValue)
            setSurah(responseSurah.slice(0, loadedDataCount));
        } else {
            setSearchParam(SearchValue)
            setSurah(responseSurah);
        }
    }

    const filteredSurahs = surah && surah.filter((surah: any) =>
        surah.namaLatin.toLowerCase().includes(SearchParam.toLowerCase())
    );

    useEffect(() => {
        filteredSurahs
    }, [filteredSurahs]);


    return (
        <AppLayout>
            <>
                <LastReadSurah />
                <div className="mt-5 ml-4 mr-4 mb-5">
                    <div className="grid grid-cols-3 gap-7">
                        <div className="col-span-1 text-2xl text-purple-600 font-bold">
                            Surah
                        </div>
                        <div className="col-span-2 text-3xl text-right mr-3 relative">
                            <SearchInput onChange={(e) => HandleRealtimeSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                        {filteredSurahs.map((surah: any, index: number) => {
                            return (
                                <div key={index}>
                                    <SurahCard SurahNumber={surah.nomor} SurahNameLatin={surah.namaLatin} tempatTurun={surah.tempatTurun}
                                        link={`/Surah/${surah.nomor}`} jumlahAyat={surah.jumlahAyat} SurahNameTransliteration={surah.nama} />
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
