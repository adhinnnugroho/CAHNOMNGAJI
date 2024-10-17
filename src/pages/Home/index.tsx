import AppLayout from "@/layout/App"
import useSurahData from "@/core/hooks/surah/useSurahData"
import LastReadSurahScreen from "@/core/screen/homeScreen/lastReadScreen"
import ComponentManagement from "@/components/ComponentManagement"

const HomeScreen = () => {
    const { filteredSurahs, handleSearch } = useSurahData();

    return (
        <AppLayout>
            <div className="lg:hidden block">
                <LastReadSurahScreen />
                <div className="mt-5 ml-4 mr-4 mb-5 ">
                    <div className="grid grid-cols-3 gap-7">
                        <div className="col-span-1 text-2xl text-purple-600 font-bold">
                            Surah
                        </div>
                        <div className="col-span-2 text-3xl text-right mr-3 relative">
                            <ComponentManagement.SearchInput onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                        {filteredSurahs.map((surah: any, index: number) => {
                            return (
                                <div key={"surah" + index}>
                                    <ComponentManagement.SurahCard SurahNumber={surah.nomor} SurahNameLatin={surah.namaLatin} tempatTurun={surah.tempatTurun}
                                        link={`/Surah/${surah.nomor}`} jumlahAyat={surah.jumlahAyat} SurahNameTransliteration={surah.nama} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default HomeScreen
