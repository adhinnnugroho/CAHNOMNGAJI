import instance from "@/lib/axios/instance";

const SurahService = {
    getAllSurah: () => instance.get('/api/surah/surah'),
    getDetailsSurah: (id: number) => instance.get(`/api/surah/surah/${id}`),
}

export default SurahService