import { planetas } from '../js/planetasData.js';

function mostrarPlanetas(){
    const contenedor = document.getElementById('planetasContainer')
    planetas.forEach(planeta => {
        const divPlaneta = document.createElement('div')
        divPlaneta.classList.add('planeta')
        divPlaneta.innerHTML = `
            <h2>${planeta.nombre}</h2>
            <h2>Sistema: <br>${planeta.sistema}</h2>
            <p class="tipo"><strong>Tipo: ${planeta.tipo}</strong></p>
            <p class="exploradores"><strong>Exploradores: ${planeta.exploradores}</strong></p>
            <img src="${planeta.imagen}" alt="hola">
        `
        contenedor.appendChild(divPlaneta)
    });
}

document.addEventListener('DOMContentLoaded', mostrarPlanetas);
