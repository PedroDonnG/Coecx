const CONFIG_BIBLIOTECA = {
    linkPlanilha:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOgzM8QKcn7rNeQbyw5sl0HRlAHVE4OYdS7Lp7Ax-2LNSiKkskTwb_3u99zMWAownTOlswFsN5wMR_/pub?output=csv",
    whatsapp: "5561999999999" // Substitua pelo número real
};

let todosOsLivros = [];

function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    if (!mobileMenu || !menuIcon) return;

    const isOpen = mobileMenu.classList.toggle("opacity-100");
    mobileMenu.classList.toggle("pointer-events-auto");
    menuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");

    document.body.style.overflow = isOpen ? "hidden" : "auto";
    lucide.createIcons();
}

async function carregarBiblioteca() {
    const container = document.getElementById("vitrine-livros");
    if (!container) return;

    try {
        const resposta = await fetch(CONFIG_BIBLIOTECA.linkPlanilha);
        const dadosBrutos = await resposta.text();
        const linhas = dadosBrutos.split("\n").slice(1);

        todosOsLivros = linhas
            .map((linha) => {
                const col = linha.split(",");
                return {
                    capa: col[0]?.trim(),
                    titulo: col[1]?.trim(),
                    autor: col[2]?.trim(),
                    qtd: col[3]?.trim()
                };
            })
            .filter((l) => l.titulo);

        renderizarLivros(todosOsLivros);
    } catch (erro) {
        console.error("Erro Biblioteca:", erro);
        container.innerHTML = `<p class="col-span-full text-center text-slate-400">Erro ao carregar o acervo.</p>`;
    }
}

function renderizarLivros(lista) {
    const container = document.getElementById("vitrine-livros");
    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-500 py-10">Nenhum livro encontrado com esse nome.</p>`;
        return;
    }

    lista.forEach((livro) => {
        const mensagemZap = encodeURIComponent(`Olá! Gostaria de solicitar o livro "${livro.titulo}".`);
        container.innerHTML += `
            <div class="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div class="aspect-[3/4] overflow-hidden bg-slate-100 relative">
                    <img src="${livro.capa}" alt="${livro.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='https://via.placeholder.com/300x400?text=Sem+Capa'">
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-orange-700 shadow-sm uppercase">
                        ${livro.qtd} Disponíveis
                    </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="font-bold text-slate-800 text-lg leading-tight">${livro.titulo}</h3>
                    <p class="text-slate-500 text-sm mt-1 mb-4 italic">${livro.autor}</p>
                    <a href="https://wa.me/${CONFIG_BIBLIOTECA.whatsapp}?text=${mensagemZap}" target="_blank" 
                       class="mt-auto w-full py-3 bg-slate-50 text-orange-600 font-bold rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 border border-orange-100 text-center">
                       Solicitar Empréstimo
                    </a>
                </div>
            </div>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    carregarBiblioteca();

    const inputBusca = document.getElementById("input-busca");
    if (inputBusca) {
        inputBusca.addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase();
            const filtrados = todosOsLivros.filter(
                (l) => l.titulo.toLowerCase().includes(termo) || l.autor.toLowerCase().includes(termo)
            );
            renderizarLivros(filtrados);
        });
    }

    const btnMenu = document.getElementById("mobile-menu-button");
    if (btnMenu) btnMenu.addEventListener("click", toggleMenu);

    lucide.createIcons();
    const icon = document.getElementById("menu-icon");
    if (icon) icon.classList.add("text-orange-600");
});
