
import { retrieveDataSurah } from '@/core/utils/surahUtils/surahHelpers';
import { useState, useEffect, useCallback, useMemo } from 'react';


const useSurahData = () => {
    const [surah, setSurah] = useState<any[]>([]);
    const [loadedDataCount, setLoadedDataCount] = useState<number>(5);
    const [totalDataCount, setTotalDataCount] = useState<number>(0);
    const [searchParam, setSearchParam] = useState<string>('');

    const getSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
        setTotalDataCount(responseSurah.length);
        setSurah(responseSurah.slice(0, loadedDataCount));
    }, [loadedDataCount]);

    useEffect(() => {
        getSurah();
    }, [getSurah]);

    const loadMoreData = useCallback(() => {
        setLoadedDataCount((prevCount) => prevCount + 5);
    }, []);

    // Scroll event listener with optimized load
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < totalDataCount) {
            loadMoreData();
        } else if (scrollTop === 0 && loadedDataCount > 5) {
            setLoadedDataCount(5);
        }
    }, [loadedDataCount, totalDataCount, loadMoreData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const debouncedSearch = useCallback(
        (searchValue: string) => {
            const timeout = setTimeout(async () => {
                const responseSurah = await retrieveDataSurah();
                if (searchValue === '') {
                    setSurah(responseSurah.slice(0, loadedDataCount));
                } else {
                    setSurah(
                        responseSurah.filter((surah: any) =>
                            surah.namaLatin.toLowerCase().includes(searchValue.toLowerCase())
                        )
                    );
                }
            }, 300); // Adjust debounce delay as needed

            return () => clearTimeout(timeout);
        },
        [loadedDataCount]
    );

    const handleSearch = (searchValue: string) => {
        setSearchParam(searchValue);
        debouncedSearch(searchValue);
    };

    // Memoized filtered surah data
    const filteredSurahs = useMemo(() => {
        return surah.filter((surahItem: any) =>
            surahItem.namaLatin.toLowerCase().includes(searchParam.toLowerCase())
        );
    }, [surah, searchParam]);

    return { filteredSurahs, handleSearch, totalDataCount, loadedDataCount };
}

export default useSurahData;
