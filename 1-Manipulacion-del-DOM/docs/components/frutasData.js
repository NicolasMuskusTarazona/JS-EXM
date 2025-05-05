let frutas = JSON.parse(localStorage.getItem('frutas')) || ["manazana", "banana", "naranja"]

const inputFruta = document.querySelector('#input-fruta')
const agregarFruta = document.querySelector('#agregar-fruta')

agregarFruta.addEventListener("click",()=>{
    const nuevaFruta = inputFruta.value.trim()
    if(nuevaFruta !== ""){
        frutas.push(nuevaFruta)
        localStorage.setItem('frutas',JSON.stringify(frutas))
        console.log(nuevaFruta)
        console.log(frutas)
        console.log(JSON.parse(localStorage.getItem('frutas')));
        inputFruta.value = ""
    }else{
        alert("Escribe algo")
    }
})

export { frutas, agregarFruta, inputFruta}