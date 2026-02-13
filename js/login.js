const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").ariaValueMax.trim();
    const password = document.getElementById("password").ariaValueMax.trim();

    // Simulación temporal
    if (usuario === "oficina") {
        localStorage.setItem("rol", "oficina");
        localStorage.setItem("usuario", usuario);
        window.location.href = "dashboard.html;"
    }
    else if (usuario === "mensajero") {
        localStorage.setItem("rol", "mensajero");
        localStorage.setItem("usuario", usuario);
        window.location.href = "dashboard.html";
    }
    else {
        alert("Usuario no válido")
    }
})