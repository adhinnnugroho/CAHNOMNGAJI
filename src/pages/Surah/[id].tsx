import SurahService from '@/Services/Surah';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BackNavigations from '@/UI/Navigations/BackNavigations';
import SurahDetails from '@/Components/Card/SurahDetails';
import MobileNavigations from '@/UI/Navigations/MobileNavigations';
import { retrieveDataDetailsSurah } from '@/lib/RestApi/SurahApi/Service';
import AppLayout from '@/Layout/App';

const SurahDetail = () => {
    const router = useRouter();
    const { id } = useRouter().query;
    const [detailSurah, setDetailSurah] = useState([]);
    const [surah, setSurah] = useState<any>([]);
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [loadedDataCount, setLoadedDataCount] = useState(5);
    const [totalDataCount, setTotalDataCount] = useState(0);



    const getDetailSurah = useCallback(async (SurahId: String) => {
        if (SurahId !== undefined) {
            try {
                const responseSurah = await retrieveDataDetailsSurah(SurahId);
                setTotalDataCount(responseSurah.ayat.length);
                setDetailSurah(responseSurah.ayat.slice(0, loadedDataCount));
                setSurah(responseSurah);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [loadedDataCount]);


    useEffect(() => {
        getDetailSurah(id as string);
    }, [id, getDetailSurah]);



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
        const saveLastRead = () => {
            const lastReadData = {
                surahId: id,
                surahName: surah.namaLatin,
                lastReadTime: new Date().getTime()
            };
            localStorage.setItem('lastRead', JSON.stringify(lastReadData));
            const timeout = setTimeout(saveLastRead, 5000);
            return () => clearTimeout(timeout);
        };
    });

    const handleAudioPlayback = (index: number) => {
        const audioPlayer = document.getElementById(`audio-${index}`) as HTMLAudioElement;
        if (playingIndex === index) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                setPlayingIndex(index);
            } else {
                audioPlayer.pause();
                setPlayingIndex(-1);
            }
        } else {
            setPlayingIndex(index);
            audioPlayer.play();
            audioPlayer.onended = () => {
                const nextIndex = index + 1;
                if (nextIndex < detailSurah.length) {
                    handleAudioPlayback(nextIndex);
                }
            };
        }
    };


    return (
        <>
            <BackNavigations SurahName={surah && surah.namaLatin} link={`/Home`} />
            <SurahDetails nameSurah={surah && surah.namaLatin} ayat={surah && surah.jumlahAyat} arti={surah && surah.arti}
                tempatTurun={surah && surah.tempatTurun} />

            <div className="grid grid-cols-1 gap-5 ml-3 mr-3 pb-6 mb-20">
                {detailSurah && detailSurah.map((surah: any, index: number) => {
                    return (
                        <div key={index}>
                            <div className="col-span-1">
                                <div className="block">
                                    <div className="text-2xl mb-6 bg-gray-200 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-white text-xl bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center">
                                                    {surah.nomorAyat}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-right text-purple-600">
                                                    <div className="flex flex-wrap ">
                                                        <audio id={`audio-${index}`} src={surah.audio["02"]} controls className='hidden'></audio>
                                                        {playingIndex === index ? (
                                                            <i className='bx bx-pause text-4xl' onClick={() => handleAudioPlayback(index)}></i>
                                                        ) : (
                                                            <i className='bx bx-play text-4xl' onClick={() => handleAudioPlayback(index)}></i>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl ml-5">
                                        <div className="block">
                                            <div className={`text-right text-arabic ${playingIndex === index ? 'animate-pulse text-purple-500' : ''}`}>
                                                {surah.teksArab}
                                            </div>
                                            <div className="mt-5">
                                                {surah.teksLatin}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default SurahDetail;
