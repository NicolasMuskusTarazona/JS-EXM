let frutas = JSON.parse(localStorage.getItem('frutas')) || ["manazana", "banana", "naranja"]

const inputFruta = document.querySelector('#input-fruta')
const agregarFruta = document.querySelector('#agregar-fruta')

agregarFruta.addEventListener("click",()=>{
    const nuevaFruta = inputFruta.value.trim()
    if(nuevaFruta !== ""){
        frutas.push(nuevaFruta)
        localStorage.setItem('frutas',JSON.stringify(frutas))
        console.log(JSON.parse(localStorage.getItem('frutas')));
        inputFruta.value = ""
    }else{
        alert("Escribe algo")
    }
})
const contenedor = document.querySelector('#contenedor-frutas')
function mostrarFrutas() {
    contenedor.innerHTML = ""
    frutas.forEach((fruta, index) => {
        const divFruta = document.createElement('div')
        divFruta.classList.add('card-fruta')

        const nombreFruta = document.createElement('span')
        nombreFruta.textContent = fruta

        const botonEliminar = document.createElement('button')
        botonEliminar.textContent = "X"
        botonEliminar.classList.add('btn-eliminar')
        botonEliminar.addEventListener('click', () => {
            frutas.splice(index, 1)
            localStorage.setItem('frutas', JSON.stringify(frutas))
            mostrarFrutas()
        })

        const botonEditar = document.createElement('button')
        botonEditar.textContent = "Editar"
        botonEditar.classList.add('btn-editar')
        botonEditar.addEventListener("click", () => {
            divFruta.innerHTML = ''
            const inputEditar = document.createElement('input')
            inputEditar.type = "text"
            inputEditar.value = fruta
            inputEditar.classList.add('input')

            const botonConfirmar = document.createElement('button')
            botonConfirmar.textContent = "✅"
            botonConfirmar.classList.add('btn-confirmar')
            botonConfirmar.addEventListener('click', () => {
                const nuevoNombre = inputEditar.value.trim()
                if (nuevoNombre !== "") {
                    frutas[index] = nuevoNombre
                    localStorage.setItem('frutas', JSON.stringify(frutas))
                    mostrarFrutas()
                }
            })

            divFruta.appendChild(inputEditar)
            divFruta.appendChild(botonConfirmar)
        })

        divFruta.appendChild(nombreFruta)
        divFruta.appendChild(botonEditar)
        divFruta.appendChild(botonEliminar)
        contenedor.appendChild(divFruta)
    });
}
mostrarFrutas()
console.log(JSON.parse(localStorage.getItem('frutas')));
export { frutas, agregarFruta, inputFruta, contenedor}