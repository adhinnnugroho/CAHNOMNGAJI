import SurahService from '@/Services/Surah';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BackNavigations from '@/UI/Navigations/BackNavigations';
import SurahDetails from '@/Components/Card/SurahDetails';

const SurahDetail = () => {
    const { id } = useRouter().query;
    const [detailSurah, setDetailSurah] = useState([]);
    const [surah, setSurah] = useState<any>([]);
    const [playingIndex, setPlayingIndex] = useState(-1); // State to track the index of the currently playing verse

    useEffect(() => {
        const fetchData = async (id: string) => {
            if (id !== undefined) {
                try {
                    const surah = await SurahService.getDetailsSurah(id);
                    setDetailSurah(surah.data.data.ayat);
                    setSurah(surah.data.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData(id as string);
    }, [id]); // Make sure to include 'id' as a dependency

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (detailSurah.length > 0 && surah) {
                const lastReadData = {
                    surahId: surah.id,
                    surahName: surah.namaLatin,
                    lastReadTime: new Date().getTime()
                };

                // Check if lastRead exists in localStorage
                const lastRead = localStorage.getItem('lastRead');
                if (lastRead) {
                    const lastReadParsed = JSON.parse(lastRead);
                    // Check if the accessed surah is the same as the last read surah
                    if (lastReadParsed.surahId === surah.id) {
                        // Update lastReadData with the latest accessed surah data
                        localStorage.setItem('lastRead', JSON.stringify(lastReadData));
                    }
                } else {
                    localStorage.setItem('lastRead', JSON.stringify(lastReadData));
                }
            }
        }, 50000); // Set timeout for 50 seconds

        return () => clearTimeout(timeout); // Clear timeout on component unmount
    }, [detailSurah, surah]);

    // Function to handle audio playback for a specific verse
    const handleAudioPlayback = (index: number) => {
        const audioPlayer = document.getElementById(`audio-${index}`) as HTMLAudioElement; // Get the audio element
        if (playingIndex === index) {
            // If the same verse is clicked again, toggle between play and pause
            if (audioPlayer.paused) {
                audioPlayer.play();
                setPlayingIndex(index); // Start playback
            } else {
                audioPlayer.pause(); // Pause playback
                setPlayingIndex(-1);
            }
        } else {
            setPlayingIndex(index);
            audioPlayer.play();

            // Automatically play the next verse when current audio ends
            audioPlayer.onended = () => {
                const nextIndex = index + 1;
                if (nextIndex < detailSurah.length) {
                    handleAudioPlayback(nextIndex);
                }
            };
        }

    };

    return (
        <div>
            <BackNavigations SurahName={surah && surah.namaLatin} link="/Home" />
            <SurahDetails nameSurah={surah && surah.namaLatin} ayat={surah && surah.jumlahAyat} arti={surah && surah.arti}
                tempatTurun={surah && surah.tempatTurun} />

            <div className="grid grid-cols-1 gap-5 ml-3 mr-3 pb-6">
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
        </div>
    );
};

export default SurahDetail;
