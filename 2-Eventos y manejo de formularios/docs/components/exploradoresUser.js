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
function buscarPorNombre() {
    const inputBuscar = document.getElementById('inputBuscar')
    const resultado = document.getElementById('resultadoBusqueda')
    const nombreBuscar = inputBuscar.value.trim().toLowerCase()

    if (nombreBuscar === '') {
        resultado.innerHTML = "<p>⚠️ Ingresa un <strong>NOMBRE</strong></p>"
        return
    }

    // Buscar solo por nombre en const y en localStorage
    const desdeConst = exploradores.filter(e => e.nombre.toLowerCase().includes(nombreBuscar))
    const desdeLocal = (JSON.parse(localStorage.getItem('exploradores')) || [])
        .filter(e => e.nombre.toLowerCase().includes(nombreBuscar))

    // Unificar sin duplicados (por ID)
    const combinados = [...desdeConst, ...desdeLocal]
    const únicos = []
    const idsYa = new Set()

    for (let e of combinados) {
        if (!idsYa.has(e.id)) {
            únicos.push(e)
            idsYa.add(e.id)
        }
    }

    if (únicos.length === 0) {
        resultado.innerHTML = "<p>❌ No se encontró ningún explorador con ese nombre</p>"
    } else {
        resultado.innerHTML = únicos.map(e => `
            <div class="contenedorBusqueda">
                <h2>${e.nombre}</h2>
                <h2>ID: ${e.id}</h2>
                <p class="nave"><strong>Nave: ${e.nave}</strong></p>
                <p class="rango"><strong>Rango: ${e.rango}</strong></p>
            <div>
        `).join('')
    }
}
document.getElementById('botonBuscar').addEventListener('click', buscarPorNombre)


document.addEventListener('DOMContentLoaded', mostrarExploradores);
