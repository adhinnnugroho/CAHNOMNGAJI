import instance from "@/lib/axios/instance";


const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) => instance.get(`/api/Locations/locations/${latitude}/${longitude}`),
    getCityId : (city: string) => instance.get(`/api/City/city/${city}`),
    GetScheduleSholatMonthly: (cityId: number, year: number, month: number) => instance.get(`/api/Jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),
    GetScheduleSholatDaily: (cityId: number, year: number, month: number, date: number) => instance.get(`/api/Jadwal/Daily/jadwal/${cityId}/${year}/${month}`)
}

export default SholatServices;