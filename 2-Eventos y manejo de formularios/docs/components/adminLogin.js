localStorage.setItem('admin', 'Nicolas');
localStorage.setItem('contrasena', 'campus2023');

const admin = document.getElementById('admin')
const login = document.getElementById('login')

admin.addEventListener('click', () => {
    login.innerHTML = `
        <form id="loginForm">
        <input type="text" id="inputAdmin" placeholder="Admin" required><br><br>
        <input type="password" id="inputContrasena" placeholder="Contraseña" required><br><br>
        <button type="submit">Entrar</button>
    </form>
    `
    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const adminIngresado = document.getElementById('inputAdmin').value
        const passwordIngresado = document.getElementById('inputContrasena').value
        const adminGuardado = localStorage.getItem('admin')
        const passwordGuardado = localStorage.getItem('contrasena')
        if (adminIngresado === adminGuardado && passwordIngresado === passwordGuardado) {
            login.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center;">
                <a href="../docs/NasaAdmin.html" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Entrar
                </a>
            </div>
        `
        } else {
            alert('Usuario o contraseña incorrectos. Intenta de nuevo.');
        }
    })
})