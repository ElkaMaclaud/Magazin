export const getCountryFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru&key=bdc_7c2bb644f00c4072bbc327c769ff74fb`);
    const data = await response.json();
    const country = data.countryName + " " + data.city;
    return country;
  } catch (error) {
    console.log('Ошибка при получении страны:', error);
    return '';
  }
};

export const CountryFromCoordinates = () => {
  return new Promise((resolve, reject) => {
    const handleGetPosition = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getCountryFromCoordinates(latitude, longitude)
        .then((country) => {
          resolve(country); 
        })
        .catch((error) => {
          reject(error); 
        });
    };

    const handleGetError = (error: GeolocationPositionError) => {
      reject(error);
    };

    navigator.geolocation.getCurrentPosition(handleGetPosition, handleGetError);
  });
};








