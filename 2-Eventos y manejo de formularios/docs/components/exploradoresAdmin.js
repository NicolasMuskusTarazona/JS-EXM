import { exploradores } from '../js/exploradoresData.js';

function agregar() {
    const agregarExplorador = document.getElementById('agregarExplorador');
    const contenedor = document.getElementById('exploradoresContainer');
    const inputContenedor = document.createElement('div');
    inputContenedor.id = 'inputContenedor';

    agregarExplorador.addEventListener("click", () => {
        if (!document.getElementById('nuevoInput')) {
            const input = document.createElement('input');
            input.id = 'nuevoInput';
            input.placeholder = "Ingresa el nombre del explorador";
            inputContenedor.appendChild(input);

            const botonGuardar = document.createElement('button');
            botonGuardar.textContent = "Guardar";
            inputContenedor.appendChild(botonGuardar);

            contenedor.appendChild(inputContenedor);

            // Al hacer clic en "Guardar", guardamos el valor en localStorage
            botonGuardar.addEventListener("click", () => {
                const nombre = input.value.trim();
                if (nombre) {
                    // Guardamos el nuevo explorador en localStorage
                    const nuevosExploradores = JSON.parse(localStorage.getItem('exploradores')) || [];
                    nuevosExploradores.push({ nombre: nombre, id: Date.now(), nave: "Desconocida", rango: "Explorador" });

                    localStorage.setItem('exploradores', JSON.stringify(nuevosExploradores));
                    mostrarExploradores();  // Volver a mostrar todos los exploradores, incluyendo el nuevo
                    input.value = '';  // Limpiar el input
                } else {
                    alert("Por favor ingresa un nombre válido.");
                }
            });
        }
    });
}

function mostrarExploradores() {
    const contenedor = document.getElementById('exploradoresContainer');
    contenedor.innerHTML = '';  // Limpiar el contenedor antes de mostrar los exploradores

    // Recuperar exploradores del localStorage
    const exploradoresGuardados = JSON.parse(localStorage.getItem('exploradores')) || [];

    exploradoresGuardados.forEach(explorador => {
        const divExplorador = document.createElement('div');
        divExplorador.classList.add('explorador');
        divExplorador.innerHTML = `
            <h2>${explorador.nombre}</h2>
            <h2>ID:${explorador.id}</h2>
            <p class="nave"><strong>Nave: ${explorador.nave}</strong></p>
            <p class="rango"><strong>Rango: ${explorador.rango}</strong></p>
        `;
        contenedor.appendChild(divExplorador);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarExploradores();
    agregar();
});
