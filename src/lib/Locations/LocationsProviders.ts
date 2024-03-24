
export async function getCoordinatesUser() {
    return new Promise((resolve, reject) => {
        const options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve([latitude, longitude]);
            },
            (error) => {
                console.error(error.message);
                reject(error);
            },
            options
        );
    });
}