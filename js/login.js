// Variable para almacenar usuarios registrados
let usuariosRegistrados = [];

// Función para cargar usuarios desde usuarios.json y localStorage
function cargarUsuarios() {
    // Cargar usuarios desde usuarios.json
    fetch("./data/usuarios.json")
        .then(response => response.json())
        .then(datos => {
            usuariosRegistrados = datos;

            // Combina con usuarios almacenados en localStorage
            const localStorageUsers = JSON.parse(localStorage.getItem("users"));
            if (localStorageUsers) {
                usuariosRegistrados = usuariosRegistrados.concat(localStorageUsers);
            }
        });
}

// Llamar a la función para cargar usuarios al inicio
cargarUsuarios();

// Obtener referencias a los formularios
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Event listener para el formulario de registro
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const usuario = document.getElementById("regUsuario").value;
        const password = document.getElementById("regPassword").value;

        // Verificar si el usuario ya está registrado
        const usuarioExistente = usuariosRegistrados.find(user => user.usuario === usuario);
        if (usuarioExistente) {
            Swal.fire({
                title: "Error!",
                text: "El usuario ya está registrado",
                icon: "error"
            });
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            usuario: usuario,
            password: password
        };

        // Agregar usuario a la lista
        usuariosRegistrados.push(newUser);

        // Guardar en localStorage
        localStorage.setItem("users", JSON.stringify(usuariosRegistrados));

        // Mostrar mensaje de éxito
        Swal.fire({
            title: "Registro Exitoso",
            text: "Usuario registrado correctamente",
            icon: "success"
        });

        // Limpiar el formulario
        registerForm.reset();
    });
}

// Event listener para el formulario de login
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const usuario = document.getElementById("loginUsuario").value;
        const password = document.getElementById("loginPassword").value;

        // Buscar el usuario en la lista
        const usuarioEncontrado = usuariosRegistrados.find(user => user.usuario === usuario);

        // Verificar si el usuario existe y la contraseña es correcta
        if (usuarioEncontrado && usuarioEncontrado.password === password) {
            Swal.fire({
                title: "Ingreso Exitoso",
                text: "¡Vamos a jugar!",
                icon: "success",
            });
            setTimeout(() => {
                window.location.href = "./pages/juego.html";
            }, 3000);
        } else {
            Swal.fire({
                title: "Error!",
                text: "Usuario o contraseña incorrecta",
                icon: "error"
            });
        }
    });
}
