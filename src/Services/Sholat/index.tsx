import instance from "@/lib/axios/instance";


const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) => instance.get(`/api/Locations/locations/${latitude}/${longitude}`),
    getCityId : (city: string) => instance.get(`/api/Jadwal/city/${city}`)
}

export default SholatServices;