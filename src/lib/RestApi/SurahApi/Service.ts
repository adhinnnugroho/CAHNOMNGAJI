import instance from "@/lib/axios/instance";
export async function retrieveData() {
    const response = await instance.get(`${process.env.REST_API_URL}`);
    return response;
}

export async function retrieveDataByid(IdSurah: string) {
    const DetailsSurah = await instance.get(`${process.env.REST_API_URL}/${IdSurah}`);
    return DetailsSurah;
}