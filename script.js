document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function animaAoRolar() {
        sections.forEach(section => {
            const posicaoTopo = section.getBoundingClientRect().top;
            const alturaTela = window.innerHeight * 0.75;

            if (posicaoTopo < alturaTela) {
                section.classList.add("animar");
            }
        });
    }

    window.addEventListener("scroll", animaAoRolar);
    animaAoRolar();

    // Menu responsivo
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const estiloAtual = window.getComputedStyle(menu).display;
            if (estiloAtual === "flex") {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
                menu.style.flexDirection = "column";
            }
        });
    }

    // Botão "Leia mais..." da seção SOBRE MIM
    const fullText = document.getElementById("full-text");
    const toggleButton = document.getElementById("toggle-text");

    if (toggleButton && fullText) {
        fullText.style.display = "none"; // Garante início oculto
        toggleButton.addEventListener("click", function () {
            const isHidden = fullText.style.display === "none" || fullText.style.display === "";
            fullText.style.display = isHidden ? "block" : "none";
            toggleButton.textContent = isHidden ? "Leia menos..." : "Leia mais...";
        });
    }

    // Botões "Leia mais..." dos projetos
    const botoesLeiaMais = document.querySelectorAll(".toggle-text");

    botoesLeiaMais.forEach(link => {
        link.addEventListener("click", function () {
            const projeto = this.closest(".projeto");
            if (!projeto) return;

            const textoCurto = projeto.querySelector(".texto-curto");
            const textoCompleto = projeto.querySelector(".texto-completo");
            if (!textoCurto || !textoCompleto) return;

            const isHidden = textoCompleto.style.display === "none" || textoCompleto.style.display === "";
            textoCompleto.style.display = isHidden ? "inline" : "none";
            textoCurto.style.display = isHidden ? "none" : "inline";
            this.textContent = isHidden ? "Leia menos..." : "Leia mais...";
        });
    });

    // Carrossel de projetos
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const container = document.querySelector(".projetos-container");

    if (prevButton && nextButton && container) {
        let scrollAmount = 0;

        nextButton.addEventListener("click", function () {
            const projeto = document.querySelector(".projeto");
            if (!projeto) return;

            const projectWidth = projeto.offsetWidth;
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (scrollAmount < maxScroll) {
                scrollAmount += projectWidth;
                container.scrollTo({ left: scrollAmount, behavior: "smooth" });
            }
        });

        prevButton.addEventListener("click", function () {
            const projeto = document.querySelector(".projeto");
            if (!projeto) return;

            const projectWidth = projeto.offsetWidth;

            if (scrollAmount > 0) {
                scrollAmount -= projectWidth;
                container.scrollTo({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }
});
