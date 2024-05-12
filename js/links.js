window.onload = () => {
    let backgroundImage = ["../assets/lavender.jpg", "../assets/river.jpg", "../assets/sky.jpg", "../assets/yellow.jpg"];

    //Cambiar imagen de fondo
    const changeImage = () => {   
        let randomImage = Math.floor((Math.random() * 4));
        document.body.style.backgroundImage = "url('"+backgroundImage[randomImage]+"')";
    }

    // Añadir y mostrar links en DOM + guardar en localStorage
    const showLinks = () => {
        const containerLinks = document.getElementById('list-links');
        let listvalues = JSON.parse(localStorage.getItem('links'));

        if(listvalues) {
            containerLinks.innerHTML = '';
            listvalues.forEach((value) => {
                containerLinks.innerHTML += `
                    <a href=${value.url} target='_blank'>
                        ${value.name}
                        <img id=${value.name} src='../assets/close-icon.png' alt='close-icon' onclick="removeLink(id)">
                    </a>
                `;
            });
        }
    }

    setInterval(changeImage, 10000);
    showLinks();

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
                <img id=${linkName.value} src='../assets/close-icon.png' alt='close-icon' onclick="removeLink(id, event)">
            </a>
        `;
    
        linkName.value = '';
        linkUrl.value = '';

        localStorage.setItem('links', JSON.stringify(arrayLinks));

        document.getElementById('add-link').disabled = true;
    }

});

//Elininar link del DOM + localStorage
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

