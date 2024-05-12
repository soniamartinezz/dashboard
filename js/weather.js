window.onload = () => {
    let backgroundImage = ["../assets/lavender.jpg", "../assets/river.jpg", "../assets/sky.jpg", "../assets/yellow.jpg"];

    //Cambiar imagen de fondo
    const changeImage = () => {   
        let randomImage = Math.floor((Math.random() * 4));
        document.body.style.backgroundImage = "url('"+backgroundImage[randomImage]+"')";
    }

    setInterval(changeImage, 10000);
}

//Obtener coordenadas
const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
}

//Obtener ubicación según coordenadas
const showPosition = async (position) => {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=es`);
    const elements = await response.json();
    const { city } = elements;
    await getWeather(city);
}  

//Obtenemos el tiempo
const getWeather = async (location) => {

    const apiKey = '6524ab62dab446bc83a200613231112';
    const city = location;
    const containerWeather = document.getElementById('weather');

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&forecastday`);

        const items = await response.json();

        const { location, current} = items;
        const { country } = location;
        const { condition: {text, icon}, temp_c, precip_in, humidity, wind_mph } = current;

        getFutureWeather(apiKey, city);

        containerWeather.innerHTML = '';
        containerWeather.innerHTML += `
            <div class="head">
                <div>
                    <h4>${city} / ${country}</h4>
                    <h4 class="yellow">${text}</h4>
                </div>
                <button type="button" id="location" onclick="getLocation()">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
            </div>
            <div class="current-weather">
                <img src=http:${icon} alt=${text}>
                <h4>${temp_c}</h4>
                <img src="../assets/temperatura.png" alt="temperatura" class="temperatura">
                <div class="more-info">
                    <h4 class="grey">Precipitaciones: ${precip_in}%</h4>
                    <h4 class="grey">Humedad: ${humidity}%</h4>
                    <h4 class="grey">Viento: ${wind_mph}km/h</h4>
                </div>
            </div>
        `;
    } catch (error){
        throw error;
    }

}

const getFutureWeather = async (apiKey, city) => {

    try {
    
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`);
            
        const elements = await res.json();

        let results = elements.forecast.forecastday[0].hour;

        const containerWeather = document.getElementById('weather');
        const futureWeather = document.createElement("div");
        futureWeather.classList.add('future-weather');
        containerWeather.appendChild(futureWeather);

        results.forEach(result => {
            let timeFuture = result.time.split(' ')[1];
            futureWeather.innerHTML += `
                <div>
                    <h4 class="yellow">${timeFuture}</h4>
                    <img src=https:${result.condition.icon} alt=${result.temp_c}>
                    <h4 class="yellow">${result.temp_c}</h4>
                </div>
            `;
        });

        return futureWeather;

    } catch (error){
        throw error;
    }
}

getLocation();