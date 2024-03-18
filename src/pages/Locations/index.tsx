import SholatServices from "@/Services/Sholat";
import { useEffect, useState } from "react";

const UserLocations = () => {
    const [location, setLocation] = useState<any>(null);
    const [jadwal, setJadwal] = useState<any>(null);
    const [City, setCity] = useState<any>(null);
    const GetSpesifikCity = async (latitude: number, longitude: number) => {
        const data = await SholatServices.getUserLocations(latitude, longitude);
        setCity(data.data.CityData);
    }

    useEffect(() => {
        const getLocation = () => {
            const options = {
                enableHighAccuracy: true,
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
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

    return (
        <div>
            <h1>User Locations</h1>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}

            {City && (
                <div>
                    <p>City: {City.name}</p>
                </div>
            )}
        </div>
    );
}

export default UserLocations;
