import SurahService from '@/Services/Surah';
import { retrieveDataByid } from '@/lib/RestApi/SurahApi/Service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image"

import { useEffect, useState } from 'react';
import BackNavigations from '@/UI/Navigations/BackNavigations';

const SurahDetail = () => {
    const { id } = useRouter().query;
    const [detailSurah, setDetailSurah] = useState([]);
    const [surah, setSurah] = useState<any>([]);


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
        }

        fetchData(id as string);
    })


    return (
        <div>
            <BackNavigations SurahName={surah && surah.namaLatin} link="/Home" />

            <div className="ml-3 mr-3 mt-10 mb-72">
                <Image src={"/img/details_surah.png"}
                    width={330}
                    height={60}
                    alt="ramadhan"
                    className="w-screen" />

                <div className="text-3xl text-white font-bold  text-center -mt-64">
                    {surah && surah.namaLatin}
                </div>
                <div className="text-3xl text-white font-semibold  text-center mt-2 ">
                    {surah.arti}
                </div>
                <div className="text-3xl text-white font-semibold border-t-2 border-white text-center mt-5 pt-2
                relative z-10 w-[20rem] items-center justify-center mx-auto">
                    {surah.tempatTurun} . {surah.jumlahAyat} Ayat
                </div>
                <Image src={"/img/bismillah.png"}
                    width={330}
                    height={60}
                    alt="ramadhan"
                    className="w-64 mx-auto mt-5" />
            </div>
            {/* <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                {detailSurah && detailSurah.map((surah: any, index: number) => {
                    return (
                        <div key={index}>
                            <Link href={`/surah/${surah.nomorAyat}`}>
                                <div className="col-span-1">
                                    <div className="flex">
                                        <div className="text-2xl mb-6" >
                                            <div className="-mt-[45px] text-center text-xl">
                                                {surah.nomorAyat}
                                            </div>
                                        </div>
                                        <div className="text-2xl ml-5">
                                            {surah.teksArab} <br />
                                            {surah.teksLatin}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div> */}
        </div>
    );
};

export default SurahDetail;
