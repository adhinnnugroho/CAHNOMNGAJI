import Image from "next/image";

type PropsType = {
    'children'?: React.ReactNode,
    'nameSurah': string,
    'ayat': number,
    'arti': string,
    'tempatTurun': string,
}

const DetailSurahBackground = '/img/details_surah.png'

const SurahDetails = (prop: PropsType) => {
    const { children, nameSurah, ayat, arti, tempatTurun } = prop
    return (
        <div className="ml-3 mr-3 mt-10 mb-28">
            <Image src={DetailSurahBackground} width={330} height={60} alt="ramadhan" className="w-screen" />
            <div className="text-3xl text-white font-bold  text-center -mt-64">
                {nameSurah}
            </div>
            <div className="text-3xl text-white font-semibold  text-center mt-2 ">
                {arti}
            </div>
            <div className="text-3xl text-white font-semibold border-t-2 border-white text-center mt-5 pt-2 relative z-10 w-[20rem] items-center justify-center mx-auto">
                {tempatTurun} . {ayat} Ayat
            </div>
            {children}
            <Image src={"/img/bismillah.png"} width={330} height={60} alt="ramadhan" className="w-64 mx-auto mt-5" />
        </div>
    )
}


export default SurahDetails