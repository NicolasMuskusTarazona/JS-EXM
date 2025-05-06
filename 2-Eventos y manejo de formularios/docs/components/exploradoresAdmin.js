import { exploradores } from "../js/exploradoresDataAdmin.js";

function agregar() {
    const agregarExplorador = document.getElementById('agregarExplorador'); // <- este puede ser null
    agregarExplorador.classList.add('agregarExplorador')
    const contenedor = document.getElementById('exploradoresContainerAdmin');
    const inputContenedor = document.createElement('div');
    inputContenedor.id = 'inputContenedor';
    agregarExplorador.addEventListener("click", () => {
        if (!document.getElementById('nuevoInput')) {
            const input = document.createElement('input');
            input.id = 'nuevoInput';
            input.placeholder = "Ingresa el nombre del explorador";
            inputContenedor.appendChild(input);

            const inputNaveExplorador = document.createElement('input');
            inputNaveExplorador.id = 'nuevoInput';
            inputNaveExplorador.placeholder = "Ingresa la Nave del explorador";
            inputContenedor.appendChild(inputNaveExplorador);

            const inputRangoExplorador = document.createElement('input');
            inputRangoExplorador.id = 'nuevoInput'
            inputRangoExplorador.placeholder = "Ingresa el Rango del explorador"
            inputContenedor.appendChild(inputRangoExplorador)
            
            const botonGuardar = document.createElement('button');
            botonGuardar.classList.add('botonGuardar')
            botonGuardar.textContent = "Guardar";
            agregarExplorador.appendChild(inputContenedor);
            inputContenedor.appendChild(botonGuardar);
            // Al hacer clic en "Guardar", guardamos el valor en localStorage
            botonGuardar.addEventListener("click", () => {
                const nombre = input.value.trim();
                const naveExplorador = inputNaveExplorador.value.trim()
                const rangoExplorador = inputRangoExplorador.value.trim()
                if (nombre,naveExplorador,rangoExplorador) {
                    // Guardamos el nuevo explorador en localStorage
                    const nuevosExploradores = JSON.parse(localStorage.getItem('exploradores')) || [];
                    nuevosExploradores.push({ nombre: nombre, id: Date.now(), nave: naveExplorador, rango: rangoExplorador });
                    localStorage.setItem('exploradores', JSON.stringify(nuevosExploradores));
                    mostrarExploradores();  // Volver a mostrar todos los exploradores, incluyendo el nuevo
                    // Limpiar el input
                    input.value = ''
                    inputNaveExplorador.value = ''
                    inputRangoExplorador.value = ''
                } else {
                    alert("Por favor ingresa un nombre valido.");
                }
            });
        }
    });
}

function eliminar() {
    const eliminarExplorador = document.getElementById('eliminarExplorador');
    const inputContenedorEliminar = document.getElementById('inputContenedorEliminar');

    eliminarExplorador.addEventListener("click", () => {
        if (!document.getElementById('nuevoInputEliminar')) {
            const inputEliminar = document.createElement('input');
            inputEliminar.min = 0;
            inputEliminar.type = "number";
            inputEliminar.id = 'nuevoInputEliminar';
            inputEliminar.placeholder = "Ingrese el ID del explorador";
            
            const advertencia = document.createElement('h1')

            const botonGuardarEliminar = document.createElement('button');
            botonGuardarEliminar.classList.add('botonGuardar');
            botonGuardarEliminar.textContent = "Guardar";


            inputContenedorEliminar.appendChild(advertencia);
            inputContenedorEliminar.appendChild(inputEliminar);
            inputContenedorEliminar.appendChild(botonGuardarEliminar);
            

            botonGuardarEliminar.addEventListener("click", () => {
                const valorEliminar = parseInt(inputEliminar.value.trim());

                if (!isNaN(valorEliminar)) {
                    const borrarExplorador = JSON.parse(localStorage.getItem('exploradores')) || [];
                    const actualizados = borrarExplorador.filter(explo => explo.id !== valorEliminar);
                    localStorage.setItem('exploradores', JSON.stringify(actualizados));
                    mostrarExploradores();
                    inputEliminar.value = '';
                } else {
                    advertencia.innerHTML= "Por favor ingrese un ID valido "
                }
            });
        }
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
class EditarExplorador extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                max-width: 420px;
                margin:auto;
                padding: 1rem;
                background: #0b0b0b;
                color: white;
                font-family: 'Orbitron', sans-serif;
                border: 2px solid #00aaff;
                border-radius: 12px;
                box-shadow: 0 0 20px rgba(0, 170, 255, 0.5);
                text-align: center;
                overflow: hidden; /* Evita desbordamiento */
            }
    
            h2 {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #00aaff;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(0, 170, 255, 0.7);
            }
    
            input {
                width: 100%;
                margin: 0.5rem 0;
                padding: 12px;
                font-size: 1rem;
                border: 1px solid #00aaff;
                border-radius: 6px;
                background-color: #1f1f1f;
                color: white;
                box-shadow: inset 0 0 5px rgba(0, 170, 255, 0.5);
                box-sizing: border-box; /* Asegura que el padding no cause desbordamiento */
            }
    
            input::placeholder {
                color: rgba(0, 170, 255, 0.6);
            }
    
            button {
                width: 100%;
                margin-top: 1rem;
                padding: 12px;
                font-size: 1.1rem;
                font-weight: bold;
                background-color: #00aaff;
                color: white;
                border: none;
                border-radius: 6px;
                box-shadow: 0 0 10px rgba(0, 170, 255, 0.5);
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }
    
            button:hover {
                background-color: #0088cc;
                transform: scale(1.05);
            }
        </style>
    
        <h2>Actualizar Explorador</h2>
        <div id="inputContenedorEditar">
            <input id="inputNombreActual" placeholder="Nombre actual del explorador">
            <input id="inputNuevoNombre" placeholder="Nuevo nombre">
            <input id="inputIDactual" placeholder="ID actual">
            <input id="inputNuevoID" placeholder="Nuevo ID">
            <input id="inputNaveactual" placeholder="Nave actual">
            <input id="inputNuevoNave" placeholder="Nuevo Nave">
            <button id="botonGuardarEditar">Guardar cambios</button>
        </div>
    `;
    

        const $ = id => this.shadowRoot.getElementById(id);

        const inputNombre = $('inputNombreActual');
        const inputNuevoNombre = $('inputNuevoNombre');
        const inputID = $('inputIDactual');
        const inputNuevoID = $('inputNuevoID');
        const inputNave = $('inputNaveactual');
        const inputNuevoNave = $('inputNuevoNave');
        const botonGuardar = $('botonGuardarEditar');

        botonGuardar.addEventListener("click", () => {
            const nombreActual = inputNombre.value.trim().toLowerCase();
            const nuevoNombre = inputNuevoNombre.value.trim();
            const nombreNave = inputNave.value.trim().toLowerCase();
            const nuevoNave = inputNuevoNave.value.trim();
            const IDactual = inputID.value.trim();
            const nuevoID = inputNuevoID.value.trim();

            const exploradores = JSON.parse(localStorage.getItem('exploradores')) || [];

            const index = exploradores.findIndex(ex => {
                const nombreCoincide = !nombreActual || ex.nombre.toLowerCase() === nombreActual;
                const idCoincide = !IDactual || ex.id === Number(IDactual);
                const naveCoincide = !nombreNave || ex.nave.toLowerCase() === nombreNave;
                return nombreCoincide && idCoincide && naveCoincide;
            });

            if (index === -1) {
                alert("No se encontró un explorador que coincida con esos datos");
            } else {
                if (nuevoNombre) exploradores[index].nombre = nuevoNombre;
                if (nuevoID) exploradores[index].id = Number(nuevoID);
                if (nuevoNave) exploradores[index].nave = nuevoNave;

                localStorage.setItem('exploradores', JSON.stringify(exploradores));
                alert("Explorador actualizado correctamente");

                // 🔁 Esto deberías definirlo fuera del componente
                if (typeof mostrarExploradores === "function") mostrarExploradores();

                inputNombre.value = '';
                inputNuevoNombre.value = '';
                inputNuevoID.value = '';
                inputID.value = '';
                inputNuevoNave.value = '';
                inputNave.value = '';
            }
        });
    }
}

customElements.define('editar-explorador', EditarExplorador);

function mostrarExploradores() {
    const contenedor = document.getElementById('exploradoresContainerAdmin');
    contenedor.classList.add('exploradoresContainerAdmin')
    contenedor.innerHTML = '';  // Limpiar el contenedor antes de mostrar los exploradores
    // Recuperar exploradores del localStorage
    const exploradoresGuardados = JSON.parse(localStorage.getItem('exploradores')) || [];
    exploradoresGuardados.forEach(explorador => {
        const divExplorador = document.createElement('div');
        divExplorador.classList.add('explorador');
        divExplorador.innerHTML = `
            <h2>${explorador.nombre}</h2>
            <h2>ID:<br>${explorador.id}</h2>
            <p class="nave"><strong>Nave: ${explorador.nave}</strong></p>
            <p class="rango"><strong>Rango: ${explorador.rango}</strong></p>
        `;
        contenedor.appendChild(divExplorador);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarExploradores();
    agregar();
    eliminar();
    editar();
    buscarPorNombre()
});

console.log(JSON.parse(localStorage.getItem('exploradores')));