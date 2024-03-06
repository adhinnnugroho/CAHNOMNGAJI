import instance from "@/lib/axios/instance";


const SurahService = {
    getAllSurah: () => instance.get('/api/Surah/surah'),
}

export default SurahService;