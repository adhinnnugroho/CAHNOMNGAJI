import instance from "@/lib/axios/instance";


const SurahService = {
    getAllSurah: () => instance.get('/api/Surah/surah'),
    getDetailsSurah: (id: number) => instance.get(`/api/Surah/surah/${id}`),
}

export default SurahService;