import { exploradores } from '../js/exploradoresData.js';

function mostrarExploradores(){
    const contenedor = document.getElementById('exploradoresContainer')
    exploradores.forEach(explorador => {
        const divExplorador = document.createElement('div')
        divExplorador.classList.add('explorador')
        divExplorador.innerHTML= `
            <h2>${explorador.nombre}</h2>
            <h2>ID:<br>${explorador.id}</h2>
            <p class="nave"><strong>Nave: ${explorador.nave}</strong></p>
            <p class="rango"><strong>Rango: ${explorador.rango}</strong></p>
        `
        contenedor.appendChild(divExplorador)
    });
}

document.addEventListener('DOMContentLoaded', mostrarExploradores);
