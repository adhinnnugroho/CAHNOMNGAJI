import { retrieveData, retrieveDataByid } from "@/lib/RestApi/SurahApi/Service";
import instance from "@/lib/axios/instance";
import type { NextApiRequest, NextApiResponse } from "next";


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
                    data: DetailsSurah.data.data
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
