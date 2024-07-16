document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const weatherResult = document.getElementById('weather-result');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');

    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = locationInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        const apiKey = 'f341fe0a160cca2769f69726152b63cd'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayWeather(data) {
        console.log(data); // Add this line to debug the API response
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        
        // Construct the icon URL and set the src attribute
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Use @2x for better resolution
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description; // Set alt text for better accessibility

        weatherResult.style.display = 'block';
    }
});
