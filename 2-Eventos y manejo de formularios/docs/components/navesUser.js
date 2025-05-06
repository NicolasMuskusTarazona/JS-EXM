import { naves } from '../js/navesData.js';

function mostrarNaves(){
    const contenedor = document.getElementById('navesContainer')
    naves.forEach(nave => {
        const divNave = document.createElement('div')
        divNave.classList.add('nave')
        divNave.innerHTML = `
            <h2>${nave.nombre}</h2>
            <h2>Tecnologia: <br>${nave.tecnologia}</h2>
            <p class="velo"><strong>Velocidad Maxima: ${nave.velocidad_max}</strong></p>
            <p class="exploradores"><strong>Exploradores: ${nave.exploradores}</strong></p>
            <img src="${nave.imagen}" alt="hola">
        `
        contenedor.appendChild(divNave)
    });
}

document.addEventListener('DOMContentLoaded', mostrarNaves);
