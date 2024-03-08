import instance from "@/lib/axios/instance";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {

            const Surah = await instance.get(`${process.env.API_URL}`);
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Surah retrieved data successfully",
                data: Surah.data.data
            })
            // if (id === '') {
            //     const Surah = await instance.get(`${process.env.API_URL}`);
            //     res.status(200).json({
            //         status: true,
            //         statusCode: 200,
            //         message: "Surah retrieved data successfully",
            //         data: Surah.data.data
            //     })
            // } else {
            //     const Surah = await instance.get(`${process.env.API_URL}/${id}`);
            //     res.status(200).json({
            //         status: true,
            //         statusCode: 200,
            //         message: "Surah retrieved data successfully",
            //         data: Surah.data.data
            //     })
            // }
        } catch (error) {
            console.error("Error while fetching data:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
