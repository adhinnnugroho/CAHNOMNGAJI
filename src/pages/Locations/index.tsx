import SholatServices from "@/Services/Sholat";
import { useEffect, useState } from "react";

const UserLocations = () => {
    const [location, setLocation] = useState<any>(null);
    const [jadwal, setJadwal] = useState<any>(null);
    const [UserLocation, setUserLocation] = useState<any>(null);
    const [city , setcity] = useState<any>(null);
    const GetUserLocations = async (latitude: number, longitude: number) => {
        const data = await SholatServices.getUserLocations(latitude, longitude);
        setUserLocation(data.data.locationData.city);
    }

    const GetCityId = async (city: string) => {
        const data = await SholatServices.getCityId(city);
        setcity(data.data.data);
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
                    GetUserLocations(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                },
                options
            );

        };
        getLocation();
    }, []);

    useEffect(() => {
        if (UserLocation) {
            GetCityId(UserLocation.name);
        }
    }, [UserLocation]);


    return (
        <div>
            <h1>User Locations</h1>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}

            {UserLocation && (
                <div>
                    <p>City: {UserLocation.name}</p>
                </div>
            )}
            {city && (
                <div>
                    <p>CityId: {city.id}</p>
                </div>
            )}
        </div>
    );
}

export default UserLocations;


