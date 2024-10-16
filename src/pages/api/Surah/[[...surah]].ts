
import { retrieveAllDataSurah, retrieveDataSurahByid } from "@/core/utils/SurahUtils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { surah }: any = req.query;
        const SurahId = surah ? surah[1] : null;
        const data = SurahId ? await retrieveDataSurahByid(SurahId) : await retrieveAllDataSurah();
    
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Surah retrieved data successfully",
            data:  data.data.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
