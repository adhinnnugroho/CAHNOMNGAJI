import instance from "@/core/lib/axios/instance";

const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) =>
        instance.get(`/api/Locations/Coordinats/locations/${latitude}/${longitude}`),

    getCityId: (city: string) =>
        instance.get(`/api/Locations/City/city/${city}`),

    getScheduleSholatMonthly: (cityId: number, year: number, month: number) =>
        instance.get(`/api/Jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),

    getScheduleSholatDaily: (cityId: number, year: number, month: number, date: number) =>
        instance.get(`/api/Jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`)
};

export default SholatServices;
