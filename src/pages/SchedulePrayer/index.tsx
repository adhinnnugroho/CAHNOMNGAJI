import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ScheduleCard from "@/Components/Card/ScheduleCard";
import { retrieveScheduleSholatDaily, retrieveSpecificCityData } from "@/lib/Schedule/ScheduleServices";
import { retrieveUserLocations } from "@/lib/Locations/LocationServices";
import { getCoordinatesUser } from "@/lib/Locations/LocationsProviders";
import SkeletonLoading from "@/Components/Loading/SkeletonLoading";
import MobileNavigations from "@/UI/Navigations/MobileNavigations";
import { getDisplayName } from "next/dist/shared/lib/utils";

const FeatSchedulePrayer = () => {
    const { systemTheme, theme } = useTheme();
    const [currentDate] = useState(new Date());


    const currentDateInfo = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    };

    const [SystemTheme, setSystemTheme] = useState<any>(null);
    const [dailyPrayerSchedule, setDailyPrayerSchedule] = useState<any>(null);

    const [City, setCity] = useState<any>(null);

    const [daysInMonth, setDaysInMonth] = useState<{ date: Date; dayName: string; isToday: boolean }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [Today, setToday] = useState<any>(null);
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
                    setCity(cityDataResponse);
                    // Ambil jadwal sholat harian jika ID kota tersedia
                    if (cityDataResponse.id) {
                        const ScheduleSholatResponse = await retrieveScheduleSholatDaily(cityDataResponse.id, currentDateInfo.year, currentDateInfo.month, currentDateInfo.day);
                        setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, [currentDateInfo.year, currentDateInfo.month, currentDateInfo.day, theme, systemTheme]);


    useEffect(() => {
        const currentTheme = theme === 'system' ? systemTheme : theme;
        setSystemTheme(currentTheme);
    }, [theme, systemTheme]);

    const ScheduleSholat = SystemTheme === "dark" ? "bg-gray-500" : "bg-gray-100";
    const backgroundSholat = SystemTheme === "dark" ? "bg-gray-500" : "bg-gray-200";
    const backgroundPrayers = SystemTheme === "dark" ? "bg-gray-600" : "bg-gray-300";

    useEffect(() => {
        const getDaysInMonth = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();
            const days = [];

            for (let day = 0; day <= 6; day++) {
                const date = new Date(year, month, today.getDate() + day - today.getDay());
                const dayName = getDayName(date.getDay());
                const isToday = date.toDateString() === today.toDateString();
                setToday(today.toDateString());
                days.push({ date, dayName, isToday });
            }

            setDaysInMonth(days);
        };

        const getDayName = (dayIndex: number) => {
            const daysOfWeek = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            return daysOfWeek[dayIndex];
        };

        getDaysInMonth();
    }, [currentDate]);

    const changeSchedule = async (date: Date) => {
        setSelectedDate(date);
        setToday(date.toDateString());
        setDaysInMonth(prev => prev.map(day => ({ ...day, isToday: day.date.toDateString() === date.toDateString() })));
        if (City.id) {
            const ScheduleSholatResponse = await retrieveScheduleSholatDaily(City.id, date.getFullYear(), date.getMonth() + 1, date.getDate());
            setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`${ScheduleSholat} h-auto pb-1`}>
                <h5 className="text-2xl ml-4 pt-4 font-bold">
                    Hari ini
                </h5>
                <div className="text-xl ml-4 pt-1 font-semibold">
                    <SkeletonLoading showValue={dailyPrayerSchedule && dailyPrayerSchedule.tanggal} loadingState={loading} loadingValue="10/20/2023" />
                </div>


                <div className='overflow-x-auto scrollbar-hidden mt-10 ml-1'>
                    <div className='flex space-x-1  ml-1'>
                        {daysInMonth.map((day, index) => (
                            <div key={index}>
                                <div className={`border rounded-lg  cursor-pointer ${!selectedDate && Today === day.date.toDateString()
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-gray-700'} 
                
                        ${selectedDate && day.date.toDateString() === selectedDate.toDateString()
                                        ? 'bg-purple-600 border-purple-600' : ''}`} onClick={() => changeSchedule(day.date)}>
                                    <div className="text-center w-12 h-16 mt-3">
                                        <p className='text-xl'>{day.dayName}</p>
                                        <p className='text-xl'>{day.date.getDate()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 p-3 mt-5">
                    <i className='bx bx-current-location text-3xl font-bold'></i>
                    <h5 className="text-left text-2xl font-semibold">
                        <SkeletonLoading showValue={City && City.lokasi} loadingState={loading} loadingValue="BANJARNEGARA" />
                    </h5>
                </div>
            </div>

            <div className={`${backgroundPrayers} mt-5  mb-10`}>
                <div className="grid grid-cols-1 gap-5 ml-2 mr-2 pt-5 pb-10">
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Imsyak" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.imsak)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Subuh" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.subuh)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Dhuha" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.dhuha)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Dzuhur" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.dzuhur)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Ashar" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.ashar)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Maghrib" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.maghrib)} />
                    </div>
                    <div className={`${backgroundSholat} p-2 rounded-lg`}>
                        <ScheduleCard title="Sholat Isya" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.isya)} />
                    </div>
                </div>
            </div>

            <MobileNavigations />
        </>
    );
}

export default FeatSchedulePrayer;
