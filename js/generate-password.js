window.onload = () => {
    let backgroundImage = ["../assets/lavender.jpg", "../assets/river.jpg", "../assets/sky.jpg", "../assets/yellow.jpg"];

    //Cambiar imagen de fondo
    const changeImage = () => {   
        let randomImage = Math.floor((Math.random() * 4));
        document.body.style.backgroundImage = "url('"+backgroundImage[randomImage]+"')";
    }

    setInterval(changeImage, 10000);
}

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