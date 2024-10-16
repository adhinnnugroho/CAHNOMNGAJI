import instance from "@/lib/axios/instance";

const LocationsEndPoint = "/api/Locations";
const LocationsCoordinatsEndPoint = LocationsEndPoint + "/Coordinats/locations";
const SholatSheduleMonthlyEndPoint = "/api/Jadwal/Monthly/jadwal";
const SholatSheduleDailyEndPoint = "/api/Jadwal/Daily/jadwal";

const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) => instance.get(LocationsCoordinatsEndPoint + `/${latitude}/${longitude}`),
    getCityId: (city: string) => instance.get(LocationsEndPoint + `/City/city/${city}`),
    getScheduleSholatMonthly: (cityId: number, year: number, month: number) => instance.get(SholatSheduleMonthlyEndPoint + `/${cityId}/${year}/${month}`),
    getScheduleSholatDaily: (cityId: number, year: number, month: number, date: number) => instance.get(SholatSheduleDailyEndPoint + `/${cityId}/${year}/${month}/${date}`)
};

export default SholatServices;
