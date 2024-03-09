import SurahService from '@/Services/Surah';
import { retrieveDataByid } from '@/lib/RestApi/SurahApi/Service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const SurahDetail = () => {
    const { id } = useRouter().query;
    const [detailSurah, setDetailSurah] = useState([]);


    useEffect(() => {
        const fetchData = async (id: string) => {
            if (id !== undefined) {
                try {
                    const surah = await SurahService.getDetailsSurah(id);
                    console.log(surah);
                    setDetailSurah(surah.data.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
    }, [id])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (SurahId !== undefined) {
    //             const id = parseInt(SurahId);
    //             if (!isNaN(id)) {
    //                 try {
    //                     const surah = await SurahService.getDetailsSurah(id);
    //                     setDetailSurah(surah.data.data);
    //                 } catch (error) {
    //                     console.error('Error fetching data:', error);
    //                 }
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [SurahId]);

    // console.log(detailSurah);

    return (
        <div>
            <h1>Detail Surah</h1>
            <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                {detailSurah && detailSurah.map((surah: any, index: number) => {
                    return (
                        <div key={index}>
                            <Link href={`/surah/${surah.nomor}`}>
                                <div className="col-span-1">
                                    <div className="flex">
                                        <div className="text-2xl mb-6" >
                                            <div className="-mt-[45px] text-center text-xl">
                                                {surah.nomor}
                                            </div>
                                        </div>
                                        <div className="text-2xl ml-5">
                                            {surah.namaLatin} <br />
                                            {surah.arti}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SurahDetail;
