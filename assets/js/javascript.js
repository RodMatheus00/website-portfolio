document.addEventListener("DOMContentLoaded", function () {
    const words = ["Coffee Lover", "Developer", "Data Analyst", "Problem Solver"];
    let index = 0;
    const title = document.getElementById("about-me-title");

    function changeText() {
        title.innerHTML = `<span>${words[index]}</span>`;
        index = (index + 1) % words.length;
    }

    setInterval(changeText, 2000);

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

    const projectImagesMap = {
        'power-bi-1': '../Portfolio/assets/images/projetos/power bi 1.png',
        'power-bi-2': '../Portfolio/assets/images/projetos/power bi 2.1.png',
        'power-bi-3': '../Portfolio/assets/images/projetos/power bi 3.1.png',
        'power-bi-4': '../Portfolio/assets/images/projetos/power bi 4.1.png',
        'power-bi-5': '../Portfolio/assets/images/projetos/power bi 5.1.png',
        'site-6': '../Portfolio/assets/images/projetos/site 6.1.png'
    };

    // Mapeamento dos ícones das tecnologias associadas a cada projeto
    const techIconsMap = {
        'power-bi-1': ['powerbi-icon.png', 'sql-icon.png'], // Exemplos de ícones
        'power-bi-2': ['powerbi-icon.png', 'excel-icon.png'],
        'power-bi-3': ['powerbi-icon.png', 'sql-icon.png'],
        'power-bi-4': ['powerbi-icon.png'],
        'power-bi-5': ['powerbi-icon.png', 'python-icon.png'],
        'site-6': ['html-icon.png', 'css-icon.png', 'js-icon.png']
    };

    // Função para abrir o modal e preencher os dados do projeto
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

            modalImage.src = projectImagesMap[projeto];
            modalDescription.innerHTML = `
                <h3>${title}</h3>
                <p><strong>${projectTitle}</strong></p>
                <p>${description}</p>
                <p><i>${observation}</i></p>
            `;

            // Adicionando os ícones das tecnologias ao modal
            const icons = techIconsMap[projeto] || [];
            modalTechIcons.innerHTML = ''; // Limpa os ícones anteriores
            icons.forEach(icon => {
                const img = document.createElement('img');
                img.src = `path/to/icons/${icon}`; // Ajuste o caminho para onde seus ícones estão
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

    const projectImages = document.querySelectorAll('.project');
    projectImages.forEach(project => {
        project.addEventListener('click', function () {
            const projectId = project.id;
            openModal(projectId);
        });
    });

    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            closeModal();
        });
    }
});
