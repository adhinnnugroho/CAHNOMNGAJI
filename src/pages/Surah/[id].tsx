import SurahService from '@/Services/Surah';
import { retrieveDataByid } from '@/lib/RestApi/SurahApi/Service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Penjelasan nama file 
// kenapa nama filenya [id].tsx?
// karena di next.js itu tidak bisa seperti di laravel yang langsung bisa di ambil jika kita set parameter melalui url
// di next.js itu ada namanya Dynamic Routes untuk menggunakan Dynamic Routes harus menggunakan [namafile] 
// kalau enggak pakai [] maka kita tidak bisa get semua parameter yang dikirim via url

const SurahDetail = () => {
    const { id } = useRouter().query;
    const [detailSurah, setDetailSurah] = useState([]);


    useEffect(() => {
        const fetchData = async (id: string) => {
            if (id !== undefined) {
                try {
                    const surah = await SurahService.getDetailsSurah(id);
                    setDetailSurah(surah.data.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }

        fetchData(id as string);
    })


    return (
        <div>
            <h1>Detail Surah</h1>
            <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
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
            </div>
        </div>
    );
};

export default SurahDetail;
