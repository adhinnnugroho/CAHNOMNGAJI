import SurahService from '@/Services/Surah';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import BackNavigations from '@/UI/Navigations/BackNavigations';

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

    // Function to handle audio playback for a specific verse
    const handleAudioPlayback = (index: number) => {
        const audioPlayer = document.getElementById(`audio-${index}`) as HTMLAudioElement; // Get the audio element

        // if (playingIndex === index) {
        //     // If the same verse is clicked again, toggle between play and pause
        //     if (audioPlayer.paused) {
        //         audioPlayer.play(); 
        //         setPlayingIndex(index);// Start playback
        //     } else {
        //         audioPlayer.pause(); // Pause playback
        //         setPlayingIndex(-1);
        //     }
        // } else {
        //     setPlayingIndex(index);
        //     audioPlayer.play();
        // }

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

            <div className="ml-3 mr-3 mt-10 mb-28">
                <Image src={"/img/details_surah.png"} width={330} height={60} alt="ramadhan" className="w-screen" />

                <div className="text-3xl text-white font-bold  text-center -mt-64">
                    {surah && surah.namaLatin}
                </div>
                <div className="text-3xl text-white font-semibold  text-center mt-2 ">
                    {surah.arti}
                </div>
                <div className="text-3xl text-white font-semibold border-t-2 border-white text-center mt-5 pt-2 relative z-10 w-[20rem] items-center justify-center mx-auto">
                    {surah.tempatTurun} . {surah.jumlahAyat} Ayat
                </div>
                <Image src={"/img/bismillah.png"} width={330} height={60} alt="ramadhan" className="w-64 mx-auto mt-5" />
            </div>

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
                                                <div className="text-right">
                                                    <div className="flex flex-wrap ">
                                                        <audio id={`audio-${index}`} src={surah.audio["02"]} controls className='hidden'></audio>
                                                        {playingIndex === index ? (
                                                            <i className='bx bx-pause text-4xl' onClick={() => handleAudioPlayback(index)}></i>
                                                        ) : (
                                                            <i className='bx bx-play text-4xl' onClick={() => handleAudioPlayback(index)}></i>
                                                        )}
                                                        <i className='bx bx-bookmark text-3xl'></i>
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
