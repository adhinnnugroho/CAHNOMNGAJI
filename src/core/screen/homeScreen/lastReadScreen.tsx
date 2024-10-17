import Image from "next/image"
import {
    lastReadBackground
} from "@/core/constants/background";

import useLastReadSurah from "@/core/hooks/useLastReadSurah";

const LastReadSurahScreen = () => {
    const { lastReadSurah } = useLastReadSurah();
    return (
        <div className="ml-4 mr-4 mt-3 mb-44">
            <Image src={lastReadBackground} priority={true} width={330} height={60} alt="ramadhan"
                className="w-screen h-44" />
            <div className="flex flex-warp gap-1 -mt-40 ml-3">
                <i className='bx bx-book-open text-3xl' />
                <h5 className="text-white  font-semibold text-2xl">
                    Last Read
                </h5>
            </div>
            <div className="mt-5">
                <div className="text-3xl text-white ml-3 mt-2 font-bold">
                    {lastReadSurah?.surahName}
                </div>
            </div>
        </div>
    )
}

export default LastReadSurahScreen