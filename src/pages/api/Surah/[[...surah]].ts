import { retrieveData, retrieveDataByid } from "@/lib/RestApi/SurahApi/Service";
import instance from "@/lib/axios/instance";
import type { NextApiRequest, NextApiResponse } from "next";



// Dalam Next.js, ketika Anda melihat nama file seperti [[...namafile]].ts, itu adalah karena penggunaan 
// "Dynamic Routes" dan penggunaan TypeScript.

// 1. Dynamic Routes: Tanda kurung siku ganda [[]] menandakan bahwa ini adalah rute dinamis di Next.js. 
// Ini berarti bahwa bagian dari URL akan berubah sesuai dengan nilai yang diberikan. Misalnya, 
// jika  memiliki [[...namafile]].ts, itu berarti namafile dapat berubah sesuai dengan permintaan pengguna.


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const { surah }:any = req.query;
            if(surah[1]) {
                const id = surah[1];
                const DetailsSurah = await retrieveDataByid(id);
                res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: "Surah retrieved data successfully",
                    data: DetailsSurah.data.data.ayat
                })
            }else{
                const Surah = await retrieveData();
                res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: "Surah retrieved data successfully",
                    data: Surah.data.data
                })
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
