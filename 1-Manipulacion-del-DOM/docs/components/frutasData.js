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
    frutas.forEach((fruta,index) => {
        const divFruta = document.createElement('div')
        divFruta.textContent = fruta
        divFruta.classList.add('card-fruta')
        contenedor.appendChild(divFruta)
        const botonEliminar = document.createElement('button')
        botonEliminar.textContent = "X"
        botonEliminar.classList.add('btn-eliminar')
        botonEliminar.addEventListener('click', ()=>{
            frutas.splice(index, 1)
            localStorage.setItem('frutas', JSON.stringify(frutas))
            mostrarFrutas();
        })
        divFruta.appendChild(botonEliminar);
    });
}
mostrarFrutas();
console.log(JSON.parse(localStorage.getItem('frutas')));
export { frutas, agregarFruta, inputFruta, contenedor}