import AppLayout from "@/Layout/App"
import SurahService from "@/Services/Surah"
import Image from "next/image"
import { useEffect, useState } from "react"

const HomeScreen = () => {

    const [surah, setSurah] = useState([])

    const getSurah = async () => {
        const surah = await SurahService.getAllSurah();
        setSurah(surah.data.data);
    }


    useEffect(() => {
        getSurah();
    })


    return (
        <AppLayout>
            <div className="mt-5 ml-5 font-semibold text-2xl">
                Asslamualaikum

            </div>
            <div className="ml-2 mr-2 mt-10">
                <Image src={"/img/last_read.png"}
                    width={330}
                    height={60}
                    alt="ramadhan"
                    className="w-screen" />
            </div>

            <div className="mt-5 ml-3 mb-5">
                <div className="grid grid-cols-4 gap-7">
                    <div className="col-span-1 text-2xl text-purple-600 border-2 border-gray-100 
                    border-b-purple-600 font-bold">
                        Surah
                    </div>
                    <div className="col-span-1 text-2xl">
                        Para
                    </div>
                    <div className="col-span-1 text-2xl">
                        Page
                    </div>
                    <div className="col-span-1 text-2xl">
                        Hijb
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-5">
                    {surah && surah.map((surah: any, index: number) => {
                        return (
                            <div className="col-span-1" key={index}>
                                {surah.nomor} {surah.namaLatin} <br />
                                {surah.arti}
                            </div>
                        )
                    })}
                </div>
            </div>

        </AppLayout>
    )
}

export default HomeScreen