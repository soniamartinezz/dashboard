window.onload = () => {
    let backgroundImage = ["../assets/lavender.jpg", "../assets/river.jpg", "../assets/sky.jpg", "../assets/yellow.jpg"];

    //Cambiar imagen de fondo
    const changeImage = () => {   
        let randomImage = Math.floor((Math.random() * 4));
        document.body.style.backgroundImage = "url('"+backgroundImage[randomImage]+"')";
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

    setInterval(changeImage, 10000);
    setInterval(getClock, 1000);

}
