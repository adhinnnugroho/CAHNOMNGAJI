
import AppLayout from '@/layout/App';
import useSurahDetail from '@/core/hooks/surah/useSurahDetails';
import SurahDetails from '@/components/Card/SurahDetails';
import SurahDetailsCard from '@/components/Card/SurahDetailsCard';

const SurahDetail = () => {
    const {
        detailSurah,
        surah,
        playingIndex,
        handleAudioPlayback,
    } = useSurahDetail();

    return (
        <AppLayout NavigationType="Back" NavbarTitle={surah?.namaLatin} linkNavigation={`/home`} >
            <SurahDetails nameSurah={surah?.namaLatin} ayat={surah?.jumlahAyat} arti={surah?.arti}
                tempatTurun={surah?.tempatTurun} />
            <div className="grid grid-cols-1 gap-5 ml-3 mr-3 pb-6 mb-20">
                {detailSurah?.map((surah: any, index: number) => {
                    return (
                        <div key={'surahDetails' + index}>
                            <div className="col-span-1">
                                <SurahDetailsCard surah={surah} index={index} playingIndex={playingIndex}
                                    handleAudioPlayback={handleAudioPlayback} audio={surah.audio["02"]} teksArab={surah.teksArab}
                                    teksLatin={surah.teksLatin} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </AppLayout>
    );
};

export default SurahDetail;
