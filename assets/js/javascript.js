document.addEventListener("DOMContentLoaded", function () {
    // Variáveis para o texto que muda dinamicamente
    const words = ["Coffee Lover", "Developer", "Data Analyst", "Problem Solver"];
    let index = 0;
    const title = document.getElementById("about-me-title");

    function changeText() {
        title.innerHTML = `<span>${words[index]}</span>`;
        index = (index + 1) % words.length;
    }

    setInterval(changeText, 2000);

    // Encontre a seção do carrossel
    const carouselSection = document.getElementById('carousel');

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const techItems = document.querySelectorAll("#technologies ul li");
    techItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            item.classList.add("bright");
        });
        item.addEventListener("mouseleave", function () {
            item.classList.remove("bright");
        });
    });

    const mathdevTitle = document.getElementById("mathdev");
    if (mathdevTitle) {
        mathdevTitle.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Função para abrir o modal
    function openModal(projeto) {
        var modal = document.getElementById("modal");
        var modalImage = document.getElementById("modal-image");
        var modalDescription = document.getElementById("modal-description");
        var modalTechIcons = document.getElementById("modal-tech-icons");

        const projectElement = document.getElementById(projeto);

        if (projectElement) {
            const title = projectElement.getAttribute('data-title');
            const projectTitle = projectElement.getAttribute('data-project-title');
            const description = projectElement.getAttribute('data-description');
            const observation = projectElement.getAttribute('data-observation');
            const projectImage = projectElement.getAttribute('data-image');
            const techIcons = projectElement.getAttribute('data-tech-icons').split(',');

            modalImage.src = projectImage;
            modalDescription.innerHTML = `
                <h3>${title}</h3>
                <p><strong>${projectTitle}</strong></p>
                <p>${description}</p>
                <p><i>${observation}</i></p>
            `;

            modalTechIcons.innerHTML = '';
            techIcons.forEach(icon => {
                const img = document.createElement('img');
                img.src = `assets/images/icon/${icon}.png`;
                img.alt = icon;
                img.classList.add('tech-icon');
                modalTechIcons.appendChild(img);
            });
        } else {
            modalImage.src = '';
            modalDescription.innerHTML = 'Projeto não encontrado.';
        }

        modal.style.display = "flex";
    }

    // Função para fechar o modal
    function closeModal() {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        var modal = document.getElementById("modal");
        if (event.target == modal) {
            closeModal();
        }
    }

    // Abertura do modal para imagens do carrossel
    const projectImagesCarousel = document.querySelectorAll('.carousel-item img');
    projectImagesCarousel.forEach((img, index) => {
        img.addEventListener('click', function () {
            const projectId = `carousel-item-${index + 1}`; // Ajuste do ID de acordo com a ordem das imagens no carrossel
            openModal(projectId);
        });
    });

    // Abertura do modal para imagens dos projetos
    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach((img) => {
        img.addEventListener('click', function () {
            const projectId = img.closest('.project').id; // Obtém o ID do projeto clicado
            openModal(projectId);
        });
    });

    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            closeModal();
        });
    }

    // Código do carrossel
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const inner = document.querySelector('.carousel-inner');

    function showItem(index) {
        inner.style.transform = `translateX(-${index * 100}%)`;  // Mover o carousel para a imagem correta
        currentIndex = index;

        // Atualiza os indicadores de navegação
        updateIndicators();
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicators li');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Setas de navegação com rolagem até a seção do carrossel
    document.querySelector('.carousel-control-prev').addEventListener('click', (event) => {
        event.preventDefault();
        const newIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(newIndex);

        // Rola até o início da seção do carrossel
        carouselSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelector('.carousel-control-next').addEventListener('click', (event) => {
        event.preventDefault();
        const newIndex = (currentIndex + 1) % totalItems;
        showItem(newIndex);

        // Rola até o início da seção do carrossel
        carouselSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Indicadores interativos com rolagem até o início da seção do carrossel
    const indicators = document.querySelectorAll('.carousel-indicators li');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showItem(index);

            // Rola até o início da seção do carrossel
            carouselSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Inicializa o carrossel no primeiro item
    showItem(currentIndex);

    // ** Adicionando funcionalidade do Menu Hamburger **

    // Função para alternar o menu de navegação
    function toggleMenu() {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("open");  // Alterna a classe 'open'
    }

    // Adicionando o evento de clique para o botão do menu hamburguer
    const hamburguerNavlink = document.getElementById("hamburguer-navlink");
    if (hamburguerNavlink) {
        hamburguerNavlink.addEventListener("click", toggleMenu);  // Chama a função ao clicar
    }

    // Fechar o menu quando um item for clicado
    const navLinks = document.querySelectorAll('#navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navbar = document.getElementById("navbar");
            navbar.classList.remove("open");  // Remove a classe 'open' para fechar o menu
        });
    });
});
