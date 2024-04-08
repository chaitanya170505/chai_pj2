document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const cityName = document.getElementById('cityName');
    const condition = document.getElementById('condition');
    const weatherIcon = document.getElementById('weatherIcon');
    const currentTemp = document.getElementById('currentTemp');
    const windSpeed = document.getElementById('windSpeed');
    const humidity = document.getElementById('humidity');

    searchBtn.addEventListener('click', async () => {
        const location = locationInput.value.trim();
        if (location !== '') {
            try {
                const apiKey = '17f2b2702f20147966ebc2e4a4e8b2d4'; 
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.name && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].icon) {
                    cityName.textContent = data.name;
                    cityName.style.fontSize = '3rem'; 
                    cityName.style.color = 'black'; 
                    condition.textContent = data.weather[0].description;
                    condition.style.fontSize='1.5rem';
                    currentTemp.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
                    currentTemp.style.fontSize='3rem';
                    windSpeed.textContent = `${data.wind.speed} m/s`;
                    humidity.textContent = `${data.main.humidity}%`;
                    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    weatherContainer.style.display = 'grid';
                    welcomeMessage.style.display = 'none';
                    errorMessage.style.display = 'none';
                } else {
                    console.error('Required data properties not found in API response.');
                    errorMessage.style.display = 'block';
                    welcomeMessage.style.display = 'none';
                    weatherContainer.style.display = 'none';
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                errorMessage.style.display = 'block';
                welcomeMessage.style.display = 'none';
                weatherContainer.style.display = 'none';
            }
        }
    });
});
