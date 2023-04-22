const x = document.getElementById("map-container");
const latlong = document.getElementById("latlong");
const fetchBtn = document.getElementById("fetch-data-btn");
const weatherContainer = document.getElementById('weather-container');

const loc = document.getElementById('location');
const latlon = document.getElementById('latlon');
const timezone = document.getElementById('timezone');
const windspeed = document.getElementById('windspeed');
const pressure = document.getElementById('pressure');

const winddirection = document.getElementById('winddirection');
const uvindex = document.getElementById('uvindex');
const feelslike = document.getElementById('feelslike');
const temprature = document.getElementById('temprature');
const humidity = document.getElementById('humidity');


function fetchAllData() {
    function showPosition(position) {
        latlong.innerHTML = `<p>Lat: ${position.coords.latitude}</p> <p>Long: ${position.coords.longitude}</p>`;
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const div = document.createElement("p");
        div.innerHTML = `<iframe id="iframe" src="https://maps.google.com/maps?q=${lat},${long}&z=16&output=embed" height="450" width="600"></iframe>`;
        x.appendChild(div);
        const apiKey = '1f83a6aac95ca415fc0dba306cc1227e';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude={part}&appid=${apiKey}`;
// 
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Access other weather data here
                    
                    loc.innerText = `Location: ${data.name}`;
                    latlon.innerHTML = `<p>Lat: ${data.coord.lat}</p><p id="long">Long: ${data.coord.lon}</p>`;
                    timezone.innerText = `Timezone: ${data.timezone} UTC`;
                    windspeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;
                    pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
                    humidity.innerText =`Humidity: ${data.main.humidity} %`;
                    winddirection.innerText = `Wind Direction: ${data.wind.deg} °`;
                    uvindex.innerText =  `UV Index: NA`;
                    temprature.innerText = `Temperature: ${Math.round(data.main.temp - 273.15)} °C `;
                    let c= Math.ceil(data.main.feels_like) - 273.15;
                    feelslike.innerText = `Feels Like: ${c.toFixed(0)} °C`;

                    weatherContainer.style.display = "block";
                    fetchBtn.style.display = "none";

                } else {
                    console.error('Error: Invalid API response format');
                    let errormsg =document.createElement("div");
                    errormsg.textContent = "Invalid API response format";
                    errormsg.style.color = "red";
                    x.appendChild(errormsg);
                    weatherContainer.style.display = "none";
                }
            })
            .catch(error => console.error(error));
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
}

fetchBtn.addEventListener("click", fetchAllData);