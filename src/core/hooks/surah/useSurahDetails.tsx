import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { retrieveDataDetailsSurah } from '@/core/utils/surahUtils/surahHelpers';

const useSurahDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [detailSurah, setDetailSurah] = useState([]);
    const [surah, setSurah] = useState<any>([]);
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [loadedDataCount, setLoadedDataCount] = useState(5);
    const [totalDataCount, setTotalDataCount] = useState(0);

    // Mengambil detail surah berdasarkan ID
    const getDetailSurah = useCallback(async (SurahId: string) => {
        if (SurahId !== undefined) {
            try {
                const responseSurah = await retrieveDataDetailsSurah(Number(SurahId));
                setTotalDataCount(responseSurah.ayat.length);
                setDetailSurah(responseSurah.ayat.slice(0, loadedDataCount));
                setSurah(responseSurah);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [loadedDataCount]);

    // Memanggil API untuk mendapatkan detail surah ketika ID berubah
    useEffect(() => {
        getDetailSurah(id as string);
    }, [id, getDetailSurah]);

    // Fungsi untuk load more data ketika scroll sampai di bawah
    const loadMoreData = async () => {
        setLoadedDataCount(prevCount => prevCount + 5);
    };

    // Handle infinite scroll untuk load lebih banyak ayat
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

    // Event listener untuk scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Menyimpan surah terakhir yang dibaca ke localStorage
    useEffect(() => {
        const saveLastRead = () => {
            const lastReadData = {
                surahId: id,
                surahName: surah.namaLatin,
                lastReadTime: new Date().getTime(),
            };
            localStorage.setItem('lastRead', JSON.stringify(lastReadData));
        };

        const timeout = setTimeout(saveLastRead, 1000);
        return () => clearTimeout(timeout);
    }, [id, surah.namaLatin]);

    // Handle untuk audio playback
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

    return {
        detailSurah,
        surah,
        playingIndex,
        loadedDataCount,
        totalDataCount,
        handleAudioPlayback,
    };
};

export default useSurahDetail;
