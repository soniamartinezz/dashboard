//Funciones pre-cargadas al refrescar página
window.onload = () => {
    let backgroundImage = ["./assets/lavender.jpg", "./assets/river.jpg", "./assets/sky.jpg", "./assets/yellow.jpg"];

    //Cambiar imagen de fondo
    const changeImage = () => {   
        let randomImage = Math.floor((Math.random() * 4));
        document.body.style.backgroundImage = "url('"+backgroundImage[randomImage]+"')";
    }

    //Añadir y mostrar links en DOM + guardar en localStorage
    const showLinks = () => {
        const containerLinks = document.getElementById('list-links');
        let listvalues = JSON.parse(localStorage.getItem('links'));

        if(listvalues) {
            containerLinks.innerHTML = '';
            listvalues.forEach((value) => {
                containerLinks.innerHTML += `
                    <a href=${value.url} target='_blank'>
                        ${value.name}
                        <img id=${value.name} src='./assets/close-icon.png' alt='close-icon' onclick="removeLink(id)">
                    </a>
                `;
            });
        }
    }

    //Obtener hora y fecha actual
    const getClock = () => {
        const clock = document.getElementById('clock');
        let now = new Date();
        let day = now.getDate(); 
        let month = now.getMonth()+1;
        let year = now.getFullYear();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        let seconds = now.getSeconds();
        if(seconds < 10){
            seconds = "0" + seconds;
        }

        const arrayQuotes = [
            '¡Buenos días!',
            '¿Cómo va el día?',
            '¡Hora de comer!',
            '¿Cómo va la tarde?',
            '¡Hora de cenar!',
            '¡Ya es hora de dormir!'
        ];

        let quote = '';

        if(hours >= '7' && hours < '10') {
           quote = arrayQuotes[0];
        } else if(hours >= '10' && hours < '14') {
           quote = arrayQuotes[1];
        } else if(hours >= '14' && hours < '16') {
           quote = arrayQuotes[2];
        } else if(hours >= '16' && hours < '21') {
           quote = arrayQuotes[3];
        } else if(hours >= '21' && hours < '23') {
           quote = arrayQuotes[4];
        } else if ((hours >= '23' || hours >= '0') && hours < '7') {
           quote = arrayQuotes[5];
        }

        clock.innerHTML = `
            <h3>${hours}:${minutes}:${seconds}</h3>
            <h4>${day}/${month}/${year}</h4>
            <p class="purple">${quote}</p>
        `;

    }

    //Obtener coordenadas
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
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
                    <img src="./assets/temperatura.png" alt="temperatura" class="temperatura">
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

    setInterval(changeImage, 10000);
    showLinks();
    setInterval(getClock, 1000);
    getLocation();
}

//Añadir nuevo enlace en DOM + guardar en localStorage
document.getElementById('add-link').addEventListener('click', () => {

    const containerLinks = document.getElementById('list-links');
    const linkName = document.getElementById('link-name');
    const linkUrl = document.getElementById('link-url');
    let arrayLinks = JSON.parse(localStorage.getItem('links')) || [];

    if(linkName.value && linkUrl.value){

        arrayLinks.push(
            {
                'name': linkName.value,
                'url': linkUrl.value
            }
        );

        containerLinks.innerHTML += `
            <a href=${linkUrl.value} target='_blank'>
                ${linkName.value}
                <img id=${linkName.value} src='./assets/close-icon.png' alt='close-icon' onclick="removeLink(id, event)">
            </a>
        `;
    
        linkName.value = '';
        linkUrl.value = '';

        localStorage.setItem('links', JSON.stringify(arrayLinks));

        document.getElementById('add-link').disabled = true;
    }

});

//Eliminar link del DOM + localStorage
const removeLink = (id, event) => {
    event.preventDefault();
    let arrayLinks = JSON.parse(localStorage.getItem('links')) || [];
    let linkSelect = document.getElementById(id);
    let parentLinkSelected = linkSelect.parentElement;
    parentLinkSelected.removeAttribute("href");
    parentLinkSelected.remove();

    arrayLinks.splice(arrayLinks.findIndex(({name}) => name == id), 1);
    localStorage.clear();
    localStorage.setItem('links', JSON.stringify(arrayLinks)); 
}

//Check inputs
const checkInput = (id) => {
    let nameError = document.getElementById('errorName');
    let urlError = document.getElementById('errorURL');
    let errorNombre = false;
    let errorURL = false;
    let regex = /^http[s]*:\/\//;

    if (id === 'link-name') {
        if (document.getElementById('link-name').value == null || document.getElementById('link-name').value == ''){
            document.getElementById('link-name').classList.add('red');
            nameError.innerHTML = 'El campo no puede estar vacío';
            errorNombre = true;
        } else {
            document.getElementById('link-name').classList.remove('red');
            nameError.innerHTML = '';
            errorNombre = false;
            errorURL = true;
        }

        if (!errorNombre && !errorURL) {
            document.getElementById('add-link').disabled = false;
        } else {
            document.getElementById('add-link').disabled = true;
        } 
    }
    
    if (id === 'link-url') {
        if (document.getElementById('link-url').value == null || document.getElementById('link-url').value == '') {
            document.getElementById('link-url').classList.add('red');
            urlError.innerHTML = 'El campo no puede estar vacío';
            errorURL = true;
        } else {
            if (regex.test(document.getElementById('link-url').value)) {
                document.getElementById('link-url').classList.remove('red');
                urlError.innerHTML = '';
                errorURL = false;
            } else {
                document.getElementById('link-url').classList.add('red');
                urlError.innerHTML = 'En enlace no es válido';
                errorURL = true;
            }
        }

        if (!errorNombre && !errorURL) {
            document.getElementById('add-link').disabled = false;
        } else {
            document.getElementById('add-link').disabled = true;
        } 
    } 
    
};

//Generar nueva contraseña aleatoria
document.getElementById('get-password').addEventListener('click', () => {
    let numberCharacters = document.getElementById('number-characters');
    let resultPass = document.getElementsByClassName('result-pass')[0];
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '"!@#$%^&*()-_=+"';
    let newPassword = '';

    if(numberCharacters.value >= 12 || numberCharacters.value <=50){
        for(let i=1;i<=numberCharacters.value;i++){
    
            while(newPassword.length < numberCharacters.value){
                newPassword += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
                newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
                newPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
                newPassword += symbols.charAt(Math.floor(Math.random() * symbols.length));
            }
        }
    }

    resultPass.innerHTML = `
        <p>Nueva contraseña:</p>
        <p class="new">${newPassword}</p>
    `;

});

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
                <img src="./assets/temperatura.png" alt="temperatura" class="temperatura">
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
