import SholatServices from "@/services/Sholat";

export async function retrieveSpecificCityData(city: string) {
    try {
        const cityDataResponse = await SholatServices.getCityId(city);;
        const cityData = cityDataResponse.data.data[0];

        return cityData;
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}

export async function retrieveScheduleSholatDaily(cityId: number, year: number, month: number, date: number) {

    try {
        const scheduleSholatResponse = await SholatServices.getScheduleSholatDaily(cityId, year, month, date);
        const GetDataDailyScheduleSholat = scheduleSholatResponse.data.data.data;
        return GetDataDailyScheduleSholat;
    } catch (error) {
        console.error('Error retrieving daily prayer schedule:', error);
        throw new Error('Failed to retrieve daily prayer schedule');
    }

}