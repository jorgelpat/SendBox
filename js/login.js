// Esperar que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        // const rol = document.getElementById("rol").value;

        // Validación básica
        if (usuario === "" || password === "") {
            alert("Por favor completa todos los campos");
            return;
        }

        // Guardar rol en localStorage por ahora en rol oficina
        localStorage.setItem("rol", "oficina");

        // Redirigir al dashboard
        window.location.href = "dashboard.html";
    });

});