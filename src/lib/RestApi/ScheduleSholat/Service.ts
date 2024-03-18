import instance from "@/lib/axios/instance";
export async function retrieveDataSpecificNameCity(latitude: number, longitude: number) {
    const SpecificCityName = await instance.get(`${process.env.REST_API_URL_CITY}?latitude=${latitude}&longitude=${longitude}`);
    return SpecificCityName;
}

export async function retrieveDataScheduleSholatMonthly(CityId: number, Year: number, Month: number) {
    const ScheduleSholat = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${CityId}/${Year}/${Month}`);
    return ScheduleSholat;
}

export async function retrieveDataScheduleSholatDaily(CityId: number, Year: number, Month: number, date: number) {
    const ScheduleSholat = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${CityId}/${Year}/${Month}/${date}`);
    return ScheduleSholat;
}

export async function retrieveDataCity(CityName: String) {
    const SpecificCity = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/kota/cari/${CityName}`);
    return SpecificCity;
}