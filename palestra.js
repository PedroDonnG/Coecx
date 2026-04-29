
const URL_PALESTRAS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGmYIFO9yuwml_JLB99GRJgItW3oQEKajsf-rSX4doJgeSBCP_ueKnNw-zwFTzj2HCdZJqNl6pX0i7/pub?output=csv";

function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    
    if (!mobileMenu || !menuIcon) return;

    const isOpen = mobileMenu.classList.toggle("opacity-100");
    mobileMenu.classList.toggle("pointer-events-auto");

    menuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
    
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    lucide.createIcons();
}

async function carregarPalestras() {
    const tabelaBody = document.getElementById("tabela-palestras");
    if (!tabelaBody) return;

    try {
        const resposta = await fetch(URL_PALESTRAS);
        const dadosBrutos = await resposta.text();
        const linhas = dadosBrutos.split(/\r?\n/).slice(1);
        
        tabelaBody.innerHTML = "";

        linhas.forEach((linha) => {
            let colunas = linha.includes(";") ? linha.split(";") : linha.split(",");
            if (colunas.length >= 2) {
                const tr = `
                    <tr class="hover:bg-orange-50 transition-colors even:bg-slate-50/50 border-b border-slate-100">
                        <td class="p-4 text-slate-800 font-bold">${colunas[0]?.trim() || "---"}</td>
                        <td class="p-4 text-slate-800 font-bold">${colunas[1]?.trim() || "---"}</td>
                        <td class="p-4 text-slate-800 font-bold">${colunas[2]?.trim() || "---"}</td>
                        <td class="p-4 text-orange-700 italic text-sm font-bold">${colunas[3]?.trim() || "Sem tema"}</td>
                    </tr>`;
                tabelaBody.innerHTML += tr;
            }
        });
    } catch (erro) {
        console.error("Erro ao carregar palestras:", erro);
        tabelaBody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-slate-400">Erro ao carregar cronograma.</td></tr>`;
    }
}


document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();


    carregarPalestras();

    const btnMenu = document.getElementById("mobile-menu-button");
    if (btnMenu) btnMenu.addEventListener("click", toggleMenu);

    const icon = document.getElementById("menu-icon");
    if (icon) icon.classList.add("text-orange-600");
});