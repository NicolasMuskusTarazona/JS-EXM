import { naves } from "../js/navesData.js";

document.addEventListener('DOMContentLoaded', () => {
    const botonAgregar = document.getElementById('agregarNave');
    const formulario = document.getElementById('formularioNave');
    const confirmarBtn = document.getElementById('confirmarNave');

    botonAgregar.addEventListener('click', () => {
        formulario.style.display = 'block';
    });

    confirmarBtn.addEventListener('click', () => {
        const nombre = document.getElementById('nombreNave').value;
        const tecnologia = document.getElementById('tecnologiaNave').value;
        const velocidadMaxima = document.getElementById('velocidadMaximaNave').value;
        const exploradores = document.getElementById('exploradoresNave').value;
        const imagen = document.getElementById('imagenNave').value

        if (nombre && tecnologia && velocidadMaxima && exploradores && imagen) {
            agregarNave(nombre, tecnologia, velocidadMaxima, exploradores, imagen);
            formulario.style.display = 'none';
            limpiarFormulario();
        } else {
            alert("Por favor completa todos los campos.");
        }
    });

    function agregarNave(nombre, tecnologia, velocidad_max, exploradores, imagen) {
        const naves = JSON.parse(localStorage.getItem('naves')) || [];
        naves.push({ nombre, tecnologia, velocidad_max, exploradores, imagen });
        localStorage.setItem('naves', JSON.stringify(naves));
        mostrarNaves();
    }

    function mostrarNaves() {
        const contenedor = document.getElementById('navesContainerAdmin');
        contenedor.innerHTML = '';
        const navesLS = JSON.parse(localStorage.getItem('naves')) || [];

        navesLS.forEach(nav => {
            const card = document.createElement('div');
            card.innerHTML = `
                <div class="contenedorBusqueda">
                    <h3>${nav.nombre}</h3><br><br>
                    <p>Tecnologia: ${nav.tecnologia}</p><br><br>
                    <p>Velocidad Maxima: ${nav.velocidad_max}</p><br><br>
                    <p>Exploradores: ${nav.exploradores}</p><br><br>
                    <img src="${nav.imagen}" alt="Imagen de ${nav.nombre}" style="width: 100%; max-width: 300px; border-radius: 10px;"><br><br>
                    <button class="editar" data-nombre="${nav.nombre}">Editar</button>
                    <button class="eliminar" data-nombre="${nav.nombre}">Eliminar</button>
                </div>
            `;
            contenedor.appendChild(card);
        });

        // Escuchar eventos después de renderizar
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', () => {
                const nombre = btn.getAttribute('data-nombre');
                editarNave(nombre);
            });
        });

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', () => {
                const nombre = btn.getAttribute('data-nombre');
                eliminarNave(nombre);
            });
        });
    }

    function eliminarNave(nombre) {
        const naves = JSON.parse(localStorage.getItem('naves')) || [];
        const actualizados = naves.filter(nav => nav.nombre !== nombre);
        localStorage.setItem('naves', JSON.stringify(actualizados));
        mostrarNaves();
    }

    function editarNave(nombre) {
        const naves = JSON.parse(localStorage.getItem('naves')) || [];
        const index = naves.findIndex(nav => nav.nombre === nombre);
        if (index === -1) return;

        const nuevaImagen = prompt("Nueva imagen:", naves[index].imagen)
        const nuevoNombre = prompt("Nuevo nombre:", naves[index].nombre);
        const nuevaTecnologia = prompt("Nueva Tecnologia:", naves[index].tecnologia);
        const nuevoVelocidad = prompt("Nueva Velocidad Maxima:", naves[index].velocidad_max);
        const nuevoExplorador = prompt("Nuevo Explorador:", naves[index].exploradores);

        if (nuevaImagen && nuevoNombre && nuevaTecnologia && nuevoVelocidad && nuevoExplorador) {
            naves[index] = {
                nombre: nuevoNombre,
                tecnologia: nuevaTecnologia,
                velocidad_max: nuevoVelocidad,
                exploradores: nuevoExplorador,
                imagen: nuevaImagen
            };
            localStorage.setItem('naves', JSON.stringify(naves));
            mostrarNaves();
        }
    }

    function limpiarFormulario() {
        document.getElementById('nombreNave').value = '';
        document.getElementById('tecnologiaNave').value = '';
        document.getElementById('velocidadMaximaNave').value = '';
        document.getElementById('exploradoresNave').value = '';
        document.getElementById('imagenNave').value = '';
    }

    mostrarNaves();
});
