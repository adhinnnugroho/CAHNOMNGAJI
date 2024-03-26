import { retrieveDataDoa } from "@/lib/Doa/DoaLib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const response = await retrieveDataDoa();

    try {
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved data doa successfully",
            responseDoa: response.data.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
