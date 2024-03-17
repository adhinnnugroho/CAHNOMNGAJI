import { useEffect, useState } from "react";

const UserLocations = () => {
    const [location, setLocation] = useState<any>(null);
    const [jadwal, setJadwal] = useState<any>(null);
    const [City, setCity] = useState<any>(null);
    const EndpointApi = 'https://waktu-sholat.vercel.app/prayer';
    const EndpointApiCity = 'https://waktu-sholat.vercel.app/location';

    const GetJadwalSholat = async (latitude: number, longitude: number) => {
        const response = await fetch(`${EndpointApi}?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        setJadwal(data.prayers);
    }

    const GetSpesifikCity = async (latitude: number, longitude: number) => {
        const response = await fetch(`${EndpointApiCity}?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        setCity(data);
    }

    useEffect(() => {
        const getLocation = () => {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    GetJadwalSholat(latitude, longitude); 
                    GetSpesifikCity(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                },
                options
            );

        };
        getLocation();
    }, []);

    console.log(jadwal);

    return (
        <div>
            <h1>User Locations</h1>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {jadwal && (
                <div>
                    <h2>Jadwal Sholat</h2>
                    <ul>
                        <li>Fajr: {jadwal.terbit}</li>
                        <li>Dhuhr: {jadwal.dzuhur}</li>
                        <li>Asr: {jadwal.ashar}</li>
                        <li>Maghrib: {jadwal.maghrib}</li>
                        <li>Isha: {jadwal.isya}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserLocations;
