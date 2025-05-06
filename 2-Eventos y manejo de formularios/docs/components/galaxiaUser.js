import { galaxias } from '../js/galaxiasData.js';

function mostrarGalaxia(){
    const contenedor = document.getElementById('galaxiaContainer')
    galaxias.forEach(galaxi => {
        const divGalaxia = document.createElement('div')
        divGalaxia.classList.add('galaxia')
        divGalaxia.innerHTML = `
            <h2>${galaxi.nombre}</h2>
            <h2>Ubicacion: <br>${galaxi.ubicacion}</h2>
            <p class="estrellas"><strong>Numero estrellas : ${galaxi.numero_estrellas}</strong></p>
            <p class="planetas"><strong>Planetas: ${galaxi.planetas}</strong></p>
            <img src="${galaxi.imagen}" alt="hola">
        `
        contenedor.appendChild(divGalaxia)
    });
}

document.addEventListener('DOMContentLoaded', mostrarGalaxia);
