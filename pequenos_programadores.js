// Quando a página terminar de carregar, execute a função principal
window.onload = function() {
    // Exibe uma mensagem de boas-vindas para o usuário
    alert("Bem-vindo ao portal Pequenos Programadores!");

    // Chama a função que adiciona eventos aos botões dos cursos
    inicializarEventosDosCursos();
};

/**
 * Função responsável por adicionar eventos aos botões dos cursos.
 * Quando um botão é clicado, exibe uma mensagem personalizada no console.
 */
function inicializarEventosDosCursos() {
    // Seleciona todos os botões dentro do container de cursos
    const botoes = document.querySelectorAll(".cursos button");

    // Seleciona todos os títulos dos cursos (summary)
    const titulos = document.querySelectorAll(".cursos summary");

    // Para cada botão encontrado, adiciona um evento de clique
    botoes.forEach(function(botao, indice) {
        botao.addEventListener("click", function(event) {
            // Impede o comportamento padrão do botão (caso exista)
            event.preventDefault();

            // Obtém o nome do curso correspondente ao botão clicado
            const nomeCurso = titulos[indice] ? titulos[indice].textContent : "Curso desconhecido";

            // Exibe uma mensagem no console informando qual curso foi acessado
            console.log(`Você acessou: ${nomeCurso}`);

            // Opcional: Exibe uma mensagem na tela para o usuário
            // alert(`Você está acessando: ${nomeCurso}`);
        });
    });
}
