import { useEffect, useState } from "react";
import DateSlider from "@/UI/Date/DateSlider";
import { useTheme } from "next-themes";
import ScheduleCard from "@/Components/Card/ScheduleCard";
import { retrieveScheduleSholatDaily, retrieveSpecificCityData } from "@/lib/Schedule/ScheduleServices";
import { retrieveUserLocations } from "@/lib/Locations/LocationServices";
import AppLayout from "@/Layout/App";
import { getCoordinatesUser } from "@/lib/Locations/LocationsProviders";
import SkeletonLoading from "@/Components/Loading/SkeletonLoading";

const UserLocations = () => {
    const { systemTheme, theme } = useTheme();
    const currentDate: Date = new Date();

    const GetDate = {
        'day': currentDate.getDate(),
        'month': currentDate.getMonth() + 1,
        'year': currentDate.getFullYear()
    };

    const [SystemTheme, setSystemTheme] = useState<any>(null);
    const [JadwalDaily, setJadwalDaily] = useState<any>(null);
    const [CityId, setCityId] = useState<any>(null);
    const [City, setCity] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mendapatkan koordinat pengguna
                const coordinates = await getCoordinatesUser() as [number, number];
                const [latitude, longitude] = coordinates;

                // Mendapatkan lokasi pengguna
                const UserLocationsResponse = await retrieveUserLocations(latitude, longitude);

                // Jika lokasi pengguna sudah didapatkan, ambil ID kota
                if (UserLocationsResponse.city) {
                    const cityDataResponse = await retrieveSpecificCityData(UserLocationsResponse.city.name);
                    setCity(cityDataResponse.lokasi);
                    setCityId(cityDataResponse.id);

                    // Ambil jadwal sholat harian jika ID kota tersedia
                    if (cityDataResponse.id) {
                        const ScheduleSholatResponse = await retrieveScheduleSholatDaily(cityDataResponse.id, GetDate.year, GetDate.month, GetDate.day);
                        setJadwalDaily(ScheduleSholatResponse.jadwal);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, [GetDate.year, GetDate.month, GetDate.day, theme, systemTheme]);


    useEffect(() => {
        const currentTheme = theme === 'system' ? systemTheme : theme;
        setSystemTheme(currentTheme);
    }, [theme, systemTheme]);

    const ScheduleSholat = SystemTheme === "dark" ? "bg-gray-500" : "bg-gray-100";
    const BorderScheduleSholat = SystemTheme === "dark" ? "border-gray-500" : "border-gray-200";
    const BorderScheduleSholatDaily = SystemTheme === "dark" ? "border-gray-500" : "border-gray-200";

    return (
        <AppLayout NavigationType="Back" linkNavigation="/Home" NavbarTitle="">
            <DateSlider cityId={CityId} year={GetDate.year} month={GetDate.month} />
            <div className={`${ScheduleSholat} mt-10 ml-2 mr-2 rounded-lg`}>
                <div className="flex flex-wrap gap-2 p-3 border-b border-gray-700">
                    <i className='bx bx-current-location text-3xl font-bold'></i>
                    <h5 className="text-left text-2xl font-semibold">
                        <SkeletonLoading showValue={City} loadingState={loading} loadingValue="BANJARNEGARA" />
                    </h5>
                </div>

                <div className="block p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`text-center  text-xl border ${BorderScheduleSholat} border-r-gray-700`}>
                            Waktu Imsak
                            <h5 className="text-3xl font-bold mt-3 mb-3">
                                <SkeletonLoading showValue={JadwalDaily && JadwalDaily.imsak} loadingState={loading} loadingValue="50:00" />
                            </h5>
                        </div>
                        <div className=" text-center text-xl ">
                            Waktu Berbuka
                            <h5 className="text-3xl font-bold mt-3 mb-3">
                                <SkeletonLoading showValue={JadwalDaily && JadwalDaily.maghrib} loadingState={loading} loadingValue="50:00" />
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${ScheduleSholat} mt-10 ml-2 mr-2 rounded-lg mb-20`}>
                <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4 mt-5`}>
                        <ScheduleCard title="Sholat Subuh" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.subuh)} />
                    </div>
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4`}>
                        <ScheduleCard title="Sholat Dhuha" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.dhuha)} />
                    </div>
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4`}>
                        <ScheduleCard title="Sholat Dzuhur" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.dzuhur)} />
                    </div>
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4`}>
                        <ScheduleCard title="Sholat Ashar" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.ashar)} />
                    </div>
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4`}>
                        <ScheduleCard title="Sholat Maghrib" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.maghrib)} />
                    </div>
                    <div className={`border ${BorderScheduleSholatDaily} border-b-gray-300 pb-4`}>
                        <ScheduleCard title="Sholat Isya" Jadwal={loading ? "Loading..." : (JadwalDaily && JadwalDaily.isya)} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default UserLocations;
