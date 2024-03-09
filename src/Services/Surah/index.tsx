import instance from "@/lib/axios/instance";


const SurahService = {
    getAllSurah: () => instance.get('/api/Surah/surah'),
    getDetailsSurah: (id: String) => instance.get(`/api/Surah/surah/${id}`),
}

export default SurahService;