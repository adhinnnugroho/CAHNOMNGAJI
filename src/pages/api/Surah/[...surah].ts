import instance from "@/lib/axios/instance";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const response = await instance.get('https://equran.id/api/v2/surat');
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
