export function mostrarNaves() {
    const contenedor = document.getElementById('navesContainerAdmin');
    contenedor.classList.add('navesContainerAdmin')
    contenedor.innerHTML = '';  // Limpiar el contenedor antes de mostrar los exploradores
    // Recuperar exploradores del localStorage
    // Obtener los datos de naves y exploradores desde el localStorage
    const navesGuardados = JSON.parse(localStorage.getItem('naves')) || [];
    const exploradoresGuardados = JSON.parse(localStorage.getItem('exploradores')) || [];
    console.log(navesGuardados);  // Mostrará las naves almacenadas
    console.log(exploradoresGuardados);  // Mostrará los exploradores almacenados    
    navesGuardados.forEach(nave => {
        const divNave = document.createElement('div');
        divNave.classList.add('nave');
        divNave.innerHTML =`
                <h2>${nave.nombre}</h2>
                <p>Tecnologia: ${nave.tecnologia}</p>
                <p>Velocidad Maxima: ${nave.velocidad_max}</p>
                <p>Exploradores: ${nave.exploradores}</p>
                <img src="${nave.imagen}" alt="Imagen de ${nave.nombre}" style="width: 100%; max-width: 300px; border-radius: 10px;">
        `;
        contenedor.appendChild(divNave);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarNaves();
});


