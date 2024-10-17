import instance from "@/core/lib/axios/instance";

export async function getData(endpoint: string) {
    try {
        const response = await instance.get(`${endpoint}`);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getDataById(endpoint: string, id: number) {
    try {
        const response = await instance.get(`${endpoint}/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        throw error;
    }
}