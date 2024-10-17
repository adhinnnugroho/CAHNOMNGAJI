import Image from "next/image"
import { useEffect, useState } from "react";

const LastReadBackground = '/img/last_read.png'

const LastReadSurahScreen = () => {
    const [lastReadSurah, setLastReadSurah] = useState<any>([]);
    useEffect(() => {
        const lastReadSurah = localStorage.getItem('lastRead');
        if (lastReadSurah) {
            setLastReadSurah(JSON.parse(lastReadSurah));
        }
    }, []);
    return (
        <div className="ml-4 mr-4 mt-3 mb-44">
            <Image src={LastReadBackground} priority={true} width={330} height={60} alt="ramadhan"
                className="w-screen h-44" />
            <div className="flex flex-warp gap-1 -mt-40 ml-3">
                <i className='bx bx-book-open text-2xl' />
                <h5 className="text-white  font-semibold text-lg">
                    Last Read
                </h5>
            </div>
            <div className="mt-5">
                {lastReadSurah ? (
                    <div className="text-3xl text-white ml-3 mt-2 font-bold">
                        {lastReadSurah.surahName}
                    </div>
                ) : (
                    <div className="text-3xl text-purple-600 font-bold">
                    </div>
                )}
            </div>
        </div>
    )
}

export default LastReadSurahScreen