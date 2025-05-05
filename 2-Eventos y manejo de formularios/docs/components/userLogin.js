localStorage.setItem('usuario', 'Adrian');
localStorage.setItem('contrasena', 'campus2023');

const usuario = document.getElementById('user')
const login = document.getElementById('login')

usuario.addEventListener('click', () => {
    login.innerHTML = `
        <form id="loginForm">
        <input type="text" id="inputUsuario" placeholder="Usuario" required><br><br>
        <input type="password" id="inputContrasena" placeholder="Contraseña" required><br><br>
        <button type="submit">Entrar</button>
    </form>
    `
    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const usuarioIngresado = document.getElementById('inputUsuario').value
        const passwordIngresado = document.getElementById('inputContrasena').value
        const usuarioGuardado = localStorage.getItem('usuario')
        const passwordGuardado = localStorage.getItem('contrasena')
        if (usuarioIngresado === usuarioGuardado && passwordIngresado === passwordGuardado) {
            login.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center;">
                <a href="../docs/NasaUser.html" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Entrar
                </a>
            </div>
        `        
        } else {
            alert('Usuario o contraseña incorrectos. Intenta de nuevo.');
        }
    })
})