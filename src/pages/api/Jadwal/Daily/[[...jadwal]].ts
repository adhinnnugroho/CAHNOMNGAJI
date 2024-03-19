import { retrieveDataCity, retrieveDataScheduleSholatDaily, retrieveDataScheduleSholatMonthly, retrieveDataSpecificNameCity } from "@/lib/RestApi/ScheduleSholat/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { jadwal }: any = req.query;
        const CityId = jadwal[1];
        const Year = jadwal[2];
        const Month = jadwal[3];
        const date = jadwal[4];

        const GetScheduleSholat = await retrieveDataScheduleSholatDaily(CityId, Year, Month, date);
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            data: date
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
