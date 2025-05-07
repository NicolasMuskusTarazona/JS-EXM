function mostrarExploradores() {
    const contenedor = document.getElementById('exploradoresContainerAdministrador');
    contenedor.innerHTML = '';
    const exploradoresLS = JSON.parse(localStorage.getItem('exploradores')) || [];
    
    exploradoresLS.forEach(explo => {
        const card = document.createElement('div');
        card.innerHTML = `
            <h3>${explo.nombre}</h3>
            <p>ID: ${explo.id}</p>
            <p>Nave: ${explo.nave}</p>
            <p>Rango: ${explo.rango}</p>
            <button class="editar" data-id="${explo.id}">Editar</button>
            <button class="eliminar" data-id="${explo.id}">Eliminar</button>
        `;
        contenedor.appendChild(card);
    });

    // Eventos para editar y eliminar
    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarExplorador(btn.dataset.id));
    });

    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', () => editarExplorador(btn.dataset.id));
    });
}

// Funciones adicionales para agregar, editar y eliminar exploradores

document.addEventListener('DOMContentLoaded', () => {
    const botonAgregar = document.getElementById('agregarExplorador');
    const formulario = document.getElementById('formularioExplorador');
    const confirmarBtn = document.getElementById('confirmarExplorador');
    
    // Mostrar formulario cuando se hace clic en "Agregar Explorador"
    botonAgregar.addEventListener('click', () => {
        formulario.style.display = 'block'; // Muestra el formulario
    });

    // Agregar el nuevo explorador
    confirmarBtn.addEventListener('click', () => {
        const nombre = document.getElementById('nombreExplorador').value;
        const nave = document.getElementById('naveExplorador').value;
        const rango = document.getElementById('rangoExplorador').value;

        if (nombre && nave && rango) {
            agregarExplorador(nombre, nave, rango);
            formulario.style.display = 'none'; // Ocultar el formulario después de agregar
            limpiarFormulario(); // Limpiar el formulario
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Función para agregar un explorador
    function agregarExplorador(nombre, nave, rango) {
        const exploradores = JSON.parse(localStorage.getItem('exploradores')) || [];
        exploradores.push({ id: Date.now(), nombre, nave, rango });
        localStorage.setItem('exploradores', JSON.stringify(exploradores));
        mostrarExploradores();
    }

    // Función para mostrar los exploradores
    function mostrarExploradores() {
        const contenedor = document.getElementById('exploradoresContainerAdministrador');
        contenedor.innerHTML = '';
        const exploradoresLS = JSON.parse(localStorage.getItem('exploradores')) || [];
        
        exploradoresLS.forEach(explo => {
            const card = document.createElement('div');
            card.innerHTML = `
            <div class="contenedorBusqueda">
                <h3>${explo.nombre}</h3>
                <p>ID: ${explo.id}</p>
                <p>Nave: ${explo.nave}</p>
                <p>Rango: ${explo.rango}</p>
                <button class="editar" id="editarExplorador" data-id="${explo.id}">Editar</button>
                <button class="eliminar" id="eliminarExplorador" data-id="${explo.id}">Eliminar</button>
            </div>
            `;
            contenedor.appendChild(card);
        });

        // Eventos para editar y eliminar
        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', () => eliminarExplorador(btn.dataset.id));
        });

        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', () => editarExplorador(btn.dataset.id));
        });
    }

    // Función para eliminar un explorador
    function eliminarExplorador(id) {
        const exploradores = JSON.parse(localStorage.getItem('exploradores')) || [];
        const actualizados = exploradores.filter(e => e.id != id);
        localStorage.setItem('exploradores', JSON.stringify(actualizados));
        mostrarExploradores();
    }

    // Función para editar un explorador
    function editarExplorador(id) {
        const exploradores = JSON.parse(localStorage.getItem('exploradores')) || [];
        const index = exploradores.findIndex(e => e.id == id);
        if (index === -1) return;

        const nuevoNombre = prompt("Nuevo nombre:", exploradores[index].nombre);
        const nuevaNave = prompt("Nueva nave:", exploradores[index].nave);
        const nuevoRango = prompt("Nuevo rango:", exploradores[index].rango);

        if (nuevoNombre && nuevaNave && nuevoRango) {
            exploradores[index].nombre = nuevoNombre;
            exploradores[index].nave = nuevaNave;
            exploradores[index].rango = nuevoRango;
            localStorage.setItem('exploradores', JSON.stringify(exploradores));
            mostrarExploradores();
        }
    }

    // Limpiar el formulario
    function limpiarFormulario() {
        document.getElementById('nombreExplorador').value = '';
        document.getElementById('naveExplorador').value = '';
        document.getElementById('rangoExplorador').value = '';
    }

    // Inicializar mostrando los exploradores almacenados
    mostrarExploradores();
});

