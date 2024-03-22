import { retrieveDataCity } from "@/lib/RestApi/ScheduleSholat/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { city }: any = req.query;

        const GetSpesifikCity = await retrieveDataCity(city[1]);
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved data city successfully",
            data: GetSpesifikCity.data.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
