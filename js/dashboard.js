document.addEventListener("DOMContentLoaded", () => {

    // Verificar sesión
    const rol = localStorage.getItem("rol");

    if (!rol) {
        window.location.href = "login.html";
        return;
    }

    // Toggle sidebar
    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    if (menu && sidebar && main) {
        menu.addEventListener("click", () => {
            menu.classList.toggle("menu-toggle");
            sidebar.classList.toggle("menu-toggle");
            main.classList.toggle("menu-toggle");
        });
    }

    // Logout
    const logout = document.getElementById("logout");

    if (logout) {
        logout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "login.html";
        });
    }

});