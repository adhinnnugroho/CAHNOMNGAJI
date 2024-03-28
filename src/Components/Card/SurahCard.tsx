import Image from "next/image"
import Link from "next/link"

type PropsType = {
    'SurahNumber': any,
    'SurahNameLatin': any,
    'tempatTurun': any,
    'jumlahAyat': any,
    'link'?: string | URL,
    'SurahNameTransliteration': any
}

const SurahNumberBackground = '/img/number_icons.png'


const SurahCard = (prop: PropsType) => {
    const {SurahNumber, SurahNameLatin, tempatTurun,SurahNameTransliteration, link, jumlahAyat} = prop
    return (
        <Link href={link ? link.toString() : `/Surah/${SurahNumber}`}>
            <div className="col-span-1 border-b pb-1 border-b-gray-500">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="flex flex-wrap gap-3">
                            <div className="text-2xl mb-4">
                                <Image src={SurahNumberBackground} width={330} height={60}
                                    alt="ramadhan" className="w-12" />
                                <div className="-mt-[40px] text-center text-[14px]">
                                    {SurahNumber}
                                </div>
                            </div>
                            <div className="block">
                                <h5 className="text-xl font-bold">
                                    {SurahNameLatin}
                                </h5>
                                <p className="text-lg">
                                    {tempatTurun} ({jumlahAyat})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 text-right text-2xl text-purple-500">
                        {SurahNameTransliteration}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SurahCard