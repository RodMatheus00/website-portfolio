document.addEventListener("DOMContentLoaded", function () {
    const words = ["Amante de café", "Desenvolvedor", "Analista de dados", "Solucionador de problemas"];
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
});
