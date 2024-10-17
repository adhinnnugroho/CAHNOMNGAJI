import { useEffect, useState } from "react";

const useLastReadSurah = () => {
    const [lastReadSurah, setLastReadSurah] = useState<any>([]);

    useEffect(() => {
        const lastReadSurah = localStorage.getItem('lastRead');
        if (lastReadSurah) {
            setLastReadSurah(JSON.parse(lastReadSurah));
        }
    }, []);

    return lastReadSurah;
}

export default useLastReadSurah
