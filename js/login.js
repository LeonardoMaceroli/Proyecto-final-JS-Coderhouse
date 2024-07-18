let usuariosRegistrados = [];

fetch("./data/usuarios.json")
    .then(response => response.json())
    .then(datos => {
        usuariosRegistrados = datos;

        const localStorageUsers = JSON.parse(localStorage.getItem("users"));
        if (localStorageUsers) {
            usuariosRegistrados = usuariosRegistrados.concat(localStorageUsers);
        }
    });

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const user = {
            email: email,
            password: password
        };

        usuariosRegistrados.push(user);
        localStorage.setItem("users", JSON.stringify(usuariosRegistrados));
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        let usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.email === email);
        if (usuarioEncontrado) {
            if (usuarioEncontrado.password === password) {
                Swal.fire({
                    title: "Ingreso Exitoso",
                    text: "¡Vamos a jugar!",
                    icon: "success",
                });
                setTimeout(() => {
                    window.location.href = "../pages/juego.html";
                }, 3000);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Email o contraseña incorrecta",
                    icon: "error"
                });
            }
        }
    });
}
