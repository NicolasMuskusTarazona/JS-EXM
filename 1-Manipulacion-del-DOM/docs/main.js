import "./components/frutasData.js"
const card = document.getElementById('card') // document.querySelector('#card')
document.createElement("h1");
card.textContent = "Mi nueva tarjeta"
card.classList.add("card")

const btn = document.querySelector('#miBoton')
btn.addEventListener("click", ()=>{
    btn.textContent = "Presionaste el boton"
})

const input = document.querySelector('#nombre')

const guardarInput = document.querySelector('#guardarValor')

guardarInput.addEventListener('click', ()=>{
    console.log(input.value)
    if (input.value === ''){
        console.log("nada")
    }
})
