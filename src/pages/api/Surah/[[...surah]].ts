import { getData, getDataById } from "@/services/ApiServices";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const endpoint = `${process.env.REST_API_URL}`;
        const { surah }: any = req.query;
        const SurahId = surah ? surah[1] : null;
        const SurahResponse = SurahId ? await getDataById(endpoint,SurahId) : await getData(endpoint);
        const SurahData = SurahResponse.data;

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Surah retrieved data successfully",
            data:  SurahData.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
