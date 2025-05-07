import { naves } from '../js/navesData.js'

function buscarNavePorNombre() {
    const inputBuscar = document.getElementById('inputBuscar')
    const resultado = document.getElementById('resultadoBusqueda')
    const nombreBuscar = inputBuscar.value.trim().toLowerCase()

    if (nombreBuscar === '') {
        resultado.innerHTML = "<p>⚠️ Ingresa un <strong>NOMBRE</strong> de nave</p>"
        return
    }

    const desdeConst = naves.filter(n => n.nombre.toLowerCase().includes(nombreBuscar))
    const desdeLocal = (JSON.parse(localStorage.getItem('naves')) || [])
        .filter(n => n.nombre.toLowerCase().includes(nombreBuscar))

    const combinadas = [...desdeConst, ...desdeLocal]
    const únicas = []
    const idsYa = new Set()

    for (let nave of combinadas) {
        if (!idsYa.has(nave.id)) {
            únicas.push(nave)
            idsYa.add(nave.id)
        }
    }

    if (únicas.length === 0) {
        resultado.innerHTML = "<p>❌ No se encontró ninguna nave con ese nombre</p>"
    } else {
        resultado.innerHTML = únicas.map(nav => `
            <div class="contenedorBusqueda">
                <h3>${nav.nombre}</h3><br>
                <p>Tecnología: ${nav.tecnologia}</p><br>
                <p>Velocidad Máxima: ${nav.velocidad_max}</p><br>
                <p>Exploradores: ${nav.exploradores}</p>
                <img src="${nav.imagen}" alt="Imagen de ${nav.nombre}" style="width: 100%; max-width: 300px; border-radius: 10px;"><br><br>
            </div>
        `).join('')
    }
}

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


document.addEventListener('DOMContentLoaded', () => {
    mostrarNaves()

    const botonBuscar = document.getElementById('botonBuscar')
    botonBuscar.addEventListener('click', buscarNavePorNombre)
})
