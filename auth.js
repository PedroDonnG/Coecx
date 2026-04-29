const btn = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");
const icon = document.getElementById("menu-icon");

function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("menu-icon");

    menu.classList.toggle("opacity-100");
    menu.classList.toggle("pointer-events-auto");

    const isOpen = menu.classList.contains("opacity-100");
    icon.setAttribute("data-lucide", isOpen ? "x" : "menu");

    lucide.createIcons();
}

btn.addEventListener("click", toggleMenu);

function verificarLogin(event) {
    event.preventDefault();

    const senhaDigitada = document.getElementById("senha").value;
    const senhaMestre = "coecx2026";
    const erroMsg = document.getElementById("erro-msg");
    const loginScreen = document.getElementById("login-screen");
    const painelConteudo = document.getElementById("painel-conteudo");

    if (senhaDigitada === senhaMestre) {
        // Esconde o login e mostra o painel
        loginScreen.classList.add("hidden");
        painelConteudo.classList.remove("hidden");

        localStorage.setItem("logado", "true");
        lucide.createIcons();
    } else {
        erroMsg.classList.remove("hidden");
        document.getElementById("senha").value = "";
    }
}

// Verifica se o usuário já logou anteriormente ao abrir a página
window.onload = function () {
    if (localStorage.getItem("logado") === "true") {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("painel-conteudo").classList.remove("hidden");
        lucide.createIcons();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    
    const btnMenu = document.getElementById("mobile-menu-button");
    if (btnMenu) btnMenu.addEventListener("click", toggleMenu);

    // Ajuste o ícone do menu para laranja
    const icon = document.getElementById("menu-icon");
    if (icon) icon.classList.add("text-orange-600");
});
