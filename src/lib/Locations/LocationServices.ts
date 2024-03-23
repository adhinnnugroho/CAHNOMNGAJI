import SholatServices from "@/Services/Sholat";

export async function retrieveUserLocations(latitude: number, longitude: number) {
    try {
        const UserLocationResponse = await SholatServices.getUserLocations(latitude, longitude);
        const getUserLocations = UserLocationResponse.data.locationData;
        return getUserLocations;
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}