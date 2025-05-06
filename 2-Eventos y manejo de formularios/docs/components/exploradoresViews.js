export function mostrarExploradores() {
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
});

