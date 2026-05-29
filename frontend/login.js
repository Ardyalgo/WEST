
const loginForm = document.getElementById('login-form');


loginForm.addEventListener('submit', (evento) => {
    
    
    evento.preventDefault();

    const usernameIngresado = document.getElementById('username').value;
    const passwordIngresada = document.getElementById('password').value;

    console.log("Si funciona cfff");
    console.log("Usuario:", usernameIngresado);
    console.log("Contraseña:", passwordIngresada);

    
});