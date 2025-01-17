document.addEventListener("DOMContentLoaded", function () {
    // Troca de palavras no título
    const words = ["Coffee Lover", "Developer", "Data Analyst", "Problem Solver"];
    let index = 0;
    const title = document.getElementById("about-me-title");

    function changeText() {
        // Troca o conteúdo de h2
        title.innerHTML = `<span>${words[index]}</span>`; 
        
        // Atualiza o índice e reinicia ao alcançar o fim da lista
        index = (index + 1) % words.length;
    }

    // Troca as palavras a cada 2 segundos (2000ms)
    setInterval(changeText, 2000);

    // Rolagem suave para os links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Previne o comportamento padrão de navegação

            const targetId = link.getAttribute('href').substring(1);  // Remove o '#' do href
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,  // A posição do topo do elemento
                behavior: 'smooth'  // Rolagem suave
            });
        });
    });

    // Selecionando todos os itens de tecnologia (li)
    const techItems = document.querySelectorAll("#technologies ul li");

    techItems.forEach(item => {
        // Adicionando o evento de mouseover
        item.addEventListener("mouseenter", function () {
            // Adiciona a classe 'bright' ao passar o mouse
            item.classList.add("bright");
        });

        // Adicionando o evento de mouseout
        item.addEventListener("mouseleave", function () {
            // Remove a classe 'bright' quando o mouse sai
            item.classList.remove("bright");
        });
    });
});
