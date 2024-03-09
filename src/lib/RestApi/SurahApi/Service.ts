import instance from "@/lib/axios/instance";


export async function retrieveData() {
    const Surah = await instance.get(`${process.env.API_URL}`);
    return Surah;
}

export async function retrieveDataByid(IdSurah: number) {
    const DetailsSurah = await instance.get(`${process.env.API_URL}/${IdSurah}`);
    return DetailsSurah;
}