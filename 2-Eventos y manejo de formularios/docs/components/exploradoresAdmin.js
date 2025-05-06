import { exploradores } from'../js/exploradoresDataAdmin.js';

function agregar() {
    const agregarExplorador = document.getElementById('agregarExplorador');
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
function eliminar(){
    const eliminarExplorador = document.getElementById('eliminarExplorador')
    eliminarExplorador.classList.add('eliminarExplorador')
    const inputContenedorEliminar = document.createElement('div')
    inputContenedorEliminar.id = 'inputContenedorEliminar';
    eliminarExplorador.addEventListener("click",()=>{
        if(!document.getElementById('nuevoInputEliminar')){
            const inputEliminar = document.createElement('input')
            inputEliminar.min = 0;
            inputEliminar.type = "number"
            inputEliminar.id = 'nuevoInputEliminar'
            inputEliminar.placeholder = "Ingrese el ID del explorador"
            inputContenedorEliminar.appendChild(inputEliminar)
            const botonGuardarEliminar = document.createElement('button')
            botonGuardarEliminar.classList.add('botonGuardar')
            botonGuardarEliminar.textContent = "Guardar"
            eliminarExplorador.appendChild(inputContenedorEliminar)
            inputContenedorEliminar.appendChild(botonGuardarEliminar)
        }
    })
}

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
});

console.log(JSON.parse(localStorage.getItem('exploradores')));