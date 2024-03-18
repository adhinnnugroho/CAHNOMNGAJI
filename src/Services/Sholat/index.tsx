import instance from "@/lib/axios/instance";


const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) => instance.get(`/api/Locations/city/${latitude}/${longitude}`),
    getDetailsSurah: (id: String) => instance.get(`/api/Surah/surah/${id}`),
}

export default SholatServices;