document.addEventListener("DOMContentLoaded", function () {
    const words = ["Coffee Lover", "Developer", "Data Analyst", "Problem Solver"];
    let index = 0;
    const title = document.getElementById("about-me-title");

    function changeText() {
        title.innerHTML = `<span>${words[index]}</span>`;
        index = (index + 1) % words.length;
    }

    setInterval(changeText, 2000);

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
        item.addEventListener("mouseenter", () => item.classList.add("bright"));
        item.addEventListener("mouseleave", () => item.classList.remove("bright"));
    });

    const mathdevTitle = document.getElementById("mathdev");
    if (mathdevTitle) {
        mathdevTitle.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

            modal.style.display = "flex";
        }
    }

    function closeModal() {
        document.getElementById("modal").style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === document.getElementById("modal")) {
            closeModal();
        }
    };

    document.querySelectorAll('.carousel-item img').forEach((img, index) => {
        img.addEventListener('click', () => openModal(`carousel-item-${index + 1}`));
    });

    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', function () {
            openModal(project.id);
        });

        project.querySelector('.overlay').addEventListener('click', function (event) {
            event.stopPropagation(); // Evita propagação para outros eventos
            openModal(project.id);
        });
    });

    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const inner = document.querySelector('.carousel-inner');

    function showItem(index) {
        inner.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateIndicators();
    }

    function updateIndicators() {
        document.querySelectorAll('.carousel-indicators li').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    document.querySelector('.carousel-control-prev').addEventListener('click', (event) => {
        event.preventDefault();
        showItem((currentIndex - 1 + totalItems) % totalItems);
        carouselSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    document.querySelector('.carousel-control-next').addEventListener('click', (event) => {
        event.preventDefault();
        showItem((currentIndex + 1) % totalItems);
        carouselSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    document.querySelectorAll('.carousel-indicators li').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showItem(index);
            carouselSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    showItem(currentIndex);

    function toggleMenu() {
        document.getElementById("navbar").classList.toggle("open");
    }

    const hamburguerNavlink = document.getElementById("hamburguer-navlink");
    if (hamburguerNavlink) {
        hamburguerNavlink.addEventListener("click", toggleMenu);
    }

    document.querySelectorAll('#navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById("navbar").classList.remove("open");
        });
    });
});
