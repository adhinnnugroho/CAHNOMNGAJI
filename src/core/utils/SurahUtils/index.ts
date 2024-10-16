import instance from "@/lib/axios/instance";
import SurahService from "@/services/surah";
export async function retrieveAllDataSurah() {
    const response = await instance.get(`${process.env.REST_API_URL}`);
    return response;
}

export async function retrieveDataSurahByid(IdSurah: number) {
    const DetailsSurah = await instance.get(`${process.env.REST_API_URL}/${IdSurah}`);
    return DetailsSurah;
}

export async function retrieveDataSurah() {
    const DataSurah = await SurahService.getAllSurah();
    return DataSurah.data.data;
}

export async function retrieveDataDetailsSurah(SurahId: number) {
    const DataSurah = await SurahService.getDetailsSurah(SurahId);
    return DataSurah.data.data;
}